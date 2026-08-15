---
title: Javascript 面试题
tag:
  - 面试
  - Javascript
---

## 1. 根据下面 ES6 构造函数的书写方式，要求写出 ES5 的
```js
class Example { 
  constructor(name) { 
    this.name = name;
  }
  init() { 
    const fun = () => { console.log(this.name) }
    fun(); 
  } 
}
const e = new Example('Hello');
e.init();

```
> 参考

```js
function Example(name) {
    'use strict'
      if (!new.target) {
           throw new TypeError('Class constructor cannot be invoked without new');
      }
      this.name = name;
}

Object.defineProperty(Example.prototype, 'init', {
      enumerable: false,
      value: function () {
           'use strict';
           if (new.target) {
               throw new TypeError('init is not a constructor');
           }
           var fun = function () {
               console.log(this.name);
           }
           fun.call(this);
      }
})

```

## 2. 数组去重有哪些方法？（美团 19 年）

```js
// 数字或字符串数组去重，效率高
function unique(arr) {
      var result = {}; // 利用对象属性名的唯一性来保证不重复
      for (var i = 0; i < arr.length; i++) {
           if (!result[arr[i]]) {
               result[arr[i]] = true;
           }
      }
      return Object.keys(result); // 获取对象所有属性名的数组
}

// 任意数组去重，适配范围广，效率低
function unique(arr) {
      var result = []; // 结果数组
      for (var i = 0; i < arr.length; i++) {
           if (!result.includes(arr[i])) {
               result.push(arr[i]);
           }
      }
      return result;
}

// 利用ES6的Set去重，适配范围广，效率一般，书写简单
function unique(arr) {
      return [...new Set(arr)]
}

```
## 3. 描述下列代码的执行结果
> 示例代码

```js
 function f(count) {
    console.log(`foo${count}`);
    setTimeout(() => { console.log(`bar${count}`); });
 }
 f(1);
 f(2);
 setTimeout(() => { f(3); });

```

> 参考结果
> foo1
> foo2
> bar1
> bar2
> foo3
> bar3
> 这个完全是考察的异步的知识。调用 f(1)  的时候，会执行同步代码，打印出 foo1，然后 03 行的 setTimeout 被放入到异步执行队列，接下来调用 f(2)  的时候，打印出 foo2，后面 03 行的 setTimeout 又被放入到异步执行队列。然后执行 07 行的语句，被放入到异步执行队列。至此，所有同步代码就都执行完毕了。
> 接下来开始执行异步代码，那么大家时间没写，就都是相同的，所以谁先被放入到异步队列，谁就先执行，所以先打印出 bar1、然后是 bar2，接下来执行之前 07 行放入到异步队列里面的 setTimeout，先执行 f 函数里面的同步代码，打印出 foo3，然后是最后一个异步，打印出 bar3

## 4. 箭头函数有哪些特点

> 更简洁的语法，例如
>
> - 只有一个形参就不需要用括号括起来
> - 如果函数体只有一行，就不需要放到一个块中
> - 如果 *return* 语句是函数体内唯一的语句，就不需要 *return* 关键字
>
> 箭头函数没有自己的 *this*，*arguments*，*super*
>
> 箭头函数 *this* 只会从自己的作用域链的上一层继承 *this*。

## 5. 说一说类的继承

> 继承是面向对象编程中的三大特性之一。
>
> *JavaScript* 中的继承经过不断的发展，从最初的对象冒充慢慢发展到了今天的圣杯模式继承。
>
> 其中最需要掌握的就是**伪经典继承**和**圣杯模式**的继承。
>
> 很长一段时间，JS 继承使用的都是**组合继承**。这种继承也被称之为伪经典继承，该继承方式综合了原型链和盗用构造函数的方式，将两者的优点集中了起来。
>
> 组合继承弥补了之前原型链和盗用构造函数这两种方式各自的不足，是 *JavaScript* 中使用最多的继承方式。
>
> 组合继承最大的问题就是效率问题。最主要就是父类的构造函数始终会被调用两次：一次是在创建子类原型时调用，另一次是在子类构造函数中调用。
>
> 本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。
>
> 圣杯模式的继承解决了这一问题，其基本思路就是不通过调用父类构造函数来给子类原型赋值，而是取得父类原型的一个副本，然后将返回的新对象赋值给子类原型。



