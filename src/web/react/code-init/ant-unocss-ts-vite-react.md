---
description: vite axios unocss eslint antd ts react-router react-toastify
title:  react 脚手架封装
tag:
  - React
  - 初始代码库
  - antd
  - axios
  - 前端
---
<div align="center">
    <img width="200px" height="200px" src="https://www.z4a.net/images/2023/09/12/logo.png" />
    <h1>
		<a href="https://github.com/NightSquirrl/ant-unocss-ts-vite-react" target="_blank">ant-unocss-ts-vite-react</a>
	</h1>
    <p>-代码相关说明-</p>
</div>

<br />
<br />

# 主要使用到的技术
`vite axios unocss eslint antd ts react-router`

## vite
### 添加路径别名 @
`vite.config.ts`
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import path from "path";
import UnoCSS from "unocss/vite";
export default defineConfig({
  plugins: [react(), checker({ typescript: true }), UnoCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```
同步修改`tsconfig.json`
```javascript
  "paths":{
      "@/*": ["./src/*"]
    }
```
## axios
### 请求的封装
```javascript
import { message } from "antd";
import axios from 'axios'

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
      // 在发送请求之前做些什么
      return config
  },
  function (error) {
      message.warning(error.message ?? '未知请求错误')
      // 对请求错误做些什么
      return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据进行格式化
      if (response.data) {
          return response.data
      }
      return response
  },
  function (error) {
      const status = error.response?.status
      let { msg, message } = error.response?.data ?? {}

      if (!msg && message) {
          msg = message
      }

      if (!msg) {
          switch (status) {
              case 400:
                  msg = '参数错误'
                  break
              case 500:
                  msg = '服务端错误'
                  break
              case 404:
                  msg = '路由未找到'
                  break
              default:
                  msg = error.message ?? '未知响应错误'
                  break
          }
      }

      message.warning(msg)
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
  }
)

```
## unocss 原子 css

```javascript
/* eslint-disable no-useless-escape */
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from "unocss";

import presetAutoprefixer from "unocss-preset-autoprefixer";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  rules: [
    [/^h-([\.\d]+)$/, ([_, num]) => ({ height: `${num}px` })],
    [/^w-([\.\d]+)$/, ([_, num]) => ({ width: `${num}px` })],
    [/^w-100vw$/, ([_, num]) => ({ width: "100vw" })],
    [/^b-r-([\.\d]+)$/, ([_, num]) => ({ "border-radius": `${num}px` })],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetAttributify(),
    presetIcons({
      autoInstall: true,
    }),
    presetUno(),
    presetTypography(),
    presetAutoprefixer(["defaults", "not IE 11"]),
  ],
});

```
### 使用
默认的语法与 tailwindcss 相同
```javascript
export default function Home() {
  return (
    <>
      <div className="h-700 p-4">
       index
      </div>
    </>
  );
}

```
## react-router-dom
### 创建路由表
`src/router/index.tsx`
```javascript
import { Navigate, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
// 路由映射表
const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
  },
  // 路由重定向
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
];

export default routes;

```
### 使用
```javascript
import { useRoutes } from "react-router-dom";

import routes from "./router";

{useRoutes(routes)}

```
## react-toastify

> 添加全局的消息事件,默认右上角弹窗

```javascript
import { ToastContainer, toast } from "react-toastify";

window.toast = toast;

```
