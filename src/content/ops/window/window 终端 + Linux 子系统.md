---
title: window 终端 + Linux 子系统
tags: ["图床"]
draft: false
description: window 终端 + Linux 子系统
category: window
publishedAt: "2026-08-17"
---

## Hyper

## 安装Linux子系统

### 安装

window 搜索功打开虚拟和Linux

命令行终端安装Ubuntu

```bash
wsl --set-default-version 2

wsl -l -o

wsl.exe --install Ubuntu-22.04

```

### 换源

```bash
cd /etc/apt
sudo vim sources.list

ggdG清空文本

# https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/

sudo apt update
sudo apt install xfce4 --- 可视化面板
```

### 安装zsh

```bash
sudo apt install zsh

chsh -s /bin/zsh
```

### 安装 oh my zsh

```bash
sh -c "$(curl -fsSL https://gitee.com/Devkings/oh_my_zsh_install/raw/master/install.sh)"
```

### 安装 powerlevel10k

```bash
https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#fonts

重新进行配置
p10k configure

```

### 可视化面板

[下载安装 vcxsrv](https://sourceforge.net/projects/vcxsrv/)
-ac 参数
启动面板
sudo startxfce4
