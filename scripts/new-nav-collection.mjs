#!/usr/bin/env node
/**
 * 新增一个内容集合 + 导航入口的脚手架脚本。
 *
 * 用法：
 *   node scripts/new-nav-collection.mjs --name backend --label 后端 --en Back-end --icon server
 *
 * 参数：
 *   --name     集合名 / 路由前缀（小写字母开头，可含数字与连字符，如 backend）。
 *              同时用于目录 src/content/<name> 与路由 /<name>
 *   --label    中文导航名（如 后端）
 *   --en       英文导航名（如 Back-end）
 *   --icon     导航图标名（对应 Icon.astro 中的图标 key，可选，默认与 name 相同）
 *   --pattern  glob 匹配模式（可选，默认 **\/[^_]*{.md,.mdx}）
 *   --dry-run  只做锚点预检并打印将要发生的改动，不写盘
 *
 * 该脚本自动完成以下全部改动，幂等（重复运行不会重复注入），
 * 且采用「先全部预检、最后统一写盘」的两阶段策略，中途失败不会留下半成品：
 *   1. src/content.config.ts              新增集合定义并加入 collections
 *   2. src/utils/posts.ts                 新增 Entry 类型 / 类型联合 / getVisible* / get*Href / get*OgImageHref / getHref 分支
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
 *  13. 聚合页并入集合：archive / categories / categories/[category] / tags / tags/[tag] / HomePage
 *  14. src/content/<name>/                创建内容目录（含 .gitkeep）
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function parseArgs(argv) {
  const args = { name: "", label: "", en: "", icon: "", pattern: "", dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--name") args.name = argv[++i]?.trim() ?? "";
    else if (a === "--label") args.label = argv[++i]?.trim() ?? "";
    else if (a === "--en") args.en = argv[++i]?.trim() ?? "";
    else if (a === "--icon") args.icon = argv[++i]?.trim() ?? "";
    else if (a === "--pattern") args.pattern = argv[++i]?.trim() ?? "";
    else if (a === "--dry-run") args.dryRun = true;
  }
  return args;
}

/** 按 - 与 _ 分段后逐段首字母大写：cloud-native -> CloudNative */
function pascal(value) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

/** 小驼峰，用于 i18n 的属性名：cloud-native -> cloudNative */
function camel(value) {
  const pascalValue = pascal(value);
  return pascalValue.charAt(0).toLowerCase() + pascalValue.slice(1);
}

