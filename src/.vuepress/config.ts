import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/what-tools-blog/",
  dest:"src/.vuepress/dist/what-tools-blog",
  lang: "zh-CN",
  title: "Night.Soul",
  description: " NS 自用 Blog",
  theme,
  plugins: [
 
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