[apply call bind 说明](/web/Javascript/apply-bind-call)

### 5.1 组合继承

```js
// 基类
var Person = function (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.test = "this is a test";
Person.prototype.testFunc = function () {
    console.log('this is a testFunc');
}

// 子类
var Student = function (name, age, gender, score) {
    Person.apply(this, [name, age]); // 盗用构造函数
    this.gender = gender;
    this.score = score;
}
Student.prototype = new Person(); // 改变 Student 构造函数的原型对象
Student.prototype.testStuFunc = function () {
    console.log('this is a testStuFunc');
}

// 测试
var zhangsan = new Student("张三", 18, "男", 100);
console.log(zhangsan.name); // 张三
console.log(zhangsan.age); // 18
console.log(zhangsan.gender); // 男
console.log(zhangsan.score); // 100
console.log(zhangsan.test); // this is a test
zhangsan.testFunc(); // this is a testFunc
zhangsan.testStuFunc(); // this is a testStuFunc

```

> 在上面的例子中，我们使用了组合继承的方式来实现继承，可以看到无论是基类上面的属性和方法，还是子类自己的属性和方法，都得到了很好的实现。
>
> 但是在组合继承中存在效率问题，比如在上面的代码中，我们其实调用了两次 *Person*，产生了两组 *name* 和 *age* 属性，一组在原型上，一组在实例上。
>
> 也就是说，我们在执行 *Student.prototype = new Person( )*  的时候，我们是想要 *Person* 原型上面的方法，属性是不需要的，因为属性之后可以通过 *Person.apply(this, [name, age])*  拿到，但是当你 *new Person( )*  的时候，会实例化一个 *Person* 对象出来，这个对象上面，属性和方法都有。
>
> 圣杯模式的继承解决了这一问题，其基本思路就是不通过调用父类构造函数来给子类原型赋值，而是取得父类原型的一个副本，然后将返回的新对象赋值给子类原型。

### 5.2 原型链继承

> 原型链继承是通过将子对象的原型设置为父对象的实例来实现的。这样，子对象就可以访问父对象原型上的属性和方法。例如：

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayHello = function() {
  console.log('Hello, I am ' + this.name);
};

function Child() {
  this.name = 'Child';
}

Child.prototype = new Parent();

var child = new Child();
child.sayHello(); // 输出: Hello, I am Child
```

### 5.3 构造函数继承（借用构造函数）

> 这种继承方式是通过在子对象的构造函数中调用父对象的构造函数来实现的。这样，子对象就可以获得父对象的属性。例如：

```js
function Parent() {
  this.name = 'Parent';
}

Parent.prototype.sayHello = function() {
  console.log('Hello, I am ' + this.name);
};

function Child() {
  Parent.call(this); // 调用父对象的构造函数
  this.name = 'Child';
}

var child = new Child();
child.sayHello(); // 输出: Hello, I am Child
```

### 5.4 圣杯模式

```js
// target 是子类，origin 是基类
// target ---> Student, origin ---> Person
function inherit(target, origin) {
    function F() { }; // 没有任何多余的属性

    // origin.prototype === Person.prototype, origin.prototype.constructor === Person 构造函数
    F.prototype = origin.prototype;

    // 假设 new F() 出来的对象叫小 f
    // 那么这个 f 的原型对象 === F.prototype === Person.prototype
    // 那么 f.constructor === Person.prototype.constructor === Person 的构造函数
    target.prototype = new F();

    // 而 f 这个对象又是 target 对象的原型对象
    // 这意味着 target.prototype.constructor === f.constructor
    // 所以 target 的 constructor 会指向 Person 构造函数

    // 我们要让子类的 constructor 重新指向自己
    // 若不修改则会发现 constructor 指向的是父类的构造函数
    target.prototype.constructor = target;
}


