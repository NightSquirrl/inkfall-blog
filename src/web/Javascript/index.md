---
title: 10. JS 理论 apply bind call
icon: logos:javascript
tag:
  - Javascript
star: true
---

## 1. `apply` 方法

> `apply` 方法允许你调用一个函数，并指定函数内部的 `this` 值和一个参数数组（或类数组对象）作为参数。语法如下：

```js
function functionName(arg1, arg2, ...) {
  // 函数体
}

functionName.apply(thisValue, [arg1, arg2, ...]);
```

> `thisValue` 参数是要将函数绑定到的对象，它将成为函数内部的 `this` 值。`arg1`, `arg2`, ... 是函数的参数。

## 2. call

> `call` 方法与 `apply` 方法类似，但是参数需要按照单独的参数传递，而不是作为数组。语法如下：

```js
function functionName(arg1, arg2, ...) {
  // 函数体
}

functionName.call(thisValue, arg1, arg2, ...);
```

> `thisValue` 参数是要将函数绑定到的对象，`arg1`, `arg2`, ... 是函数的参数。

## 3. bind

> `bind`:它也可以用于改变函数的执行上下文。不同之处在于，`bind` 方法返回一个新的函数，而不是==立即执行函数==。你可以稍后调用返回的函数。

```js
function functionName(arg1, arg2, ...) {
  // 函数体
}

var boundFunction = functionName.bind(thisValue, arg1, arg2, ...);
boundFunction();
```

