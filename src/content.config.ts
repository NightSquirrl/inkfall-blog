import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({
    base: "./src/content/pages",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const frontend = defineCollection({
  loader: glob({
    base: "./src/content/frontend",
    pattern: "**/[^_]*.md",
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)).default([]),
    cover: z.string().trim().min(1).optional(),
    draft: z.boolean(),
  }),
});

const backend = defineCollection({
  loader: glob({
    base: "./src/content/backend",
    pattern: "**/[^_]*.md",
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)).default([]),
    cover: z.string().trim().min(1).optional(),
    draft: z.boolean(),
  }),
});


const ops = defineCollection({
  loader: glob({
    base: "./src/content/ops",
    pattern: "**/[^_]*.md",
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)).default([]),
    cover: z.string().trim().min(1).optional(),
    draft: z.boolean(),
  }),
});

const interview = defineCollection({
  loader: glob({
    base: "./src/content/interview",
    pattern: "**/[^_]*.md",
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)).default([]),
    cover: z.string().trim().min(1).optional(),
    draft: z.boolean(),
  }),
});
export const collections = { pages, frontend, interview, ops, backend };
