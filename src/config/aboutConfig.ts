export const aboutConfig = {
  pageTitle: "关于",
  pageDescription: "了解砚秋的设计理念、核心特性与技术栈。",
  hero: {
    eyebrow: "关于砚秋",
    title: "你好，这里是 砚秋。",
    description: ["以留白、克制色彩与舒适排版，让内容成为焦点，呈现安静而专注的阅读体验。"],
  },
  // 联系方式图标来自 Iconify：https://icon-sets.iconify.design/。
  // `icon` 使用“图标集前缀:图标名称”；使用新的图标集前缀时，需要安装对应的 @iconify-json/<prefix> 包。
  links: [
    {
      name: "GitHub",
      icon: "fa7-brands:github",
      url: "https://github.com/NightSquirrl/inkfall-blog",
    },
  ],
  techStack: {
    title: "技术栈",
    description: "砚秋 所依赖的核心工具与技术。",
    // 图标来自 Iconify：https://icon-sets.iconify.design/。
    // `icon` 使用“图标集前缀:图标名称”；使用新的图标集前缀时，需要安装对应的 @iconify-json/<prefix> 包。
    items: [
      { icon: "devicon:astro", name: "Astro" },
      { icon: "devicon:typescript", name: "TypeScript" },
      { icon: "devicon:tailwindcss", name: "Tailwind CSS" },
    ],
  },
} as const;
