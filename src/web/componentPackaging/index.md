---
title: 02. 组件 | SDK 封装
icon: tabler:sdk
tag:
  - 前端
  - rollup
  - SDK
---

## 项目初始化
创建文件rollup.config.js
```javascript
npm init -y
tsc --init


npm install rollup -D
npm install rollup-plugin-dts -D
npm install rollup-plugin-typescript2 -D
npm install typescript -D
```
## Parcel
启动命令 yarn parcel src/index.html

> 一句话,做你任何你想做的事情,一切交给 parcel,包括依赖的自动安装

打包

```shell
yarn parcel build src/index.html
```
## 发布npm
1. npm adduser
用户名 密码 邮箱 邮箱验证码
2. npm login  
输入刚才的 用户名 密码 邮箱 验证码
3. npm publish 发布
