---
title: "WebSocket 快速使用教程"
description: "WebSocket 快速使用教程"
publishedAt: 2026-08-15
category: "network-request"
tags: ["WebSocket", "前端"]
draft: false
---

# WebSocket

## 使用教程

1. 创建 WebSocket 对象：

```javascript
const socket = new WebSocket("wss://example.com/socket");
```

> 在括号内，要指定 WebSocket 服务器的 URL。注意要使用 "wss://" 开头来表示安全的 WebSocket 连接，如果是非安全的连接则使用 "ws://"。

2. 监听 WebSocket 事件：

```javascript
socket.onopen = function () {
  console.log("WebSocket connection established.");
};

socket.onmessage = function (event) {
  console.log("Received message: " + event.data);
};

socket.onclose = function () {
  console.log("WebSocket connection closed.");
};
```

- `onopen` 事件在 WebSocket 连接建立后触发。
- `onmessage` 事件在接收到服务器发送的消息时触发，通过 `event.data` 可以获取消息内容。
- `onclose` 事件在 WebSocket 连接关闭后触发。

3. 发送数据给服务器：

```javascript
socket.send("Hello, server!");
```

4. 关闭 WebSocket 连接：

```javascript
socket.close();
```
