# Inkfall（砚秋）

> 一款简洁而安静的 Astro 博客主题。

砚秋 是一款简洁而安静的 Astro 博客主题，也是一套用于沉淀学习笔记与技术记录的站点。它以留白、克制色彩与舒适排版，让内容自然成为焦点，把安静、专注的阅读体验放在首位。

- **在线预览**：[https://nightsquirrl.github.io/inkfall-blog](https://nightsquirrl.github.io/inkfall-blog)
- **框架**：[Astro](https://astro.build)

## 内容分类

本站内容按技术方向组织，全部以 Markdown / MDX 书写，目前累计 **100 余篇**笔记：

| 分类 | 目录 | 内容概述 |
| :--- | :--- | :--- |
| 后端 | `src/content/backend/` | Java 基础、面向对象、集合、IO 流、多线程、反射，以及 JavaWeb 生态（Maven、Spring Boot、MyBatis、Redis、JWT、AOP 等） |
| 前端 | `src/content/frontend/` | JavaScript、TypeScript、Vue、React，以及 HarmonyOS、Three.js、uni-app、Webpack 工程化、前端性能优化、网络请求等 |
| 运维 | `src/content/ops/` | Docker、NGINX、MySQL、Git、Node 版本管理、服务器初始化、图床等工具与部署实践 |
| 面试 | `src/content/interview/` | JavaScript、Vue、React、TypeScript 面试题整理 |

文章位于对应分类的 `src/content/<分类>/` 下，文件名会成为文章地址的一部分。将文章 frontmatter 的 `draft` 设置为 `true`，它就不会出现在生产构建中。

## 特性

- 清晰而从容的阅读布局，留白与克制色彩的视觉风格
- 明暗主题与响应式设计（仅使用 `tablet` / `wide` 断点）
- Markdown / MDX 写作、内容搜索、文章目录与阅读进度
- RSS、Sitemap 和友好的 SEO 基础
- 可选的开源图床、Artalk 评论、Open Graph 图片与 Markdown Negotiation
- 在 MDX 笔记中通过 `client:*` 指令渲染 Vue 组件

## 快速开始

需要 Node.js `22.12.0` 或更高版本。

```bash
git clone https://github.com/NightSquirrl/inkfall-blog.git
cd inkfall-blog
npm install
npm run dev
```

开发服务器启动后，访问 `http://localhost:4321`。

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `npm run dev` | 启动本地开发服务器（`localhost:4321`） |
| `npm run build` | 构建生产版本到 `./dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run astro ...` | 运行 Astro CLI 命令（如 `astro add`、`astro check`） |
| `npm run format` | 格式化代码 |
| `npm run check` | 类型检查 |

管理后台开发服务器：`npm run astro dev stop`、`npm run astro dev status`、`npm run astro dev logs`。

## 定制站点

大多数设置集中在 `src/config/`：

- `siteConfig.ts`：站点名称、描述、语言、域名、作者、图标、首页主视觉与引言
- `aboutConfig.ts`：关于页面与联系方式、技术栈展示
- `navigationConfig.ts`：顶部导航
- `footerConfig.ts`：页脚链接
- `commentConfig.ts`：评论功能（Artalk）
- `fontConfig.ts`：字体
- `postConfig.ts`：阅读时长与文章时效提示
- `expressiveCodeConfig.ts`：代码高亮与展示

站点地址应设置为最终使用的域名，例如：

```ts
siteUrl: "https://your-domain.com",
```

## 编写含交互组件的笔记

内容集合支持 `.mdx`。若需要在笔记中嵌入 Vue 组件，将文件后缀改为 `.mdx`，在文件顶层导入组件，并在正文中使用 `client:*` 指令：

```mdx
---
title: 示例
publishedAt: 2026-01-01
category: "demo"
tags: ["demo"]
draft: false
---

import MyComponent from "./components/MyComponent.vue"

<div style="height:200px">
  <MyComponent client:load />
</div>
```

## 发布

砚秋 使用静态输出，适合部署到 GitHub Pages 等静态托管服务。

```bash
npm run build
```

构建结果位于 `dist/`。部署前，请确认站点地址、导航、内容与自定义域名均已完成配置。

仓库中的文章和隐私政策是用于展示主题效果的示例内容。开始使用前，请替换文章，并根据实际站点的服务与数据处理情况完善隐私政策。

## License

[MIT](LICENSE) © CnBarrier
