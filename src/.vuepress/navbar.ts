import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "前端", link: "/web/", icon: "ph:browsers-fill" },
  { text: "后端", link: "/rear-end/", icon: "ri:server-fill" },
  { text: "运维", link: "/server/", icon: "iconoir:web-window-solid" },
  {
    text: "web",
    icon: "logos:webstorm",
    children: [
      {
        text: "Vue",
        children: [
          { text: "Vue 文档", link: "/web/Vue文档/" },
          { text: "Vuex", link: "/web/Vue/vue-vuex-pinia" },
          { text: "vue-router", link: "/web/Vue/vue-router" },
        ],
      },
      {
        text: "React",
        children: [
          {
            text: "项目初始化",
            link: "/web/react/code-init/ant-unocss-ts-vite-react",
          },
        ],
      },
      {
        text: "PDF",
        children: [{ text: "PDFJS", link: "/web/PDF/pdfjs/index" }],
      },
      {
        text: "二维码 项目",
        children: [{ text: "项目手册", link: "/web/QrCode/index" }],
      },
      {
        text: "ThreeJS",
        children: [
          { text: "快速入门", link: "/web/threeJs/1-quick-get-start" },
          { text: "光影", link: "/web/threeJs/2-shadow" },
        ],
      },
      {
        text: "uni-app",
        children: [
          { text: "快速入门", link: "/web/uni-app/1-quick-get-start" },
        ],
      },
      {
        text: "webpack",
        children: [
          { text: "快速入门", link: "/web/webpack/index" },
          { text: "手动搭建 React 脚手架", link: "/web/webpack/Webpack+React" },
        ],
      },
      {
        text: "常用方法",
        link: "/web/common-method/Array",
      },
      {
        text: "FFmpeg",
        link: "/web/FFmpeg/index",
      },
      {
        text: "Rollup组件封装",
        link: "/web/component-packaging/rollup",
      },
      { text: "Echart", link: "/web/Echarts/index" },
      { text: "网络请求", link: "/web/network-request/XMLHttpRequest" },
      { text: "CSS", link: "/web/css/grid" },
      { text: "Google Drive", link: "/web/GoogleDrive/index" },
    ],
  },

  {
    text: "后端",
    icon: "devicon:intellij",
    children: [
      {
        text: "Java",
        link: "/rear-end/Java/1-IntroductionToFundamentals",
      },
      {
        text: "Maven",
        link: "/rear-end/JavaWeb/1-Maven",
      },
      {
        text: "SpringBoot",
        link: "/rear-end/JavaWeb/2-SpringBootBasis",
      },
      {
        text: "Mybatis",
        link: "/rear-end/JavaWeb/4-MybatisIntroduction",
      },
      {
        text: "Mybatis-Plus",
        link: "/rear-end/JavaWeb/10-mybatis-plus",
      },
      {
        text: "Redis",
        link: "/rear-end/JavaWeb/11-redis",
      },
    ],
  },
  {
    text: "运维",
    icon:"devicon:apache",
    children: [
      { text: "NGINX", link: "/server/NGINX/index" },
      { text: "Docker", link: "/server/Docker/index" },
      {
        text: "MySQL",
        children: [{ text: "安装", link: "/server/mysql/1-install" }],
      },
      {
        text: "Window 终端与Linux",
        link: "/server/window/terminal",
      },
    ],
  },
]);
