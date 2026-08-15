---
title: 17. 存储相关 Cookie
icon: iconoir:db
tag:
  - storage
star: true
---

## Cookie

Cookie 说白了就是一个存储在浏览器里的一个小小的文本文件，它附着在 HTTP 请求上，在浏览器和服务器之间“飞来飞去”。它可以携带用户信息，当服务器检查 Cookie 的时候，便可以获取到客户端的状态。

### 缺点：
- 4KB
- 过量的 Cookie 会带来巨大的性能浪费
- Cookie 是紧跟域名的
- Cookie 是明文传递的，容易泄露用户信息，安全性不高。

### 使用

1. 设置 Cookie：

   ```javascript
   document.cookie = "cookieName=cookieValue; expires=Thu, 31 Dec 2024 23:59:59 UTC; path=/";
   ```

   在上面的示例中，`cookieName` 是你要设置的 Cookie 的名称，`cookieValue` 是对应的值。`expires` 参数指定了 Cookie 的过期时间，这里设置为 2024 年 12 月 31 日。`path` 参数指定了 Cookie 的适用路径，这里设置为根路径 `/`。

2. 获取 Cookie：

   ```javascript
   const cookieValue = document.cookie;
   ```

   使用 `document.cookie` 可以获取当前页面的所有 Cookie。它返回一个字符串，包含了所有的 Cookie。

3. 解析 Cookie：

   ```javascript
   function parseCookie(cookieString) {
     const cookies = {};
     cookieString.split(';').forEach(cookie => {
       const [name, value] = cookie.split('=');
       const cookieName = decodeURIComponent(name.trim());
       const cookieValue = decodeURIComponent(value.trim());
       cookies[cookieName] = cookieValue;
     });
     return cookies;
   }
   
   const parsedCookies = parseCookie(document.cookie);
   ```

   上面的代码定义了一个 `parseCookie` 函数，它将 `document.cookie` 字符串解析为一个对象，其中 Cookie 的名称作为键，Cookie 的值作为对应的值。这样你就可以方便地通过 Cookie 名称访问其对应的值。

4. 删除 Cookie：

   ```javascript
   document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   ```

   要删除一个 Cookie，你可以将其过期时间设置为过去的时间（比如 1970 年 1 月 1 日），这样浏览器会自动删除该 Cookie。

### 携带到后端原理

 ======= 最重要的 在发送请求时，浏览器会自动将存储在当前域名下的 Cookie 附加到请求头中，以便在后端进行识别和验证。