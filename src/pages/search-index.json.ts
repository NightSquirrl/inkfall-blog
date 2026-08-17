import {
  formatPostDate,
  getBackendHref,
  getFrontendHref,
  getOpsHref,
  getVisibleBackend,
  getVisibleFrontend,
  getVisibleOps,
} from "@/utils/posts";
import type { APIRoute } from "astro";

interface SearchEntry {
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  publishedLabel: string;
  href: string;
}

export const prerender = true;

export const GET: APIRoute = async () => {
  const frontendPosts = await getVisibleFrontend();
  const opsPosts = await getVisibleOps();
  const backendPosts = await getVisibleBackend();

  const searchIndex: SearchEntry[] = [
    ...frontendPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: getFrontendHref(post),
    })),
    ...opsPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: getOpsHref(post),
    })),
    ...backendPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: getBackendHref(post),
    })),
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
