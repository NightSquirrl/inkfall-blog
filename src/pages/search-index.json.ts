import { formatPostDate, getFrontendHref, getPostHref, getVisibleFrontend, getVisiblePosts } from "@/utils/posts";
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
  const posts = await getVisiblePosts();
  const frontendPosts = await getVisibleFrontend();

  const searchIndex: SearchEntry[] = [
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: getPostHref(post),
    })),
    ...frontendPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: getFrontendHref(post),
    })),
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
