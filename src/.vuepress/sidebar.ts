import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "前端",
      icon: "ph:browsers-fill",
      prefix: "web",
      children: "structure",
      collapsible: true,
    },
    {
      text: "后端",
      icon: "ri:server-fill",
      prefix: "rear-end",
      children: "structure",
      collapsible: true,
    },
    {
      text: "运维",
      icon: "iconoir:web-window-solid",
      prefix: "server",
      children: "structure",
      collapsible: true,

    },
    // {
    //   text: "文章",
    //   icon: "book",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
