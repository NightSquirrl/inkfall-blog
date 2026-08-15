---
title: Javascript 防抖和节流
star: true
---

## 防抖
> 在一定的时间内触发一次
> [额外知识点类数组对象](/web/Javascript/Arguments) arguments
```js
function debounce(fun, delay) {
    let timer;
    return function() {
        if(timer) clearTimeout(timer)
        let args = arguments
        timer = setTimeout(()=> {
         fun.apply(this,args)
         },delay)
    }
}
```


## 节流
> 在一定时间内之后必定触发一次
```js
function throttle(fun,time) {
    let start = 0;
    return function () {
        let now = new Date();
        if(now - start > time) {
            fun().apply(this,arguments);
            start = now
        }
    }
}
```