// 基类
var Person = function (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.test = "this is a test";
Person.prototype.testFunc = function () {
    console.log('this is a testFunc');
}


// 子类
var Student = function (name, age, gender, score) {
    Person.apply(this, [name, age]);
    this.gender = gender;
    this.score = score;
}
inherit(Student, Person); // 使用圣杯模式实现继承
// 在子类上面添加方法
Student.prototype.testStuFunc = function () {
    console.log('this is a testStuFunc');
}

// 测试
var zhangsan = new Student("张三", 18, "男", 100);

console.log(zhangsan.name); // 张三
console.log(zhangsan.age); // 18
console.log(zhangsan.gender); // 男
console.log(zhangsan.score); // 100
console.log(zhangsan.test); // this is a test
zhangsan.testFunc(); // this is a testFunc
zhangsan.testStuFunc(); // this is a testStuFunc

```

## 6. *new* 操作符都做了哪些事？

> *new* 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
>
> *new* 关键字会进行如下的操作：
>  步骤 *1*：创建一个空的简单 *JavaScript* 对象，即 { } ;
>  步骤 *2*：链接该对象到另一个对象（即设置该对象的原型对象）；
>  步骤 *3*：将步骤 *1* 新创建的对象作为 *this* 的上下文；
>  步骤 *4*：如果该函数没有返回对象，则返回 *this*。

## 7. 🤬*call、apply、bind* 的区别 ？

```js
call 和 apply 的功能相同，区别在于传参的方式不一样:

fn.call(obj, arg1, arg2, ...)  调用一个函数, 具有一个指定的 this 值和分别地提供的参数(参数的列表)。
fn.apply(obj, [argsArray])  调用一个函数，具有一个指定的 this 值，以及作为一个数组（或类数组对象）提供的参数。

bind 和 call/apply 有一个很重要的区别，一个函数被 call/apply 的时候，会直接调用，但是 bind 会创建一个新函数。当这个新函数被调用时，bind( )  的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

```

## 8. 什么是函数柯里化？

柯里化（*currying*）又称部分求值。一个柯里化的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

举个例子，就是把原本：

*function(arg1,arg2)*  变成 *function(arg1)(arg2)*
 *function(arg1,arg2,arg3)*  变成 *function(arg1)(arg2)(arg3)*
 *function(arg1,arg2,arg3,arg4)*  变成 *function(arg1)(arg2)(arg3)(arg4)*

总而言之，就是将：

*function(arg1,arg2,…,argn)*  变成 *function(arg1)(arg2)…(argn)*

## 9.  *promise.all* 方法的使用场景？数组中必须每一项都是 *promise* 对象吗？不是 *promise* 对象会如何处理 ？

promise.all(promiseArray）  方法是 *promise* 对象上的静态方法，该方法的作用是将多个 *promise* 对象实例包装，生成并返回一个新的 *promise* 实例。

此方法在集合多个 *promise* 的返回结果时很有用。

返回值将会按照参数内的 *promise* 顺序排列，而不是由调用 *promise* 的完成顺序决定。

promise.all 的特点

接收一个*Promise*实例的数组或具有*Iterator*接口的对象

如果元素不是*Promise*对象，则使用*Promise.resolve*转成*Promise*对象

如果全部成功，状态变为*resolved*，返回值将组成一个数组传给回调

只有有一个失败，状态就变为 *rejected*，返回值将直接传递给回调 *all( )*的返回值，也是新的 *promise* 对象

> Demo

```js

const axios = require('axios');

const request1 = axios.get('https://api.example.com/data1');
const request2 = axios.get('https://api.example.com/data2');
const request3 = axios.get('https://api.example.com/data3');

Promise.all([request1, request2, request3])
  .then((responses) => {
    const data1 = responses[0].data;
    const data2 = responses[1].data;
    const data3 = responses[2].data;
    console.log(data1, data2, data3);
  })
  .catch((error) => {
    console.error(error);
  });
```

## 10. 🤬*this* 的指向哪几种 ？

总结起来，*this* 的指向规律有如下几条：

- 在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的 *this* 会被绑定到 *undefined* 上，在非严格模式下则会被绑定到全局对象 *window/global* 上。
- 一般使用 *new* 方法调用构造函数时，构造函数内的 *this* 会被绑定到新创建的对象上。
- 一般通过 *call/apply/bind* 方法显式调用函数时，函数体内的 *this* 会被绑定到指定参数的对象上。
- 一般通过上下文对象调用函数时，函数体内的 *this* 会被绑定到该对象上。
- 在箭头函数中，*this* 的指向是由外层（函数或全局）作用域来决定的。

## 11. 什么是事件监听

关于事件监听，*W3C* 规范中定义了 *3* 个事件阶段，依次是捕获阶段、目标阶段、冒泡阶段。

**捕获**阶段：在事件对象到达事件目标之前，事件对象必须从 *window* 经过目标的祖先节点传播到事件目标。 这个阶段被我们称之为捕获阶段。在这个阶段注册的事件监听器在事件到达其目标前必须先处理事件。

**目标** 阶段：事件对象到达其事件目标。 这个阶段被我们称为目标阶段。一旦事件对象到达事件目标，该阶段的事件监听器就要对它进行处理。如果一个事件对象类型被标志为不能冒泡。那么对应的事件对象在到达此阶段时就会终止传播。

**冒泡** 阶段：事件对象以一个与捕获阶段相反的方向从事件目标传播经过其祖先节点传播到 *window*。这个阶段被称之为冒泡阶段。在此阶段注册的事件监听器会对相应的冒泡事件进行处理。

## 12. *let const var* 的区别？什么是块级作用域？如何用？

1. *var* 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问，有变量提升。
2. *let* 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明。
3. *const* 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改，无变量提升，不可以重复声明。

最初在 *JS* 中作用域有：全局作用域、函数作用域。没有块作用域的概念。

*ES6* 中新增了块级作用域。==块作用==域由 { } 包括，*if* 语句和 *for* 语句里面的 { } 也属于块作用域。

在以前没有块作用域的时候，在 if 或者 for 循环中声明的变量会泄露成全局变量，其次就是 { } 中的内层变量可能会覆盖外层变量。块级作用域的出现解决了这些问题。

## 13. 数据类型

**基本类型**和**引用数据类型**

**栈区**

> *NaN* 的全称为 *Not a Number*，表示非数，或者说不是一个数。虽然 NaN 表示非数，但是它却属于 *number* 类型。
>
> *NaN* 有两个特点：
>
> 1. 任何涉及 *NaN* 的操作都会返回 *NaN*
> 2. *NaN* 和任何值都不相等，包括它自己本身

```js
string，symbol，number，boolean，undefined，null
```

其中 *symbol* 类型是在 *ES6* 里面新添加的基本数据类型。

引用数据类型，就只有 *1* 种：

**堆区**

```js

object

```

## 14.  *JS* 的作用域类型

在 *JavaScript* 里面，作用域一共有 4 种：全局作用域，局部作用域、函数作用域以及 *eval* 作用域。

**全局作用域：**这个是默认的代码运行环境，一旦代码被载入，引擎最先进入的就是这个环境。

**局部作用域：**当使用 *let* 或者 *const* 声明变量时，这些变量在一对花括号中存在局部作用域，只能够在花括号内部进行访问使用。

**函数作用域：**当进入到一个函数的时候，就会产生一个函数作用域。函数作用域里面所声明的变量只在函数中提供访问使用。

***eval* 作用域：**当调用 *eval( )*  函数的时候，就会产生一个 *eval* 作用域。

## 15. 判断变量类型

```js
function getType(data){
    let type = typeof data;
    if(type !== "object"){
        return type
    }
    return Object.prototype.toString.call(data).replace(/^[object (\S+)]$/,'$1')
}
function Person(){}
console.log(getType(1)); // number
console.log(getType(true)); // boolean
console.log(getType([1,2,3])); // Array
console.log(getType(/abc/)); // RegExp
console.log(getType(new Date)); // Date
console.log(getType(new Person)); // Object
console.log(getType({})); // Object

```

## 16. *defer* 与 *async* 的区别

**defer （延迟脚本）**

告诉浏览器立即下载，但延迟执行。

**async（异步脚本）**

告诉浏览器立即下载文件。

async 的脚本并不保证按照指定它们的先后顺序执行。

*async* 是立即下载并执行，加载和渲染后续文档元素的过程将和 *js* 脚本的加载与执行并行进行（异步）

## 17. 原型与原型链

- 每个对象都有一个 `__proto__` 属性，该属性指向自己的原型对象
- 每个构造函数都有一个 `prototype` 属性，该属性指向实例对象的原型对象
- 原型对象里的 `constructor` 指向构造函数本身

![image.png](https://www.z4a.net/images/2024/02/21/image.png)

## 18. 闭包及应用场景以及闭包缺点

闭包的应用场景：

1. 匿名自执行函数
2. 结果缓存
3. 封装
4. 实现类和继承

闭包的缺点：

因为闭包的作用域链会引用包含它的函数的活动对象，导致这些活动对象不会被销毁，因此会占用更多的内存。

## 19. 对象深拷贝与浅拷贝，单独问了 *Object.assign*

- **浅拷贝**：只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做浅拷贝（浅复制）

  浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。

- **深拷贝**：在堆中重新分配内存，并且把源对象所有属性都进行新建拷贝，以保证深拷贝的对象的引用图不包含任何原有对象或对象图上的任何对象，拷贝后的对象与原来的对象是完全隔离，互不影响。

*Object.assign* 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 *Object.assign* 方法进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。

## 20. *ES6* 新增哪些东西？

箭头函数

字符串模板

支持模块化（*import、export*）

类（*class、constructor、extends*）

*let、const* 关键字

新增一些数组、字符串等内置构造函数方法，例如 *Array.from*、*Array.of* 、*Math.sign*、*Math.trunc* 等

新增一些语法，例如扩展操作符、解构、函数默认参数等

新增一种基本数据类型 *Symbol*

新增元编程相关，例如 *proxy*、*Reflect*

*Set* 和 *Map* 数据结构

*Promise*

*Generator* 生成器

## 21. *weakmap、weakset*

*WeakSet* 对象是一些对象值的集合, 并且其中的每个对象值都只能出现一次。在 *WeakSet* 的集合中是唯一的

它和 *Set* 对象的区别有两点:

- 与 *Set* 相比，*WeakSet* 只能是**对象的集合**，而不能是任何类型的任意值。
- *WeakSet* 持弱引用：集合中对象的引用为弱引用。 如果没有其他的对 *WeakSet* 中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着 *WeakSet* 中没有存储当前对象的列表。 正因为这样，*WeakSet* 是不可枚举的。

*WeakMap* 对象也是键值对的集合。它的**键必须是对象类型**，值可以是任意类型。它的键被弱保持，也就是说，当其键所指对象没有其他地方引用的时候，它会被 *GC* 回收掉。*WeakMap* 提供的接口与 *Map* 相同。

与 *Map* 对象不同的是，*WeakMap* 的键是不可枚举的。不提供列出其键的方法。列表是否存在取决于垃圾回收器的状态，是不可预知的。

## 22. 数据类型转换

在 JavaScript 中，可以使用一些内置函数或操作符来进行数据类型的转换。下面是一些常见的数据类型转换方式：

1. 转换为字符串：
   - 使用 `String()` 函数将其他数据类型转换为字符串：
     ```javascript
     var num = 123;
     var str = String(num); // 转换为字符串 "123"
     ```

   - 使用 `toString()` 方法将数字转换为字符串：
     ```javascript
     var num = 456;
     var str = num.toString(); // 转换为字符串 "456"
     ```

2. 转换为数值：
   - 使用 `Number()` 函数将其他数据类型转换为数值：
     ```javascript
     var str = "123";
     var num = Number(str); // 转换为数值 123
     ```

   - 使用 `parseInt()` 函数将字符串转换为整数：
     ```javascript
     var str = "456";
     var num = parseInt(str); // 转换为整数 456
     ```

   - 使用 `parseFloat()` 函数将字符串转换为浮点数：
     ```javascript
     var str = "3.14";
     var num = parseFloat(str); // 转换为浮点数 3.14
     ```

3. 转换为布尔值：
   - 使用 `Boolean()` 函数将其他数据类型转换为布尔值：
     ```javascript
     var num = 0;
     var bool = Boolean(num); // 转换为布尔值 false
     
     var str = "Hello";
     var bool = Boolean(str); // 转换为布尔值 true
     ```

   - 使用逻辑非操作符 `!` 进行隐式的布尔转换：
     ```javascript
     var num = 0;
     var bool = !num; // 转换为布尔值 true
     
     var str = "";
     var bool = !str; // 转换为布尔值 true
     ```

4. 转换为数组：
   - 使用 `Array.from()` 函数将类数组对象或可迭代对象转换为数组：
     ```javascript
     var str = "hello";
     var arr = Array.from(str); // 转换为数组 ["h", "e", "l", "l", "o"]
     ```

   - 使用拓展运算符 `...` 将可迭代对象转换为数组：
     ```javascript
     var str = "world";
     var arr = [...str]; // 转换为数组 ["w", "o", "r", "l", "d"]
     ```

