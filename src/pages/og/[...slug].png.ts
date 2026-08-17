import type { APIRoute } from "astro";

import { siteConfig } from "@/config/siteConfig";
import { renderOgCard } from "@/utils/ogImage";
import { getVisibleBackend, getVisibleFrontend, getVisiblePosts } from "@/utils/posts";

export async function getStaticPaths() {
  if (!siteConfig.generateOpenGraph || import.meta.env.DEV) return [];

  const posts = await getVisiblePosts();
  const frontendPosts = await getVisibleFrontend();
  const backendPosts = await getVisibleBackend();

  return [
    ...posts.map((post) => ({ params: { slug: post.id } })),
    ...frontendPosts.map((post) => ({ params: { slug: `frontend/${post.id}` } })),
    ...backendPosts.map((post) => ({ params: { slug: `backend/${post.id}` } })),
  ];
}

export const GET: APIRoute = async ({ params }) => {
  if (!siteConfig.generateOpenGraph || import.meta.env.DEV) return new Response("Not Found", { status: 404 });

  const slug = params.slug;
  if (!slug) return new Response("Not Found", { status: 404 });

  const posts = await getVisiblePosts();
  let post = posts.find((entry) => entry.id === slug);

  if (!post) {
    const frontendSlug = slug.startsWith("frontend/") ? slug.slice("frontend/".length) : slug;
    const frontendPosts = await getVisibleFrontend();
    post = frontendPosts.find((entry) => entry.id === frontendSlug);
  }

  if (!post) {
    const backendSlug = slug.startsWith("backend/") ? slug.slice("backend/".length) : slug;
    const backendPosts = await getVisibleBackend();
    post = backendPosts.find((entry) => entry.id === backendSlug);
  }

  if (!post) return new Response("Not Found", { status: 404 });

  const png = await renderOgCard(post);
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
