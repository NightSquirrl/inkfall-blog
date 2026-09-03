---
title: uni-app 快速入门
tags: ["uni-app"]
draft: false
description: uni-app 快速入门
category: uni-app
publishedAt: "2026-08-15"
---

## 1. 项目的创建方式

### 1.1 创建 uni-app 项目方式

**uni-app 支持两种方式创建项目：**

1. 通过 HBuilderX 创建（需安装 HBuilderX 编辑器）
2. 通过命令行创建（需安装 NodeJS 环境）

## 2. HBuilderX 创建 uni-app 项目

1. 通过可视化的 hbuilderx 的界面创建项目

![uniapp_picture_2.609bc846](https://img.picgo.net/2023/11/24/uniapp_picture_2.609bc84658543df29435596a.png)

2. **安装 uni-app vue3 编译器插件**
3. 点击工具->安装插件,选择 uni-app(vue3)
4. 打开微信小程序开发者工具,点击设置,点击安全,打开服务端口
5. 在 hbuilderx 中点击运行,选择微信开发者工具
   1. 然后就会在微信小程序打开,可以点击运行实时查看我们的界面

## 3. 命令行创建 uni-app 项目

**优势**

通过命令行创建 uni-app 项目，**不必依赖 HBuilderX**，TypeScript 类型支持友好。

**命令行创建** **uni-app** **项目：**

vue3 + ts 版

### github

```bash
# 通过 npx 从 github 下载
npx degit dcloudio/uni-preset-vue#vite-ts 项目名称
```

### 国内 gitee

```bash
# 通过 git 从 gitee 克隆下载
git clone -b vite-ts https://gitee.com/dcloud/uni-preset-vue.git
```

> 常见问题
>
> - 运行 `npx` 命令下载失败，请尝试换成**手机热点重试**
> - 换手机热点依旧失败，请尝试从[国内备用地址下载](https://gitee.com/dcloud/uni-preset-vue/tree/vite-ts/)
> - 在 `manifest.json` 文件添加 [小程序 AppID](https://mp.weixin.qq.com/) 用于真机预览
> - 运行 `npx` 命令需依赖 NodeJS 环境，[NodeJS 下载地址](https://nodejs.org/zh-cn)
> - 运行 `git` 命令需依赖 Git 环境，[Git 下载地址](https://git-scm.com/download/)

## 4. VS Code 开发 uni-app 项目

### 为什么选择 VS Code？

- VS Code 对 **TS 类型支持友好**，前端开发者**主流的编辑器**
- HbuilderX 对 TS 类型支持暂不完善，期待官方完善

### 用 VS Code 开发配置

项目采用 Vue3 + TS 开发 uni-app 项目，所以需要分别安装 Vue3 + TS 插件 和 uni-app 插件。

#### 安装 Vue3 + TS 插件

> 注意事项
>
> 没开发过 Vue3 + TS 项目的小伙伴注意，需要先安装 Vue3 和 TS 的插件，并完成以下配置
>
> - 安装 [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) ：Vue3 语法提示插件
> - 安装 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) ：Vue3 的 TS 插件
> - **工作区禁用** Vetur 插件(Vue2 插件和 Vue3 插件冲突)
> - **工作区禁用** @builtin typescript 插件（禁用后自动开启 Vue3 的 TS 托管模式）
>
> [查看 Vue3 官方文档](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)

![uniapp_vscode_setting.75574ba6](https://img.picgo.net/2023/11/24/uniapp_vscode_setting.75574ba64ddb340202c90793.png)

#### 安装 uni-app 插件

- 安装 uni-app 开发插件
- [uni-create-view](https://marketplace.visualstudio.com/items?itemName=mrmaoddxxaa.create-uniapp-view) ：快速创建 uni-app 页面
- [uni-helper](https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-helper-vscode) ：uni-app 代码提示
- [uniapp 小程序扩展](https://marketplace.visualstudio.com/items?itemName=evils.uniapp-vscode) ：鼠标悬停查文档
- TS 类型校验
- 安装 **类型声明文件** `pnpm i -D miniprogram-api-typings @uni-helper/uni-app-types`
- 配置 `tsconfig.json`
- JSON 注释问题
- 设置文件关联，把 `manifest.json` 和 `pages.json` 设置为 `jsonc`

`tsconfig.json` 参考

```json
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    // 类型声明文件
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types" // uni-app 组件类型
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    // 原配置 `experimentalRuntimeMode` 现调整为 `nativeTags`
    "nativeTags": ["block", "component", "template", "slot"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

**工作区设置参考**

```json
// .vscode/settings.json
{
  // 在保存时格式化文件
  "editor.formatOnSave": true,
  // 文件格式化配置
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置语言的文件关联
  "files.associations": {
    "pages.json": "jsonc", // pages.json 可以写注释
    "manifest.json": "jsonc" // manifest.json 可以写注释
  }
}
```

> 版本升级
>
> - 原依赖 `@types/wechat-miniprogram` 现调整为 [miniprogram-api-typings](https://github.com/wechat-miniprogram/api-typings)。
> - 原配置 `experimentalRuntimeMode` 现调整为 `nativeTags`。

这一步处理很关键，否则 TS 项目无法校验组件属性类型。

## 5. 解读 pages.json

用于配置页面路由、导航栏、tabBar 等页面类信息

```json
{
  // 页面路由
  "pages": [
    {
      "path": "pages/index/index",
      // 页面样式配置
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/my/my",
      "style": {
        "navigationBarTitleText": "我的"
      }
    }
  ],
  // 全局样式配置
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#27BA9B",
    "backgroundColor": "#F8F8F8"
  },
  // tabBar 配置
  "tabBar": {
    "selectedColor": "#27BA9B",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/tabs/home_default.png",
        "selectedIconPath": "static/tabs/home_selected.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "static/tabs/user_default.png",
        "selectedIconPath": "static/tabs/user_selected.png"
      }
    ]
  }
}
```

## 6. uni-app 和原生小程序开发区别

### 开发区别

uni-app 项目每个页面是一个 `.vue` 文件，数据绑定及事件处理同 `Vue.js` 规范：

1. 属性绑定 `src="{ { url }}"` 升级成 `:src="url"`
2. 事件绑定 `bindtap="eventName"` 升级成 `@tap="eventName"`，**支持（）传参**
3. 支持 Vue 常用**指令** `v-for`、`v-if`、`v-show`、`v-model` 等

### 其他区别补充

1. 调用接口能力，**建议前缀** `wx` 替换为 `uni` ，养成好习惯，**支持多端开发**。
2. `<style>` 页面样式不需要写 `scoped`，小程序是多页面应用，**页面样式自动隔离**。
3. **生命周期分三部分**：应用生命周期(小程序)，页面生命周期(小程序)，组件生命周期(Vue)

## 7. 组件库

安装 [uni-ui 组件库](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#npm安装)

```bahs
pnpm i @dcloudio/uni-ui
```

配置自动导入组件

```json
// pages.json
{
  // 组件自动导入
  "easycom": {
    "autoscan": true,
    "custom": {
+      // uni-ui 规则如下配置
+      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  },
  "pages": [
    // …省略
  ]
}
```

**安装类型声明文件**

```bash
pnpm i -D @uni-helper/uni-ui-types
```

**配置类型声明文件**

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types", // uni-app 组件类型
+      "@uni-helper/uni-ui-types" // uni-ui 组件类型
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
  }
}
```

## 8. 小程序端 Pinia 持久化

说明：`Pinia` 用法与 `Vue3` 项目完全一致，`uni-app` 项目仅需解决**持久化插件兼容性**问题。

### 持久化存储插件

安装持久化存储插件： [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html#storage)

```sh
pnpm i pinia-plugin-persistedstate
```

插件默认使用 `localStorage` 实现持久化，小程序端不兼容，需要替换持久化 API。

> Stores/modules/member.ts

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    persist: true,
  },
)
```

> Stores/index/ts

```js
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

// 创建 pinia 实例
const pinia = createPinia();
// 使用持久化存储插件
pinia.use(persist);

// 默认导出，给 main.ts 使用
export default pinia;

// 模块统一导出
export * from "./modules/member";
```

> main.ts

```js
import { createSSRApp } from "vue";
import pinia from "./stores";

import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);
  return {
    app,
  };
}
```

### 多端兼容

**网页端持久化 API**

```js
// 网页端API
localStorage.setItem();
localStorage.getItem();
```

**多端持久化 API**

```js
// 兼容多端API
uni.setStorageSync();
uni.getStorageSync();
```

**参考代码**

```js
// stores/modules/member.ts
export const useMemberStore = defineStore(
  "member",
  () => {
    //…省略
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
        getItem(key) {
          return uni.getStorageSync(key);
        },
      },
    },
  },
);
```

## 9. uni.request 请求封装

### 请求和上传文件拦截器

> 实现需求
>
> 1. 拼接基础地址
> 2. 设置超时时间
> 3. 添加请求头标识
> 4. 添加 token

参考代码

```js
// src/utils/http.ts

