---
title: 数组的相关算法
tag:
  - Array
  - 算法
---

# 数组的相关算法
## Reduce
```javascript
array.reduce((accumulator, currentValue,currentIndex,array)=> {
    // accumulator:累加器 就是上一次 return 的值,初始值,第二个参数为空的时候就是数组的第一个值
    // currentValue:当前值
    // currentIndex:当前索引
    // array:数组
    
}, initialValue)
```

### Demo
#### 数组中所有值的和
```javascript
// 数组中所有值的和
const arr = [1,2,3,4,5]
arr.reduce((accumulator,currentValue)=>{
    return accumulator + currentValue
})

```
#### 累加对象数组里面的值
```javascript
// 累加对象数组里面的值
const arr = [{a:1},{a:2},{a:3},{a:4},{a:5}]
arr.reduce((accumulator,currentValue)=>{
    return accumulator + currentValue.a
},0)
```
#### 展平嵌套数组
```javascript
// 展平嵌套数组
const arr = [[1,2,3],[4,5,6],[7,8,9]]
arr.reduce((accumulator,currentValue)=>{
    return accumulator.concat(currentValue)
},[])
```
#### 统计对象中值的出现次数
```javascript
// 统计对象中值的出现次数
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
    const currCount = allNames[name] ?? 0;
    return {
        ...allNames,
        [name]: currCount + 1,
    };
}, {});
// countedNames 的值是：
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

```
#### 按属性对对象进行分组
```javascript
const people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const groupedPeople = groupBy(people, "age");
console.log(groupedPeople);
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }

```

#### 数组去重
```javascript
const myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
const myArrayWithNoDuplicates = myArray.reduce((accumulator, currentValue) => {
  if (!accumulator.includes(currentValue)) {
    return [...accumulator, currentValue];
  }
  return accumulator;
}, []);

console.log(myArrayWithNoDuplicates);

```
#### 按顺序运行 Promise
```javascript
/**
 * 链接一系列 Promise 处理程序。
 *
 * @param {array} arr ——一个 Promise 处理程序列表，每个处理程序接收前一个处理程序解决的结果并返回另一个 Promise。
 * @param {*} input ——开始调用 Promise 链的初始值
 * @return {Object} ——由一系列 Promise 链接而成的 Promise
 */
// promiseChain.then(currentFunction)  
// 第一个参数是  Promise.resolve(input) 也就是 10
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input),
  );
}

// Promise 函数 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// Promise 函数 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// 函数 3——将由 `.then()` 包装在已解决的 Promise 中
function f3(a) {
  return a * 3;
}

// Promise 函数 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

```
