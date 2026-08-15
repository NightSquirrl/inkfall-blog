---
title: 20. Web Worker
icon: gravity-ui:person-worker
tag:
  - web
  - 前端
---

## 1. 什么是 Web Worker

Js 是单线程的代码,意思是同一时间只能干一件事情,比如前端的界面在 loading,JS 在进行大量的运算,就会导致页面卡住.

Web Worker允许我们在 js 主线程之外开辟新的 Worker 线程，并将一段 js 脚本运行其中，它赋予了开发者利用 js 操作多线程的能力。

## 2. Web Worker 的使用

### 创建 `worker`

```js
const worker = new Worker(path, options);
```

| 参数                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| path                | 有效的js脚本的地址，必须遵守同源策略。无效的js地址或者违反同源策略，会抛出`SECURITY_ERR `类型错误 |
| options.type        | 可选，用以指定 worker 类型。该值可以是 `classic` 或 `module`。 如未指定，将使用默认值 `classic` |
| options.credentials | 可选，用以指定 worker 凭证。该值可以是 `omit`, `same-origin`，或 `include`。如果未指定，或者 type 是 `classic`，将使用默认值 `omit` (不要求凭证) |
| options.name        | 可选，在 [`DedicatedWorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/DedicatedWorkerGlobalScope) 的情况下，用来表示 worker 的 scope 的一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Global_Objects/String_6fa58bba0570d663099f0ae7ae8883ab) 值，主要用于调试目的。 |

### js 主线程与 worker 线程数据传递

主线程与 worker 线程都是通过 `postMessage` 方法来发送消息，以及监听 `message` 事件来接收消息。如下所示：

> main.js（主线程）

```js
const myWorker = new Worker('/worker.js'); // 创建worker

myWorker.addEventListener('message', e => { // 接收消息
    console.log(e.data); // Greeting from Worker.js，worker线程发送的消息
});

// 这种写法也可以
// myWorker.onmessage = e => { // 接收消息
//    console.log(e.data);
// };

myWorker.postMessage('Greeting from Main.js'); // 向 worker 线程发送消息，对应 worker 线程中的 e.data

```

> 主线程与 worker 线程之间的数据传递是传值而不是传地址。

> worker

```js
// worker.js（worker线程）
self.addEventListener('message', e => {
    self.postMessage(e.data); // 将接收到的数据直接返回
});
```

### 监听错误信息

web worker 提供两个事件监听错误，`error` 和 `messageerror`。这两个事件的区别是:

| 事件           | 描述                                              |
| -------------- | ------------------------------------------------- |
| `error`        | 当worker内部出现错误时触发                        |
| `messageerror` | 当 `message` 事件接收到无法被反序列化的参数时触发 |

监听方式跟接收消息一致：

```js
// main.js（主线程）
const myWorker = new Worker('/worker.js'); // 创建worker

myWorker.addEventListener('error', err => {
    console.log(err.message);
});
myWorker.addEventListener('messageerror', err => {
    console.log(err.message)
});

```

```js
// worker.js（worker线程）
self.addEventListener('error', err => {
    console.log(err.message);
});
self.addEventListener('messageerror', err => {
    console.log(err.message);
});

```

### 关闭 worker 线程

> worker 线程的关闭在主线程和 worker 线程都能进行操作，但对 worker 线程的影响略有不同。

```js
// main.js（主线程）
const myWorker = new Worker('/worker.js'); // 创建worker
myWorker.terminate(); // 关闭worker

```

```js
// worker.js（worker线程）
self.close(); // 直接执行close方法就ok了
```

区别是，在主线程手动关闭 worker，主线程与 worker 线程之间的连接都会被立刻停止，即使 worker 线程当前的 Event Loop 中仍有待执行的任务继续调用 `postMessage()` 方法，但主线程不会再接收到消息。

在 worker 线程内部关闭 worker，不会直接断开与主线程的连接，而是等 worker 线程当前的 Event Loop 所有任务执行完，再关闭。也就是说，在当前 Event Loop 中继续调用 `postMessage()` 方法，主线程还是能通过监听`message`事件收到消息的。

### Worker 线程引用其他js文件

> utils.js

```js
const add = (a, b) => a + b;
```

> worker.js（worker线程）

```js
// 使用方法：importScripts(path1, path2, ...); 

importScripts('./utils.js');

console.log(add(1, 2)); // log 3

```

### ESModule 模式

还有一些场景，当你开启一个新项目，正高兴的用 `importScripts()` 导入js文件时发现， `importScripts()` 方法执行失败。仔细一看，原来是新项目的 js 文件都用的是 ESModule 模式。难道要把引用到的文件都改一遍吗？当然不用，还记得上文提到初始化 worker 时的第二个可选参数吗，我们可以直接使用 module 模式初始化 worker 线程！

```js
// main.js（主线程）
const worker = new Worker('/worker.js', {
    type: 'module'  // 指定 worker.js 的类型
});

```

```js
// utils.js
export default add = (a, b) => a + b;

```

```js
// worker.js（worker线程）
import add from './utils.js'; // 导入外部js

self.addEventListener('message', e => { 
    postMessage(e.data);
});

add(1, 2); // log 3

export default self; // 只需把顶级对象self暴露出去即可

```

### 主线程和 worker 线程可传递哪些类型数据

很多场景，在调用某些方法时，我们将一些自定义方法当作参数传入。但是，当你使用 `postMessage()` 方法时这么做，将会导致 `DATA_CLONE_ERR` 错误。

`postMessage()` 传递的数据可以是由结构化克隆算法处理的任何值或 JavaScript 对象，包括循环引用。

结构化克隆算法**不能处理**的数据：

- `Error` 以及 `Function` 对象；
- DOM 节点
- 对象的某些特定参数不会被保留
  - `RegExp `对象的 `lastIndex` 字段不会被保留
  - 属性描述符，setters 以及 getters（以及其他类似元数据的功能）同样不会被复制。例如，如果一个对象用属性描述符标记为 read-only，它将会被复制为 read-write
  - 原形链上的属性也不会被追踪以及复制。

#### 结构化克隆算法**支持**的数据类型：

| 类型                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [所有的原始类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures%23%E5%8E%9F%E5%A7%8B%E5%80%BC) | symbols 除外                                                 |
| [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象 |                                                              |
| String 对象                                                  |                                                              |
| [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) |                                                              |
| [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | `lastIndex` 字段不会被保留。                                 |
| [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) |                                                              |
| [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) |                                                              |
| [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) |                                                              |
| [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) |                                                              |
| [ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | 这基本上意味着所有的 [类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays) ，如 Int32Array 等。 |
| [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) |                                                              |
| [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) |                                                              |
| [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) | 仅包括普通对象（如对象字面量）                               |
| [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) |                                                              |
| [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) |                                                              |