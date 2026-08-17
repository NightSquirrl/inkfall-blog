export const aboutConfig = {
  pageTitle: "关于",
  pageDescription: "了解 砚秋 的设计理念、特点与技术栈。",
  hero: {
    eyebrow: "ABOUT INKFALL",
    title: "你好，这里是 砚秋。",
    description: ["一个简洁、安静的 Astro 博客主题。", "以舒展的留白、克制的色彩和舒适的排版，让内容自然成为焦点。"],
  },
  // 联系方式图标来自 Iconify：https://icon-sets.iconify.design/。
  // `icon` 使用“图标集前缀:图标名称”；使用新的图标集前缀时，需要安装对应的 @iconify-json/<prefix> 包。
  links: [
    {
      name: "GitHub",
      icon: "fa7-brands:github",
      url: "https://github.com/CnBarrier404/astro-theme-inkfall",
    },
  ],
  techStack: {
    title: "技术栈",
    description: "用于构建和维护 砚秋 的核心工具。",
    // 图标来自 Iconify：https://icon-sets.iconify.design/。
    // `icon` 使用“图标集前缀:图标名称”；使用新的图标集前缀时，需要安装对应的 @iconify-json/<prefix> 包。
    items: [
      { icon: "devicon:astro", name: "Astro" },
      { icon: "devicon:typescript", name: "TypeScript" },
      { icon: "devicon:tailwindcss", name: "Tailwind CSS" },
    ],
  },
} as const;
