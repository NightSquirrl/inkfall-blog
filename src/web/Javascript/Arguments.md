---
title: Arguments 类数组对象

---

## Arguments 类数组对象

[MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)


### Demo

```js

function func1(a, b, c) {
  console.log(arguments[0]);
  // Expected output: 1

  console.log(arguments[1]);
  // Expected output: 2

  console.log(arguments[2]);
  // Expected output: 3
}

func1(1, 2, 3);

```