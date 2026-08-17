import { postConfig } from "@/config/postConfig";
import { i18n, I18nKey } from "@/i18n";
import { getCollection, type CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;
export type FrontendEntry = CollectionEntry<"frontend">;
export type BackendEntry = CollectionEntry<"backend">;
export type AnyPostEntry = CollectionEntry<"posts" | "frontend" | "backend">;

function sortByPublishedAt<C extends "posts" | "frontend" | "backend">(entries: CollectionEntry<C>[]) {
  return entries.sort(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime() || left.id.localeCompare(right.id),
  );
}

export async function getVisiblePosts() {
  const entries = await getCollection("posts", ({ data }) => (import.meta.env.PROD ? !data.draft : true));

  return sortByPublishedAt(entries);
}

export async function getVisibleFrontend() {
  const entries = await getCollection("frontend", ({ data }) => (import.meta.env.PROD ? !data.draft : true));

  return sortByPublishedAt(entries);
}

export async function getVisibleBackend() {
  const entries = await getCollection("backend", ({ data }) => (import.meta.env.PROD ? !data.draft : true));

  return sortByPublishedAt(entries);
}

export function getPostHref(post: AnyPostEntry, basePath = "/posts") {
  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");
  return `${basePath}/${encodedId}`;
}

export function getFrontendHref(post: AnyPostEntry) {
  return getPostHref(post, "/frontend");
}

export function getBackendHref(post: AnyPostEntry) {
  return getPostHref(post, "/backend");
}

export function getHref(post: AnyPostEntry) {
  if (post.collection === "frontend") return getFrontendHref(post);
  if (post.collection === "backend") return getBackendHref(post);
  return getPostHref(post);
}

export function getPostOgImageHref(post: AnyPostEntry) {
  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");
  return `/og/${encodedId}.png`;
}

export function getFrontendOgImageHref(post: AnyPostEntry) {
  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");
  return `/og/frontend/${encodedId}.png`;
}

export function getBackendOgImageHref(post: AnyPostEntry) {
  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");
  return `/og/backend/${encodedId}.png`;
}

export function formatPostDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getPostMetrics(post: AnyPostEntry) {
  const body = post.body ?? "";
  const hanCharacterCount = body.match(/\p{Script=Han}/gu)?.length ?? 0;
  const latinWordCount = body.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
  const wordCount = hanCharacterCount + latinWordCount;
  const minutes = Math.max(1, Math.ceil(wordCount / postConfig.readingUnitsPerMinute));

  return {
    wordCount: i18n(I18nKey.postWordCount, { count: wordCount }),
    readingTime: i18n(I18nKey.postReadingTime, { minutes }),
  };
}