// 请求基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时
    options.timeout = 10000
    // 3. 添加小程序端请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)
```

> 常见问题
>
> **问:**  为什么用手机预览没有数据？
>
> **答:**  微信小程序端，需登录 [微信公众平台](https://mp.weixin.qq.com/) 配置以下地址为合法域名
>
> ```
> https://pcapi-xiaotuxian-front-devtest.itheima.net
> ```

### 封装 Promise 请求函数

实现需求

1. 返回 Promise 对象，用于处理返回值类型
2. 成功 resolve
   1. 提取数据
   2. 添加泛型
3. 失败 reject
   1. 401 错误
   2. 其他错误
   3. 网络错误

```js
/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
  code: string
  msg: string
  result: T
}
// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
```

## 10. 统一代码风格

- 安装 `eslint` + `prettier`

```bash
pnpm i -D eslint prettier eslint-plugin-vue @vue/eslint-config-prettier @vue/eslint-config-typescript @rushstack/eslint-patch @vue/tsconfig
```

- 新建 `.eslintrc.cjs` 文件，添加以下 `eslint` 配置

```js
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  // 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    getApp: true,
    UniApp: true,
    UniHelper: true,
    App: true,
    Page: true,
    Component: true,
    AnyObject: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: "all",
        endOfLine: "auto",
      },
    ],
    "vue/multi-word-component-names": ["off"],
    "vue/no-setup-props-destructure": ["off"],
    "vue/no-deprecated-html-element-is": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
  },
};
```

- 配置 `package.json`

```json
{
  "script": {
    // ... 省略 ...
    "lint": "eslint . --ext .vue,.js,.ts --fix --ignore-path .gitignore"
  }
}
```

- 运行

```bash
pnpm lint
```

### Git 工作流规范 --- husky

- 安装并初始化 `husky`

```bash
pnpm dlx husky-init

