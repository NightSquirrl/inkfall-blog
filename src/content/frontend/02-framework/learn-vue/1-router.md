---
title: "11. vue-router"
description: "11. vue-router"
publishedAt: 2026-08-15
category: "learn-vue"
tags: ["Vue", "vue-router"]
draft: false
icon: material-icon-theme:folder-vue
---

# vue-router

## 路由的相关知识点

### 前端路由

> 前端路由是后来发展到SPA（单页应用）时才出现的概念。 SPA 就是一个WEB项目只有一个 HTML 页面，一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转。

前端路由在SPA项目中是必不可少的，页面的跳转、刷新都与路由有关，通过不同的url显示相应的页面。

优点：前后端的彻底分离，不刷新页面，用户体验较好，页面持久性较好。

### 后端路由

当在地址栏切换不同的url时，都会向服务器发送一个请求，服务器接收并响应这个请求，在服务端拼接好html文件返回给页面来展示。

优点：减轻了前端的压力，html都由后端拼接；

缺点：依赖于网络，网速慢，用户体验很差，项目比较庞大时，服务器端压力较大，

不能在地址栏输入指定的url访问相应的模块，前后端不分离。

### 路由模式

#### hash模式（对应HashHistory）

- 前端路由的路径用井号 # 拼接在真实 url 后面的模式，但是会覆盖锚点定位元素的功能，通过监听 URL 的哈希部分变化，相应地更新页面的内容。

- 前端路由的处理完全在客户端进行，在路由发生变化时，只会改变 URL 中的哈希部分(井号 # 后面的路径)，且不会向服务器发送新的请求，而是触发 onhashchange 事件。

- hash 只有#符号之前的内容才会包含在请求中被发送到后端，如果 nginx 没有匹配得到当前的 url 也没关系。hash 永远不会提交到 server 端。

- hash值的改变，都会在浏览器的访问历史中增加一个记录，所以可以通过浏览器的回退、前进按钮控制hash的切换。

- hash 路由不会造成 404 页面的问题，因为所有路由信息都在客户端进行解析和处理，服务器只负责提供应用的初始 HTML 页面和静态资源，不需要关心路由的匹配问题。

```javascript
// onhashchage事件，可以在window对象上监听这个事件
window.onhashchange = function (event) {
  console.log(event.oldURL, event.newURL);
  let hash = location.hash.slice(1);
};
```

#### history模式 （对应HTML5History）

- 是 html5 新推出的功能，比 Hash url 更美观

- 在 history 模式下浏览器在刷新页面时，会按照路径发送真实的资源请求。如果 nginx 没有匹配得到当前的 url ，就会出现 404 的页面。

- 在使用 history 模式时，需要**通过服务端支持允许地址可访问**，如果没有设置，就很容易导致出现 404 的局面。

- 改变url： history 提供了 pushState 和 replaceState 两个方法来记录路由状态，这两个方法只改变 URL 不会引起页面刷新。

- 监听url变化：通过 onpopstate 事件监听history变化，在点击浏览器的前进或者后退功能时触发，在onpopstate 事件中根据状态信息加载对应的页面内容。

```javascript
history.replaceState({}, null, "/b"); // 替换路由
history.pushState({}, null, "/a"); // 路由压栈，记录浏览器的历史栈 不刷新页面
history.back(); // 返回
history.forward(); // 前进
history.go(-2); // 后退2次

window.onpopstate = function (event) {
  // 根据当前 URL 加载对应页面
  loadPage(location.pathname);
};
```

history.pushState 修改浏览器地址，而页面的加载是通过 onpopstate 事件监听实现，加载对应的页面内容，完成页面更新。

onpopstate 事件是浏览器历史导航的核心事件,它标识了页面状态的变化时机。通过监听这个时机,根据最新的状态信息更新页面

当使用 history.pushState() 或 history.replaceState() 方法修改浏览器的历史记录时，不会直接触发 onpopstate 事件。

但是，可以在调用这些方法时将数据存储在历史记录条目的状态对象中， onpopstate 事件在处理程序中访问该状态对象。这样，就可以在不触发 onpopstate 事件的情况下更新页面内容，并获取到相应的状态值。

#### history 模式下 404 页面的处理

在 history 模式下，浏览器会向服务器发起请求，服务器根据请求的路径进行匹配：

如果服务器无法找到与请求路径匹配的资源或路由处理器，服务器可以返回 /404 路由，跳转到项目中配置的 404 页面，指示该路径未找到。

对于使用历史路由模式的单页应用（SPA），通常会在服务器配置中添加一个通配符路由，将所有非静态资源的请求都重定向到主页或一个自定义的 404 页面，以保证在前端处理路由时不会出现真正的 404 错误页面。

在项目中配置对应的 404 页面:

```javascript
export const publicRoutes = [
  {
    path: "/404",
    component: () => import("src/views/404/index"),
  },
];
```

## Vue2 | vue-router@3

> 安装

```javascript
yarn add vue-router@3
```

> 新建文件 src/router/index.js

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", redirect: "/home" }, // 设置根路径重定向到 '/home'
    { path: "/home", component: Home },
    { path: "/about", component: About },
  ],
});

export default router;
```

在上面的示例中，`redirect` 字段用于指定重定向的路径。

> 在入口文件挂在路由

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

```javascript
this.$router.push("/about");
```

## Vue3 | vue-router@4

> 安装

```shell
yarn add vue-router@4
```

> 新建文件 src/router/index.ts

```javascript
//1. 导入相关的 API
import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router

// 2. 定义路由组件.
// 也可以从其他文件导入
const routes:Array<RouterRecordRaw> = [
  {
    path:"/home/:id",
    name:"Home",
    component:()=>import('xxxx'),
    children:[
    ]
  },
   { path: '/', redirect: '/home' },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单


// vue2 mode history vue3 createWebHistory
// history
//
    window.addEventListener('popstate',()=>{})
// vue2 mode hash vue3 createWebHasHistory // 路径会多一个#/
// location.hash
//window.addEventListener('hashchange',()=> {})
const router = createRouter({
  history:createWebbbHistory(),
  routes
})

export default router;
```

> 在 vue 的入口文件进行挂在注册

```javascript
// 引入刚刚创建的router

// 4. 创建并挂载根实例
const app = Vue.createApp({});
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router);

app.mount("#app");
```

> 展示路由

```javascript
// 5. 展示
<router-view></router-view>
```

> 组件实现路由的跳转

```javascript
// 6. 跳转
// 组件跳转
//replace 不保留历史记录
<router-link replace to=''>
// 默认 push
<router-link :to='{name:"Home"}'>
```

> 编程式跳转

```javascript
//useRoute 取参数
import { useRouter,useRoute} from "vue-router"
const router = useRouter()
router.push('')
router.push({
  name:"",
  query:"",
  params:""
})
router.replace('')
router.go(1)
router.back()
//取参
const route = useRoute()
route.query.
route.params.
```

> 全局前置守卫

```javascript
router.beforeEach((to, from, next) => {
  to.path;
});

router.afterEach((to, from) => {
  to.path;
});
```
