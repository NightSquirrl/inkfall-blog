import type { APIRoute } from "astro";

import { siteConfig } from "@/config/siteConfig";
import { renderOgCard } from "@/utils/ogImage";
import { getVisibleBackend, getVisibleFrontend, getVisibleOps } from "@/utils/posts";

export async function getStaticPaths() {
  if (!siteConfig.generateOpenGraph || import.meta.env.DEV) return [];

  const frontendPosts = await getVisibleFrontend();
  const opsPosts = await getVisibleOps();
  const backendPosts = await getVisibleBackend();

  return [
    ...frontendPosts.map((post) => ({ params: { slug: `frontend/${post.id}` } })),
    ...opsPosts.map((post) => ({ params: { slug: `ops/${post.id}` } })),
    ...backendPosts.map((post) => ({ params: { slug: `backend/${post.id}` } })),
  ];
}

export const GET: APIRoute = async ({ params }) => {
  if (!siteConfig.generateOpenGraph || import.meta.env.DEV) return new Response("Not Found", { status: 404 });

  const slug = params.slug;
  if (!slug) return new Response("Not Found", { status: 404 });

  let post;

  if (slug.startsWith("frontend/")) {
    const frontendPosts = await getVisibleFrontend();
    post = frontendPosts.find((entry) => entry.id === slug.slice("frontend/".length));
  }

  if (!post && slug.startsWith("ops/")) {
    const opsPosts = await getVisibleOps();
    post = opsPosts.find((entry) => entry.id === slug.slice("ops/".length));
  }

  if (!post && slug.startsWith("backend/")) {
    const backendPosts = await getVisibleBackend();
    post = backendPosts.find((entry) => entry.id === slug.slice("backend/".length));
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