npx husky-init
```

- 安装 `lint-staged`

```bash
pnpm i -D lint-staged
```

- 配置 `package.json`

```json
{
  "script": {
    // ... 省略 ...
  },
  "lint-staged": {
    "*.{vue,ts,js}": ["eslint --fix"]
  }
}
```

- 修改 `.husky/pre-commit` 文件

```bash
- npm test
+ npm run lint-staged
```

## 11. 安全区域

不同手机的安全区域不同，适配安全区域能防止页面重要内容被遮挡。

可通过 `uni.getSystemInfoSync()` 获取屏幕边界到安全区的距离。

![安全区域](https://img.picgo.net/2023/11/24/home_picture_2.89dbf50654a7fda1fc332c6b.png)

**自定义导航配置**

```json
// src/pages.json
{
  "path": "pages/index/index",
  "style": {
    "navigationStyle": "custom", // 隐藏默认导航
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "首页"
  }
}
```

**组件安全区适配**

```js
<!-- src/pages/index/componets/CustomNavbar.vue -->
<script>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <!-- 顶部占位 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- ...省略 -->
  </view>
</template>
```

## 12. 父组件调用子组件的方法

实现流程

> 父组件传递参数 ref="child"
>
> 获取组件的实例类型主要是 ts 使用
>
> 父组件调用
>
> Child.value.子方法
>
> 子组件暴漏方法

```js

export type types = InstanceType<typeof  子组件>

child.value.暴漏的方法的 key

