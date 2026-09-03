---
title: rollup 快速上手
tags: ["前端", "rollup"]
draft: false
description: rollup 快速上手
category: componentPackaging
publishedAt: "2026-08-15"
---

# rollup 使用案例

## 初始化

### 依赖安装

```javascript
yarn init -y
yarn add rollup
```

### 配置文件

`rollup.config.js`

```javascript
export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
};
```

### 启动

```shell
yarn rollup --config rollup.config.js

#报错

yarn rollup --config rollup.config.js --bundleConfigAsCjs

or

fix package.json add    "type": "module",
```

## 插件

> 默认只能够处理 ESModule

```shell
yarn add rollup-plugin-json # 用于导入 JSON 兵 tree-shakinng
yarn add rollup-plugin-node-resolve #允许加载第三方的模块
```

## 加载 CommonJS 模块

```shell
yarn add rollup-plugin-commonjs
```

## 代码拆分

动态导入

```javascript
import("./logger").then(({ log }) => {
  log("code split");
});
```

rollup.config.js

```javascript
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
export default {
  input: "src/index.js",
  output: {
    // file:"dist/bundle.js",
    dir: "dist",
    format: "amd",
  },
  plugins: [json(), nodeResolve(), commonjs()],
};
```

## 多入口打包

```javascript
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
export default {
  input: ["src/xxx.js", "src/.js"],
  output: {
    // file:"dist/bundle.js",
    dir: "dist",
    format: "amd",
  },
  plugins: [json(), nodeResolve(), commonjs()],
};
```

# 封装案例

> 组件封装模版

[项目地址](https://github.com/NightSquirrl/drop-upload-react)

## 初始化

```shell
npm init vite@latest

# 需要的依赖
"@rollup/plugin-typescript": "^11.1.2",
"rollup-plugin-babel": "^4.4.0",
"@rollup/plugin-babel": "^6.0.3",
"@rollup/plugin-commonjs": "^25.0.3",
"@rollup/plugin-node-resolve": "^15.1.0",
"typescript": "^5.0.2",
"rollup": "^2.79.1",
"rollup-plugin-auto-external": "^2.0.0",
"rollup-plugin-copy": "^3.4.0",
"rollup-plugin-peer-deps-external": "^2.2.4",
"rollup-plugin-postcss": "^4.0.2",
"sass": "^1.64.1",
"tslib": "^2.6.1",
"@babel/core": "^7.22.17",
```

对于 UI 组件的封装,直接复制 rollup 文件夹,只需要修改 types 里面的引入既可
打包命令 `    "build:lib": "rimraf dist && npx rollup -c rollup/rollup.config.js"`

本地测试:
先进行打包,然后将打包后的文件 dist 修改为任意的名称 xxx,然后进入到该目录,执行 npm link,此时会将该包添加到全局,在需要使用的项目中通过 npm link xxx
