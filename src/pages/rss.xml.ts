import { siteConfig } from "@/config/siteConfig";
import {
  getBackendHref,
  getFrontendHref,
  getOpsHref,
  getVisibleBackend,
  getVisibleFrontend,
  getVisibleOps,
  getInterviewHref,
  getVisibleInterview,

  getAiHref, getVisibleAi} from "@/utils/posts";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("The site URL must be configured to generate rss.xml");
  }

  const frontendPosts = await getVisibleFrontend();
  const aiPosts = await getVisibleAi();
  const interviewPosts = await getVisibleInterview();
  const opsPosts = await getVisibleOps();
  const backendPosts = await getVisibleBackend();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description.join(" "),
    site,
    items: [
      ...frontendPosts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(getFrontendHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),

      ...aiPosts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(getAiHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),
      ...interviewPosts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(getInterviewHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),
      ...opsPosts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(getOpsHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),
      ...backendPosts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(getBackendHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),
    ],
    customData: `<language>${siteConfig.lang}</language>`,
  });
};
