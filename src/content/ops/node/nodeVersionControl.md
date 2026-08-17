---
title: node 版本控制
description: node 版本控制
publishedAt: 2026-08-17
category: node
tags:
  - node
  - nvm
draft: false
---
# node 版本控制
## 下载安装

[NVM Window github 地址如下](https://github.com/coreybutler/nvm-windows/releases)

[其他系统的下载地址](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

选择合适的系统版本下载

## 换源

一般是在 setting.txt 文件中 添加
```bash
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## 常用命令

```bash
nvm list available #查显示可以安装的所有node.js的版本
nvm install 18.7.0 # 安装指定的版本
nvm ls # 列出所有已经安装的版本
nvm use 18.7.0 # 使用已经安装的版本
nvm current # 显示当前的版本
nvm uninstall # 卸载指定的版本
```