/** 读取源文件；文件不存在直接报错，避免静默生成空文件 */
function read(file) {
  const abs = join(ROOT, file);
  if (!existsSync(abs)) throw new Error(`找不到文件：${file}`);
  return { content: readFileSync(abs, "utf8"), abs, rel: file };
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
 * 在 anchor 所在行的下一行插入一个数组项，自动沿用该行的缩进。
 * item 需自带结尾逗号，例如 `getVisibleFoo(),`
 */
function insertArrayItemAfter(content, anchor, item, label) {
  if (content.includes(item)) {
    console.log(`  · 已存在，跳过：${label}`);
    return content;
  }
  const idx = content.indexOf(anchor);
  if (idx === -1) {
    throw new Error(`找不到锚点，无法注入 ${label}：\n    ${anchor}`);
  }
  const lineEnd = content.indexOf("\n", idx);
  if (lineEnd === -1) {
    throw new Error(`锚点后没有换行，无法注入 ${label}：\n    ${anchor}`);
  }
  const nextLineStart = lineEnd + 1;
  const nextLineEnd = content.indexOf("\n", nextLineStart);
  const nextLine = content.slice(nextLineStart, nextLineEnd === -1 ? undefined : nextLineEnd);
  const indent = nextLine.match(/^\s*/)?.[0] ?? "  ";
  console.log(`  + 注入：${label}`);
  return content.slice(0, nextLineStart) + `${indent}${item}\n` + content.slice(nextLineStart);
}

/** 正则替换一次；replacement 已存在则跳过，正则不命中则报错（避免静默失败） */
function replaceOnce(content, re, replacement, label) {
  if (content.includes(replacement)) {
    console.log(`  · 已存在，跳过：${label}`);
    return content;
  }
  if (!re.test(content)) {
    throw new Error(`找不到锚点，无法注入 ${label}：\n    ${re}`);
  }
  console.log(`  + 注入：${label}`);
  return content.replace(re, replacement);
}

/**
 * 向 `CollectionEntry<"a" | "b">` 形式的类型联合中追加一个成员。
 * 先命中 re 取出整段联合类型，再判断成员是否已存在，避免替换成重复成员。
 */
function extendTypeUnion(content, re, member, label) {
  const matched = content.match(re);
  if (!matched) {
    throw new Error(`找不到锚点，无法注入 ${label}：\n    ${re}`);
  }
  if (new RegExp(`\\|\\s*"${member}"`).test(matched[0])) {
    console.log(`  · 已存在，跳过：${label}`);
    return content;
  }
  const replacement = matched[0].replace(/>$/, ` | "${member}">`);
  console.log(`  + 注入：${label}`);
  return content.replace(re, replacement);
}

/**
 * 向 `@/utils/posts` 的 import 中注入所需函数（兼容单行与多行 import 声明）。
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
  // 多行 import 的末项通常已带逗号，单行则需要补上
  const previousNeedsComma = !/,\s*$/.test(body.trim());
  const insertion = `${previousNeedsComma ? "," : ""}\n  ${missing.join(", ")}`;
  console.log(`  + 注入：posts import (${missing.join(", ")})`);
  return content.slice(0, closeIdx) + insertion + content.slice(closeIdx);
}

/** 待写盘的内容，全部预检通过后统一提交 */
const pendingWrites = [];

function stage(rel, abs, content) {
  pendingWrites.push({ rel, abs, content });
}

function commit(dryRun) {
  if (dryRun) {
    console.log("\n[dry-run] 以下文件将被写入：");
    for (const item of pendingWrites) console.log(`  · ${item.rel}`);
    console.log("\n[dry-run] 未写入任何文件。\n");
    return;
  }
  for (const item of pendingWrites) {
    mkdirSync(dirname(item.abs), { recursive: true });
    writeFileSync(item.abs, item.content);
  }
}

function main() {
  const { name, label, en, icon, pattern, dryRun } = parseArgs(process.argv.slice(2));

  if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error("缺少或非法 --name（需小写字母开头，如 backend）");
  }
  if (!label) throw new Error("缺少 --label（中文导航名，如 后端）");
  if (!en) throw new Error("缺少 --en（英文导航名，如 Back-end）");
  const iconName = icon || name;
  const Name = pascal(name);
  const camelName = camel(name);
  const globPattern = pattern || "**/[^_]*{.md,.mdx}";
  // collections 的键即集合名，非合法标识符时要写成 "cloud-native": cloudNative
  const collectionEntry = name === camelName ? camelName : `"${name}": ${camelName}`;

  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(Name)) {
    throw new Error(`--name 无法转换为合法标识符：${name} -> ${Name}`);
  }

  console.log(`\n生成导航集合：${name}（${label} / ${en}，图标 ${iconName}）`);
  if (dryRun) console.log("模式：dry-run（只预检，不写盘）");
  console.log("");

  // 1. content.config.ts
  {
    const { content, abs, rel } = read("src/content.config.ts");
    let next = content;
    const collectionBlock = `
const ${camelName} = defineCollection({
  loader: glob({
    base: "./src/content/${name}",
    pattern: "${globPattern}",
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
      `, ${collectionEntry}`,
      "content.config collections 注册",
    );
    stage(rel, abs, next);
  }

  // 2. utils/posts.ts
  {
    const { content, abs, rel } = read("src/utils/posts.ts");
    let next = content;
    next = insertAfter(
      next,
      `export type FrontendEntry = CollectionEntry<"frontend">;`,
      `\nexport type ${Name}Entry = CollectionEntry<"${name}">;`,
      `posts.ts ${Name}Entry 类型`,
    );
    // 类型联合使用正则追加成员，避免依赖已有的具体成员顺序
    next = extendTypeUnion(
      next,
      /export type AnyPostEntry = CollectionEntry<"frontend"(?:\s*\|\s*"[^"]+")*>/,
      name,
      "posts.ts AnyPostEntry 扩展",
    );
    next = extendTypeUnion(
      next,
      /function sortByPublishedAt<C extends "frontend"(?:\s*\|\s*"[^"]+")*>/,
      name,
      "posts.ts sortByPublishedAt 类型扩展",
    );
    next = insertAfter(
      next,
      `export async function getVisibleFrontend() {\n  const entries = await getCollection("frontend", ({ data }) => (import.meta.env.PROD ? !data.draft : true));\n\n  return sortByPublishedAt(entries);\n}`,
      `

export async function getVisible${Name}() {
  const entries = await getCollection("${name}", ({ data }) => (import.meta.env.PROD ? !data.draft : true));

  return sortByPublishedAt(entries);
}`,
      `posts.ts getVisible${Name}`,
    );
    next = insertAfter(
      next,
      `export function getFrontendHref(post: AnyPostEntry) {\n  return getPostHref(post, "/frontend");\n}`,
      `

export function get${Name}Href(post: AnyPostEntry) {
  return getPostHref(post, "/${name}");
}`,
      `posts.ts get${Name}Href`,
    );
    next = insertAfter(
      next,
      `  if (post.collection === "frontend") return getFrontendHref(post);`,
      `\n  if (post.collection === "${name}") return get${Name}Href(post);`,
      "posts.ts getHref 分支",
    );
    next = insertAfter(
      next,
      `export function getFrontendOgImageHref(post: AnyPostEntry) {\n  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");\n  return withBase(\`/og/frontend/\${encodedId}.png\`);\n}`,
      `

export function get${Name}OgImageHref(post: AnyPostEntry) {
  const encodedId = post.id.split("/").map(encodeURIComponent).join("/");
  return withBase(\`/og/${name}/\${encodedId}.png\`);
}`,
      `posts.ts get${Name}OgImageHref`,
    );
    stage(rel, abs, next);
  }

  // 3. i18n/i18nKey.ts
  {
    const { content, abs, rel } = read("src/i18n/i18nKey.ts");
    const block = `
  navigation${Name}: "navigation.${name}",
  ${camelName}PageDescription: "${name}.pageDescription",
  ${camelName}PageIntro: "${name}.pageIntro",
  ${camelName}Count: "${name}.count",
  ${camelName}Categories: "${name}.categories",
  backTo${Name}: "${name}.backTo${Name}",`;
    const next = insertAfter(content, `  backToFrontend: "frontend.backToFrontend",`, block, `i18nKey ${name}* 键`);
    stage(rel, abs, next);
  }

  // 4. zh-CN.ts
  {
    const { content, abs, rel } = read("src/i18n/languages/zh-CN.ts");
    const block = `
  [I18nKey.navigation${Name}]: "${label}",
  [I18nKey.${camelName}PageDescription]: "浏览 {owner} 发布的全部${label}笔记。",
  [I18nKey.${camelName}PageIntro]: "记录${label}知识点、原理与实战。",
  [I18nKey.${camelName}Count]: "共 {count} 篇",
  [I18nKey.${camelName}Categories]: "分类",
  [I18nKey.backTo${Name}]: "返回${label}",`;
    const next = insertAfter(content, `  [I18nKey.backToFrontend]: "返回前端",`, block, `zh-CN ${name}* 文案`);
    stage(rel, abs, next);
  }

  // 5. en-US.ts
  {
    const { content, abs, rel } = read("src/i18n/languages/en-US.ts");
    const block = `
  [I18nKey.navigation${Name}]: "${en}",
  [I18nKey.${camelName}PageDescription]: "Browse all ${name} notes published by {owner}.",
  [I18nKey.${camelName}PageIntro]: "Notes on ${name} concepts, internals, and practice.",
  [I18nKey.${camelName}Count]: "Posts: {count}",
  [I18nKey.${camelName}Categories]: "Categories",
  [I18nKey.backTo${Name}]: "Back to ${name}",`;
    const next = insertAfter(content, `  [I18nKey.backToFrontend]: "Back to front-end",`, block, `en-US ${name}* 文案`);
    stage(rel, abs, next);
  }

  // 6. navigationConfig.ts
  {
    const { content, abs, rel } = read("src/config/navigationConfig.ts");
    const block = `\n  { labelKey: I18nKey.navigation${Name}, href: "/${name}", icon: "${iconName}" },`;
    const next = insertAfter(
      content,
      `  { labelKey: I18nKey.navigationFrontEnd, href: "/frontend", icon: "code" },`,
      block,
      "navigationConfig 导航项",
    );
    stage(rel, abs, next);
  }

  // 7. Icon.astro（仅当 icon key 不存在时）
  {
    const { content, abs, rel } = read("src/components/ui/Icon.astro");
    // 非法标识符（如含连字符）的图标 key 需要加引号
    const iconKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(iconName) ? iconName : `"${iconName}"`;
    if (content.includes(`${iconKey}:`)) {
      console.log(`  · 图标 ${iconName} 已存在，跳过`);
    } else {
      const block = `\n  ${iconKey}: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',`;
      const next = insertBefore(content, "} as const;", block, `Icon.astro 图标 ${iconName}`);
      stage(rel, abs, next);
    }
  }

  // 8. pages/<name>/index.astro —— 多级目录树（侧边分类导航 + 文章区）
  {
    const rel = `src/pages/${name}/index.astro`;
    const abs = join(ROOT, rel);
    if (existsSync(abs)) {
      console.log(`  · 已存在，跳过：${rel}`);
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

// 按完整目录层级构建树，支持多级嵌套（如 ${Name}/test/xxx.md）
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
  description={t(I18nKey.${camelName}PageDescription, { owner: siteConfig.title })}
>
  <Card class="mt-4 px-4 py-5 tablet:px-6 tablet:py-6">
    <header class="flex flex-col gap-1.5">
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h1 class="text-foreground text-xl leading-tight font-bold tablet:text-2xl">{t(I18nKey.navigation${Name})}</h1>
        <span class="text-foreground-muted text-sm leading-tight font-medium"
          >{t(I18nKey.${camelName}Count, { count })}</span
        >
      </div>
      <p class="text-foreground-muted text-sm leading-relaxed">{t(I18nKey.${camelName}PageIntro)}</p>
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
      stage(rel, abs, tpl);
      console.log(`  + 创建：${rel}`);
    }
  }

  // 9. pages/<name>/[...slug].astro
  {
    const rel = `src/pages/${name}/[...slug].astro`;
    const abs = join(ROOT, rel);
    if (existsSync(abs)) {
      console.log(`  · 已存在，跳过：${rel}`);
    } else {
      const tpl = `---
import PostLayout from "@/layouts/PostLayout.astro";
import { get${Name}Href, get${Name}OgImageHref, getVisible${Name} } from "@/utils/posts";
import { getTranslator, I18nKey } from "@/i18n";
import { withBase } from "@/utils/paths";
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
  backHref={withBase("/${name}")}
  backLabel={t(I18nKey.backTo${Name})}
>
  <Content />
</PostLayout>
`;
      stage(rel, abs, tpl);
      console.log(`  + 创建：${rel}`);
    }
  }

  // 10. og/[...slug].png.ts
  {
    const { content, abs, rel } = read("src/pages/og/[...slug].png.ts");
    let next = content;
    next = injectPostsImport(next, [`getVisible${Name}`]);
    next = insertArrayItemAfter(
      next,
      "const frontendPosts = await getVisibleFrontend();",
      `const ${camelName}Posts = await getVisible${Name}();`,
      `og getStaticPaths 加载 ${name}`,
    );
    next = insertArrayItemAfter(
      next,
      "  return [\n",
      `...${camelName}Posts.map((post) => ({ params: { slug: \`${name}/\${post.id}\` } })),`,
      `og getStaticPaths 并入 ${name}`,
    );
    next = insertAfter(
      next,
      `  if (!post && slug.startsWith("backend/")) {
    const backendPosts = await getVisibleBackend();
    post = backendPosts.find((entry) => entry.id === slug.slice("backend/".length));
  }`,
      `

  if (!post && slug.startsWith("${name}/")) {
    const ${camelName}Posts = await getVisible${Name}();
    post = ${camelName}Posts.find((entry) => entry.id === slug.slice("${name}/".length));
  }`,
      `og GET fallback ${name}`,
    );
    stage(rel, abs, next);
  }

  // 11. search-index.json.ts
  {
    const { content, abs, rel } = read("src/pages/search-index.json.ts");
    let next = content;
    next = injectPostsImport(next, [`get${Name}Href`, `getVisible${Name}`]);
    next = insertArrayItemAfter(
      next,
      "const frontendPosts = await getVisibleFrontend();",
      `const ${camelName}Posts = await getVisible${Name}();`,
      `search-index 加载 ${name}`,
    );
    next = insertAfter(
      next,
      `      href: getFrontendHref(post),
    })),`,
      `

    ...${camelName}Posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      tags: post.data.tags,
      publishedAt: post.data.publishedAt.toISOString(),
      publishedLabel: formatPostDate(post.data.publishedAt),
      href: get${Name}Href(post),
    })),`,
      `search-index 并入 ${name}`,
    );
    stage(rel, abs, next);
  }

  // 12. rss.xml.ts
  {
    const { content, abs, rel } = read("src/pages/rss.xml.ts");
    let next = content;
    next = injectPostsImport(next, [`get${Name}Href`, `getVisible${Name}`]);
    next = insertArrayItemAfter(
      next,
      "const frontendPosts = await getVisibleFrontend();",
      `const ${camelName}Posts = await getVisible${Name}();`,
      `rss 加载 ${name}`,
    );
    next = insertAfter(
      next,
      `        link: new URL(getFrontendHref(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),`,
      `

      ...${camelName}Posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: new URL(get${Name}Href(post), site).href,
        categories: [post.data.category, ...post.data.tags],
      })),`,
      `rss 并入 ${name}`,
    );
    stage(rel, abs, next);
  }

  // 13. 聚合页：archive / categories / categories/[category] / tags / tags/[tag] / HomePage
  {
    // 归档 / 分类 / 标签页共用的加载语句
    const allPostsLoadAnchor = "const [frontendPosts, backendPosts, opsPosts, interviewPosts] = await Promise.all([";
    const allPostsDestructureRe = /\[frontendPosts, backendPosts, opsPosts, interviewPosts\]/;
    const allPostsDestructure = `[frontendPosts, backendPosts, opsPosts, interviewPosts, ${camelName}Posts]`;

    const aggregateTargets = [
      {
        file: "src/pages/archive.astro",
        loadAnchor: allPostsLoadAnchor,
        destructureRe: allPostsDestructureRe,
        destructure: allPostsDestructure,
        mergeRe: /\.\.\.interviewPosts\]\.sort\(/,
        mergeReplacement: `...interviewPosts, ...${camelName}Posts].sort(`,
      },
      {
        file: "src/pages/categories.astro",
        loadAnchor: allPostsLoadAnchor,
        destructureRe: allPostsDestructureRe,
        destructure: allPostsDestructure,
        mergeRe: /\.\.\.interviewPosts\] as AnyPostEntry\[\]/,
        mergeReplacement: `...interviewPosts, ...${camelName}Posts] as AnyPostEntry[]`,
      },
      {
        file: "src/pages/categories/[category].astro",
        loadAnchor: allPostsLoadAnchor,
        destructureRe: allPostsDestructureRe,
        destructure: allPostsDestructure,
        mergeRe: /\.\.\.interviewPosts\] as AnyPostEntry\[\]/,
        mergeReplacement: `...interviewPosts, ...${camelName}Posts] as AnyPostEntry[]`,
      },
      {
        file: "src/pages/tags.astro",
        loadAnchor: allPostsLoadAnchor,
        destructureRe: allPostsDestructureRe,
        destructure: allPostsDestructure,
        mergeRe: /\.\.\.interviewPosts\] as AnyPostEntry\[\]/,
        mergeReplacement: `...interviewPosts, ...${camelName}Posts] as AnyPostEntry[]`,
      },
      {
        file: "src/pages/tags/[tag].astro",
        loadAnchor: allPostsLoadAnchor,
        destructureRe: allPostsDestructureRe,
        destructure: allPostsDestructure,
        mergeRe: /\.\.\.interviewPosts\] as AnyPostEntry\[\]/,
        mergeReplacement: `...interviewPosts, ...${camelName}Posts] as AnyPostEntry[]`,
      },
      {
        file: "src/components/layout/HomePage.astro",
        loadAnchor: "const [frontendPosts, opsPosts, backendPosts] = await Promise.all([",
        destructureRe: /\[frontendPosts, opsPosts, backendPosts\]/,
        destructure: `[frontendPosts, opsPosts, backendPosts, ${camelName}Posts]`,
        mergeRe: /\.\.\.backendPosts\]\.sort\(/,
        mergeReplacement: `...backendPosts, ...${camelName}Posts].sort(`,
      },
    ];

    for (const target of aggregateTargets) {
      const { content, abs, rel } = read(target.file);
      let next = content;
      next = injectPostsImport(next, [`getVisible${Name}`]);
      next = insertArrayItemAfter(next, target.loadAnchor, `getVisible${Name}(),`, `${rel} 加载 ${name}`);
      next = replaceOnce(next, target.destructureRe, target.destructure, `${rel} 解构 ${camelName}Posts`);
      next = replaceOnce(next, target.mergeRe, target.mergeReplacement, `${rel} 合并 ${name}`);
      stage(rel, abs, next);
    }
  }

  // 14. src/content/<name>/
  {
    const rel = `src/content/${name}/.gitkeep`;
    const abs = join(ROOT, rel);
    if (existsSync(abs)) {
      console.log(`  · 已存在，跳过：src/content/${name}/`);
    } else {
      stage(rel, abs, "");
      console.log(`  + 创建：src/content/${name}/`);
    }
  }

  commit(dryRun);

  const touched = pendingWrites.map((item) => `  · ${item.rel}`).join("\n");
  console.log(`\n完成，共涉及 ${pendingWrites.length} 个文件：\n${touched}\n`);
  console.log(`记得在 src/content/${name}/ 下放置至少一篇 .md 文章，然后运行:\n`);
  console.log(`  npm run format && npm run check && npm run build\n`);
}

try {
  main();
} catch (error) {
  console.error("\n❌ 生成失败：", error instanceof Error ? error.message : error);
  console.error("未写入任何文件，请修复后重试。\n");
  process.exit(1);
}
