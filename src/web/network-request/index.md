---
title: 12. XHR使用教程
icon: tabler:network
description: XHR 相关的 API
tag:
  - AJAX
  - XHR
  - 前端
---

### 1.XMLHttpRequest的意义和概念

XMLHttpRequest是一个特殊的对象，其目的是作用于服务器交换数据

#### 主要功能：

    它可以使网页在不重新加载的情况下更新网页

    在页面加载后向服务器发送请求

    在页面加载后从服务器接收数据

    在后台向服务器发送数据

### 2.属性

- readystate(只读):

  返回一个无符号短整型数字，代表请求的状态码

  0：表示XMLHttprequest实例已经生成，但是实例的open方法没有被调用

  1：表示open方法已经调用，可以使用实例的setRequestHeader()方法设置HTTP请求头信息。此时send方法还没调用

  2：表示实例的send方法已经调用，并且服务器返回的头信息和状态码已经收到

  3：表示正在接收服务器传来的数据体body部分。这时，如果实例的responseType属性等于text或者空字符串，responseText属性就会包含已经收到的部分信息

  4：表示服务器返回的数据已经完全接收，或本次接收已经失败

- onreadystatechange:

  当**readystate**属性发生变化时，调用的事件处理器

    - responseType:

      一个定义响应类型的枚举类

    - response(只读):

      返回根据**responseType**的的值来返回对应类型的响应实体

    - status(只读):

      返回一个无符号的短整型数字，代表请求的响应状态

    - timeout:

      一个无符号长整型数字，代表当前请求的最大请求时间，超出该事件，请求会自动终止

### 3.实例方法

- abort():

  如果请求已发出，则立刻终止请求。

- getAllResponseHeaders():

  以字符串形式返回所有使用CRLF分隔的响应头，如果没有收到响应，则返回null。

- getResponseHeader():

  返回包含指定响应头的字符串，如果响应未收到或者响应中不存在改响应头，则返回null。

- open():

  初始化一个请求。

- send():

  发送请求。如果请求是异步的，那么该方法将在请求发送后立即返回。

- setRequestHeader():

  设置HTTP请求表头的值，必须在**open()**之后，**send()**之前调用该方法。

### 3.使用XMLHttpRequest的方法

1.首先我们需要创建一个XMLHttpRequest对象，才能使用其功能

```JavaScript
const xhr = new XMLHttpRequest();
```


2.创建请求

2.创建请求

```javascript
xhr.open(method, url, async, user, password);
```


> **method**：HTTP 方法，比如 `GET`、`POST`、`PUT`、`DELETE`、等

**url**：发送请求的 URL

async：可选，布尔参数，默认为true，如果值为 `false`，`send()` 方法直到收到答复前不会返回。

user：可选，用户名用于认证用途；默认为 null。

password ：可选，密码用于认证用途，默认为 null。

3.发送请求

```javascript
xhr.send(body)
```


> body，可选参数，在 XHR 请求中要发送的数据体

例如：xhr.send("foo=bar&lorem=ipsum");

4.终止请求

```javascript
xhr.abort();
```


> 终止该请求。当一个请求被终止，它的 readyState 将被置为 xhr.UNSENT (0)，并且请求的 status 置为 0。

5.指定类型

```javascript
xhr.overrideMimeType(mimeType)
```


> 例如：xhr.overrideMimeType("text/plain");

一些常见的 MIME 类型：text/html，text/plain，text/css，text/javascript，application/json，application/xml，image/jpeg，image/png

6.设置HTTP响应头部的值

setRequestHeader() 方法必须在 open() 方法和 send() 方法之间调用。

```javascript
xhr.setRequestHeader(header, value);
```


> 例如：设置 Content-Type 的值为 application/json

HttpRequest.setRequestHeader("Content-Type", "application/json");

常见的HTTP响应头部

- Accept：指定客户端能够接收的内容类型。

- Accept-Charset：指定客户端能够接收的字符集。

- Accept-Encoding：指定客户端能够接收的内容编码。

- Accept-Language：指定客户端能够接收的语言。

- Authorization：包含客户端提供给服务器以验证自己身份的凭证。

- Cache-Control：指定请求和响应遵循的缓存机制。

- Connection：指定与连接相关的选项。

- Content-Length：指定请求体的长度，以字节为单位。

- Content-Type：指定请求体的 MIME 类型。

- Cookie：包含来自客户端的 Cookie 值。

- Host：指定被请求资源的主机名和端口号。

- If-Modified-Since：允许在请求中包含条件，只有请求内容在指定日期后或之后修改过才返回它。

- Referer：包含当前页面的 URL，用于标识请求是从哪个页面发送过来的。

- User-Agent：包含发起请求的用户代理。

