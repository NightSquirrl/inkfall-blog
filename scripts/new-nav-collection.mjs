#!/usr/bin/env node
/**
 * 新增一个内容集合 + 导航入口的脚手架脚本。
 *
 * 用法：
 *   node scripts/new-nav-collection.mjs --name backend --label 后端 --en Back-end --icon server
 *
 * 参数：
 *   --name   集合名 / 路由前缀（小写，如 backend）。同时用于目录 src/content/<name> 与路由 /<name>
 *   --label  中文导航名（如 后端）
 *   --en     英文导航名（如 Back-end）
 *   --icon   导航图标名（对应 Icon.astro 中的图标 key，可选，默认与 name 相同）
 *
 * 该脚本自动完成以下全部改动，幂等（重复运行不会重复注入）：
 *   1. src/content.config.ts              新增集合定义并加入 collections
 *   2. src/utils/posts.ts                 新增 Entry 类型 / getVisible* / get*Href / get*OgImageHref / getHref 分支
 *   3. src/i18n/i18nKey.ts                新增 6 个 i18n key
 *   4. src/i18n/languages/zh-CN.ts        新增中文文案
 *   5. src/i18n/languages/en-US.ts        新增英文文案
 *   6. src/config/navigationConfig.ts     新增导航项
 *   7. src/components/ui/Icon.astro       新增图标（仅当 --icon 指定的 key 不存在时）
 *   8. src/pages/<name>/index.astro       新建列表页（多级目录树：侧边分类导航 + 文章区）
 *   9. src/pages/<name>/[...slug].astro   新建详情页
 *  10. src/pages/og/[...slug].png.ts      并入集合（静态路径 + GET fallback）
 *  11. src/pages/search-index.json.ts     并入集合
 *  12. src/pages/rss.xml.ts               并入集合
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function parseArgs(argv) {
  const args = { name: "", label: "", en: "", icon: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--name") args.name = argv[++i]?.trim() ?? "";
    else if (a === "--label") args.label = argv[++i]?.trim() ?? "";
    else if (a === "--en") args.en = argv[++i]?.trim() ?? "";
    else if (a === "--icon") args.icon = argv[++i]?.trim() ?? "";
  }
  return args;
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function pascal(value) {
  return titleCase(value);
}

/** 读取文件，返回 { content, existed } */
function read(file) {
  const abs = join(ROOT, file);
  if (!existsSync(abs)) return { content: "", existed: false, abs };
  return { content: readFileSync(abs, "utf8"), existed: true, abs };
}

/** 在 content 中找到 anchor，在其后插入 block；若 block 已存在则跳过 */
function insertAfter(content, anchor, block, label) {
  if (content.includes(block.trim())) {
    console.log(`  · 已存在，跳过：${label}`);
    return content;
  }
  const idx = content.indexOf(anchor);
  if (idx === -1) {
    throw new Error(`找不到锚点，无法注入 ${label}：\n    ${anchor}`);
  }
  const insertAt = idx + anchor.length;
  console.log(`  + 注入：${label}`);
  return content.slice(0, insertAt) + block + content.slice(insertAt);
}

/** 在 content 中找到 anchor，在其前插入 block */
function insertBefore(content, anchor, block, label) {
  if (content.includes(block.trim())) {
    console.log(`  · 已存在，跳过：${label}`);
    return content;
  }
  const idx = content.indexOf(anchor);
  if (idx === -1) {
    throw new Error(`找不到锚点，无法注入 ${label}：\n    ${anchor}`);
  }
  console.log(`  + 注入：${label}`);
  return content.slice(0, idx) + block + content.slice(idx);
}

/**
 * 向 `@/utils/posts` 的 import 中注入所需函数（兼容多行 import 声明）。
 * funcs 为需要存在的函数名数组；已存在则跳过。
 */
function injectPostsImport(content, funcs) {
  const importRe = /import\s*\{([\s\S]*?)\}\s*from\s*"@\/utils\/posts";/;
  const m = content.match(importRe);
  if (!m) throw new Error("找不到 @/utils/posts 的 import 语句，无法注入函数。");
  const body = m[1];
  const missing = funcs.filter((f) => !new RegExp(`\\b${f}\\b`).test(body));
  if (missing.length === 0) {
    console.log("  · 已存在，跳过：posts import");
    return content;
  }
  const closeIdx = m.index + m[0].lastIndexOf("}");
  const needComma = /,\s*$/.test(body.trim()) ? "" : ",";
  const insertion = `${needComma} ${missing.join(", ")}`;
  console.log(`  + 注入：posts import (${missing.join(", ")})`);
  return content.slice(0, closeIdx) + insertion + content.slice(closeIdx);
}

function write(abs, content) {
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
}