defineExpose({
  暴露方法的 key:具体的暴漏方法
})
```

## 13. 下拉刷新

基于 `scroll-view` 组件实现下拉刷新，需要通过以下方式来实现下拉刷新的功能。

- 配置 `refresher-enabled` 属性，开启下拉刷新交互
- 监听 `@refresherrefresh` 事件，判断用户是否执行了下拉操作
- 配置 `refresher-triggered` 属性，关闭下拉状态

## 14. 骨架屏

在微信小程序的模拟器界面点击页面信息

![image-20231124213814562](https://img.picgo.net/2023/11/24/image-20231124213814562917856bb6661864e.png)

![image-20231124213829370](https://img.picgo.net/2023/11/24/image-202311242138293702604bbff0de03b52.png)

将生成的代码进行修改 vue 即可

## 15. WX 获取登录凭证

前端：调用 [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 接口获取登录凭证（code）。

### 获取手机号码

出于安全限制，小程序【规定】想获取用户的手机号，必须由用户主动【点击按钮】并【允许申请】才可获取加密的手机号信息。

**前端**：提供 `open-type` 按钮，在事件处理函数中获取加密的手机号信息。

```js
<button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
  <text class="icon icon-phone"></text>
手机号快捷登录
  </button>
```

## 16. 分包预下载

当用户进入【我的】页面时，由框架自动预下载【会员模块】的分包，提升进入后续分包页面时的启动速度。

### 操作方式

新建一个文件夹专门用来存储分包的页面

如果已经配置了之前 vscode 的插件

可以右键文件夹选择分包页面

```json
// src/pages.json

{
  // ...省略
  // 分包加载规则
  "subPackages": [
    {
      // 子包的根目录
      "root": "pagesMember",
      // 页面路径和窗口表现
      "pages": [
        {
          "path": "settings/settings",
          "style": {
            "navigationBarTitleText": "设置"
          }
        }
      ]
    }
  ],
  // 分包预下载规则
  "preloadRule": {
    "pages/my/my": {
      "network": "all",
      "packages": ["pagesMember"]
    }
  }
}
```

## 17. 项目打包

### 核心步骤

1. 运行打包命令 `pnpm build:mp-weixin`
2. 预览和测试，微信开发者工具导入生成的 `/dist/build/mp-weixin` 目录
3. 上传小程序代码
4. 提交审核和发布

### 条件编译

> 常见问题
>
> Q：按照 uni-app 规范开发可保证多平台兼容，但每个平台有自己的一些特性，该如何处理？
>
> A：通过 [条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)，让代码按条件编译到指定平台。

**网页端不支持微信平台授权登录等功能**，可通过 [条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)，实现不同端渲染不同的登录界面。

### 条件编译语法

通过特殊注释，以  **​`#ifdef`​** 或  **​`#ifndef`​** 加 **平台名称** 开头，以  **​`#endif`​** 结尾。

多平台编译： **​`#ifdef H5 || MP-WEIXIN`​** 表示在 **H5 端 或 微信小程序端** 代码。

条件编译支持: 支持 .vue, .ts, .js, .scss, .css, pages.json 等文件。

```vue
<script setup lang="ts">
// 微信平台特有API，需要条件编译
// #ifdef MP-WEIXIN
wx.login();
wx.requestPayment();
// #endif
</script>

<template>
  <!-- 微信开发能力按钮，需要条件编译 -->
  <!-- #ifdef MP-WEIXIN -->
  <button open-type="openSetting">授权管理</button>
  <button open-type="feedback">问题反馈</button>
  <button open-type="contact">联系我们</button>
  <!-- #endif -->
</template>

<style>
/* 如果出现样式兼容，也可添加条件编译 */
page {
  /* #ifdef H5 */
  background-color: pink;
  /* #endif */
}
</style>
```

> 开发技巧
>
> 可通过搜索 `wx.` 和 `open-type` 等平台关键词，快速查找需要**小程序端**需添加编译模式的代码。

### 打包为 H5 端

把当前 uni-app 项目打包成网页(H5)端，并配置路由基础路径。

### 核心步骤

1. 运行打包命令 `pnpm build:h5`
2. 预览和测试，使用浏览器打开 `/dist/build/h5` 目录下的 `index.html` 文件
3. 由运维部署到服务器

### 路由基础路径

默认的路由基础路径为 `/` 根路径，部分网站并不是部署到根路径，需要按运维要求调整。

```json
// manifest.json
{
  /* 网页端特有配置 */
  "h5": {
    "router": {
      // 基础路径：./ 为相对路径
      "base": "./"
    }
  } /* 小程序特有相关 */,
  "mp-weixin": {
    // …省略
  },
  "vueVersion": "3"
}
```

### 打包为 APP 端

[App 端](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html) 的打包，预览、测试、发行，使用 `HBuilderX` 工具。