function main() {
  const { name, label, en, icon } = parseArgs(process.argv.slice(2));

  if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error("缺少或非法 --name（需小写字母开头，如 backend）");
  }
  if (!label) throw new Error("缺少 --label（中文导航名，如 后端）");
  if (!en) throw new Error("缺少 --en（英文导航名，如 Back-end）");
  const iconName = icon || name;
  const Name = pascal(name);

  console.log(`\n生成导航集合：${name}（${label} / ${en}，图标 ${iconName}）\n`);

  // 1. content.config.ts
  {
    const { content, abs } = read("src/content.config.ts");
    let next = content;
    const collectionBlock = `
const ${name} = defineCollection({
  loader: glob({
    base: "./src/content/${name}",
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
`;
    next = insertBefore(next, "export const collections = {", collectionBlock, "content.config 集合定义");
    next = insertAfter(
      next,
      "export const collections = { pages, frontend",
      `, ${name}`,
      "content.config collections 注册",
    );
    write(abs, next);
  }

  // 2. utils/posts.ts
  {
    const { content, abs } = read("src/utils/posts.ts");
    let next = content;
    next = insertAfter(
      next,
      `export type FrontendEntry = CollectionEntry<"frontend">;`,
      `\nexport type ${Name}Entry = CollectionEntry<"${name}">;`,
      "posts.ts ${Name}Entry 类型",
    );
    // 类型联合使用正则追加成员，避免依赖已有的具体成员（如 backend）
    if (!new RegExp(`CollectionEntry<"posts"(?:\\s*\\|\\s*"[^"]+")*\\s*\\|\\s*"${name}"`).test(next)) {
      next = next.replace(/export type AnyPostEntry = CollectionEntry<"posts"(?:\s*\|\s*"[^"]+")*>/, (m) =>
        m.replace(/>$/, ` | "${name}">`),
      );
      console.log("  + 注入：posts.ts AnyPostEntry 扩展");
    } else {
      console.log("  · 已存在，跳过：posts.ts AnyPostEntry 扩展");
    }
    if (!new RegExp(`<C extends "posts"(?:\\s*\\|\\s*"[^"]+")*\\s*\\|\\s*"${name}"`).test(next)) {
      next = next.replace(/function sortByPublishedAt<C extends "posts"(?:\s*\|\s*"[^"]+")*>/, (m) =>
        m.replace(/>$/, ` | "${name}">`),
      );
      console.log("  + 注入：posts.ts sortByPublishedAt 类型扩展");
    } else {
      console.log("  · 已存在，跳过：posts.ts sortByPublishedAt 类型扩展");
    }
    next = insertAfter(
      next,
      `export async function getVisibleFrontend() {\n  const entries = await getCollection("frontend", ({ data }) => (import.meta.env.PROD ? !data.draft : true));\n\n  return sortByPublishedAt(entries);\n}`,
      `

export async function getVisible${Name}() {
  const entries = await getCollection("${name}", ({ data }) => (import.meta.env.PROD ? !data.draft : true));

  return sortByPublishedAt(entries);
}`,
      "posts.ts getVisible${Name}",
    );
    next = insertAfter(
      next,
      `export function getFrontendHref(post: AnyPostEntry) {\n  return getPostHref(post, "/frontend");\n}`,
      `

export function get${Name}Href(post: AnyPostEntry) {
  return getPostHref(post, "/${name}");
}`,
      "posts.ts get${Name}Href",
    );
    next = insertAfter(
      next,
      `  if (post.collection === "frontend") return getFrontendHref(post);`,
      `\n  if (post.collection === "${name}") return get${Name}Href(post);`,
      "posts.ts getHref 分支",
    );
    next = insertAfter(
      next,
      `export function getFrontendOgImageHref(post: AnyPostEntry) {\n  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");\n  return \`/og/frontend/\${encodedId}.png\`;\n}`,
      `

export function get${Name}OgImageHref(post: AnyPostEntry) {
  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");
  return \`/og/${name}/\${encodedId}.png\`;
}`,
      "posts.ts get${Name}OgImageHref",
    );
    write(abs, next);
  }

  // 3. i18n/i18nKey.ts
  {
    const { content, abs } = read("src/i18n/i18nKey.ts");
    const block = `
  navigation${Name}: "navigation.${name}",
  ${name}PageDescription: "${name}.pageDescription",
  ${name}PageIntro: "${name}.pageIntro",
  ${name}Count: "${name}.count",
  ${name}Categories: "${name}.categories",
  backTo${Name}: "${name}.backTo${Name}",`;
    const next = insertAfter(content, `  backToFrontend: "frontend.backToFrontend",`, block, "i18nKey ${name}* 键");
    write(abs, next);
  }

  // 4. zh-CN.ts
  {
    const { content, abs } = read("src/i18n/languages/zh-CN.ts");
    const block = `
  [I18nKey.navigation${Name}]: "${label}",
  [I18nKey.${name}PageDescription]: "浏览 {owner} 发布的全部${label}笔记。",
  [I18nKey.${name}PageIntro]: "记录${label}知识点、原理与实战。",
  [I18nKey.${name}Count]: "共 {count} 篇",
  [I18nKey.${name}Categories]: "分类",
  [I18nKey.backTo${Name}]: "返回${label}",`;
    const next = insertAfter(content, `  [I18nKey.backToFrontend]: "返回前端",`, block, "zh-CN ${name}* 文案");
    write(abs, next);
  }

  // 5. en-US.ts
  {
    const { content, abs } = read("src/i18n/languages/en-US.ts");
    const block = `
  [I18nKey.navigation${Name}]: "${en}",
  [I18nKey.${name}PageDescription]: "Browse all ${name} notes published by {owner}.",
  [I18nKey.${name}PageIntro]: "Notes on ${name} concepts, internals, and practice.",
  [I18nKey.${name}Count]: "Posts: {count}",
  [I18nKey.${name}Categories]: "Categories",
  [I18nKey.backTo${Name}]: "Back to ${name}",`;
    const next = insertAfter(content, `  [I18nKey.backToFrontend]: "Back to front-end",`, block, "en-US ${name}* 文案");
    write(abs, next);
  }

  // 6. navigationConfig.ts
  {
    const { content, abs } = read("src/config/navigationConfig.ts");
    const block = `\n  { labelKey: I18nKey.navigation${Name}, href: "/${name}", icon: "${iconName}" },`;
    const next = insertAfter(
      content,
      `  { labelKey: I18nKey.navigationFrontEnd, href: "/frontend", icon: "code" },`,
      block,
      "navigationConfig 导航项",
    );
    write(abs, next);
  }

  // 7. Icon.astro（仅当 icon key 不存在时）
  {
    const { content, abs } = read("src/components/ui/Icon.astro");
    if (content.includes(`${iconName}:`)) {
      console.log(`  · 图标 ${iconName} 已存在，跳过`);
    } else {
      const block = `\n  ${iconName}: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',`;
      const next = insertBefore(content, "} as const;", block, `Icon.astro 图标 ${iconName}`);
      write(abs, next);
    }
  }

  // 8. pages/<name>/index.astro —— 多级目录树（侧边分类导航 + 文章区）
  {
    const abs = join(ROOT, `src/pages/${name}/index.astro`);
    if (existsSync(abs)) {
      console.log(`  · 已存在，跳过：pages/${name}/index.astro`);
    } else {
      const tpl = `---
import BaseLayout from "@/layouts/BaseLayout.astro";
import Card from "@/components/ui/Card.astro";
import CategoryTree from "@/components/content/CategoryTree.astro";
import CategoryNav from "@/components/content/CategoryNav.astro";
import { getVisible${Name}, type AnyPostEntry } from "@/utils/posts";
import { getTranslator, I18nKey } from "@/i18n";
import { siteConfig } from "@/config/siteConfig";

interface CategoryNode {
  segment: string;
  path: string;
  children: Map<string, CategoryNode>;
  posts: AnyPostEntry[];
}

const t = getTranslator();
const posts = await getVisible${Name}();
const count = posts.length;

// 按完整目录层级构建树，支持多级嵌套（如 Java/test/xxx.md）
const root = new Map<string, CategoryNode>();
for (const post of posts) {
  const dirs = post.id.includes("/") ? post.id.split("/").slice(0, -1) : [];
  const segments = dirs.length > 0 ? dirs : ["其他"];
  let current = root;
  let prefix = "";
  let node!: CategoryNode;
  for (const segment of segments) {
    prefix = prefix ? \`\${prefix}/\${segment}\` : segment;
    if (!current.has(segment)) {
      current.set(segment, { segment, path: prefix, children: new Map(), posts: [] });
    }
    node = current.get(segment)!;
    current = node.children;
  }
  node.posts.push(post);
}

const groups = [...root.values()];
---

<BaseLayout
  title={\`\${t(I18nKey.navigation${Name})} · \${siteConfig.title}\`}
  description={t(I18nKey.${name}PageDescription, { owner: siteConfig.title })}
>
  <Card class="mt-4 px-4 py-5 tablet:px-6 tablet:py-6">
    <header class="flex flex-col gap-1.5">
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h1 class="text-foreground text-xl leading-tight font-bold tablet:text-2xl">{t(I18nKey.navigation${Name})}</h1>
        <span class="text-foreground-muted text-sm leading-tight font-medium">{t(I18nKey.${name}Count, { count })}</span
        >
      </div>
      <p class="text-foreground-muted text-sm leading-relaxed">{t(I18nKey.${name}PageIntro)}</p>
    </header>
  </Card>

  <div class="mt-4 flex gap-6">
    <CategoryNav nodes={groups} prefix="${name}-category" />

    <div class="min-w-0 flex-1">
      <CategoryTree nodes={groups} prefix="${name}-category" />
    </div>
  </div>
</BaseLayout>
`;
      write(abs, tpl);
      console.log(`  + 创建：pages/${name}/index.astro`);
    }
  }

  // 9. pages/<name>/[...slug].astro
  {
    const abs = join(ROOT, `src/pages/${name}/[...slug].astro`);
    if (existsSync(abs)) {
      console.log(`  · 已存在，跳过：pages/${name}/[...slug].astro`);
    } else {
      const tpl = `---
import PostLayout from "@/layouts/PostLayout.astro";
import { get${Name}Href, get${Name}OgImageHref, getVisible${Name} } from "@/utils/posts";
import { getTranslator, I18nKey } from "@/i18n";
import { render, type CollectionEntry } from "astro:content";

export async function getStaticPaths() {
  const posts = await getVisible${Name}();

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<"${name}">;
}

const { post } = Astro.props;
const { Content, headings } = await render(post);
const t = getTranslator();
---

<PostLayout
  post={post}
  headings={headings}
  href={get${Name}Href(post)}
  ogImageHref={get${Name}OgImageHref(post)}
  backHref="/${name}"
  backLabel={t(I18nKey.backTo${Name})}
>
  <Content />
</PostLayout>
`;
      write(abs, tpl);
      console.log(`  + 创建：pages/${name}/[...slug].astro`);
    }
  }

  // 10. og/[...slug].png.ts
  {
    const { content, abs } = read("src/pages/og/[...slug].png.ts");
    let next = content;
    next = injectPostsImport(next, [`getVisible${Name}`]);
    next = insertAfter(
      next,
      `  ...frontendPosts.map((post) => ({ params: { slug: \`frontend/\${post.id}\` } })),`,
      `\n    ...${name}Posts.map((post) => ({ params: { slug: \`${name}/\${post.id}\` } })),`,
      "og getStaticPaths 并入 ${name}",
    );
    next = insertAfter(
      next,
      `  const frontendPosts = await getVisibleFrontend();`,
      `\n  const ${name}Posts = await getVisible${Name}();`,
      "og getStaticPaths 加载 ${name}",
    );
    next = insertAfter(
      next,
      `  if (!post && slug.startsWith("backend/")) {
    const backendPosts = await getVisibleBackend();
    post = backendPosts.find((entry) => entry.id === slug.slice("backend/".length));
  }`,
      `

  if (!post && slug.startsWith("${name}/")) {
    const ${name}Posts = await getVisible${Name}();
    post = ${name}Posts.find((entry) => entry.id === slug.slice("${name}/".length));
  }`,
      "og GET fallback ${name}",
    );
    write(abs, next);
  }

  // 11. search-index.json.ts
  {
    const { content, abs } = read("src/pages/search-index.json.ts");
    let next = content;
    next = injectPostsImport(next, [`get${Name}Href`, `getVisible${Name}`]);
    next = insertAfter(
      next,
      `  const frontendPosts = await getVisibleFrontend();`,
      `\n  const ${name}Posts = await getVisible${Name}();`,
      "search-index 加载 ${name}",
    );
    next = insertAfter(
      next,
      `      href: getFrontendHref(post),
    })),`,
      `
    ...${name}Posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: get${Name}Href(post),
    })),`,
      "search-index 并入 ${name}",
    );
    write(abs, next);
  }

  // 12. rss.xml.ts
  {
    const { content, abs } = read("src/pages/rss.xml.ts");
    let next = content;
    next = injectPostsImport(next, [`get${Name}Href`, `getVisible${Name}`]);
    next = insertAfter(
      next,
      `  const frontendPosts = await getVisibleFrontend();`,
      `\n  const ${name}Posts = await getVisible${Name}();`,
      "rss 加载 ${name}",
    );
    next = insertAfter(
      next,
      `        link: new URL(getFrontendHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),`,
      `
      ...${name}Posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(get${Name}Href(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),`,
      "rss 并入 ${name}",
    );
    write(abs, next);
  }

  console.log(`\n完成。记得在 src/content/${name}/ 下放置至少一篇 .md 文章，然后运行:\n`);
  console.log(`  npm run check && npm run build\n`);
}

try {
  main();
} catch (error) {
  console.error("\n❌ 生成失败：", error instanceof Error ? error.message : error);
  process.exit(1);
}
