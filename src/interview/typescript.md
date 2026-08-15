---
title: Typescript面试题
tags:
  - Typescript
  - 面试
---

## 1. **TypeScript 中 const 和 readonly 的区别？枚举和常量枚举的区别？接口和类型别名的区别？**

`const 和 readonly`: const可以防止变量的值被修改，readonly可以防止==变量的属性==被修改。

`普通枚举`

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}

let direction: Direction = Direction.Up;
console.log(direction); // 输出 "Up"
```

`常量枚举`

> 常量枚举与普通枚举的主要区别在于它们的成员在编译时会被内联到使用它们的地方，而不是创建一个包含所有成员的对象。这可以使得生成的 JavaScript 代码更小，运行速度更快。

```ts
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

let direction: Direction = Direction.Up;
console.log(direction); // 报错，因为常量枚举不能被赋值给变量

```

`interface 和 type 的区别`

> 区别

- 接口可以使用 `extends` 关键字来继承其他接口，而类型别名不支持继承。

- 可以进行声明合并

  - 当两个或多个同名接口存在于全局作用域时，它们也会被合并为一个接口

  - ```ts
    interface MyInterface {
        property1: string;
    }
    
    interface MyInterface {
        property2: number;
    }
    
    // 合并后的接口
    interface MyInterface {
        property1: string;
        property2: number;
    }
    
    ```

  - 当两个或多个同名接口存在于不同的命名空间时，它们会被合并为一个接口

  - ```ts
    interface MyInterface {
        property1: string;
    }
    
    namespace MyNamespace {
        interface MyInterface {
            property2: number;
        }
    }
    
    // 合并后的接口
    interface MyInterface {
        property1: string;
        property2: number;
    }
    
    ```

  - 

> 使用案例

```ts
// interface
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    id: number;
}

const employee: Employee = {
    name: 'John',
    age: 30,
    id: 12345
};

console.log(employee); // 输出 "{ name: 'John', age: 30, id: 12345 }"


// type

type Point = {
    x: number;
    y: number;
};

type Color = 'red' | 'green' | 'blue';

const point: Point = { x: 10, y: 20 };
const color: Color = 'red';

console.log(point); // 输出 "{ x: 10, y: 20 }"
console.log(color); // 输出 "red"

```

## 2. **TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？**

> `any`: 动态的变量类型（失去了类型检查的作用）。
>  `never`: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
>  `unknown`: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
>  `null & undefined`: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和  undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
>  `void`: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。

## 3. **TypeScript 中 interface 可以给 Function / Array / Class（Indexable）做声明吗？**

```js
/* 可以 */
// 函数声明
interface Say {
 (name: string): viod;
}
let say: Say = (name: string):viod => {}
// Array 声明
interface NumberArray { 
 [index: number]: number; 
} 
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// Class 声明
interface PersonalIntl {
 name: string
 sayHi (name: string): string
}

```

## 4. 声明数组的方法

```ts
let arr: number[] = [1, 2, 3]; // 使用数字类型的数组
let arr: string[] = ['a', 'b', 'c']; // 使用字符串类型的数组
let arr: boolean[] = [true, false, true]; // 使用布尔类型的数组

let arr: Array<number> = [1, 2, 3]; // 使用数字类型的数组
let arr: Array<string> = ['a', 'b', 'c']; // 使用字符串类型的数组
let arr: Array<boolean> = [true, false, true]; // 使用布尔类型的数组

interface NumberArray {
    [index: number]: number;
}
let arr: NumberArray = [1, 2, 3]; // 使用数字类型的数组
interface StringArray {
    [index: number]: string;
}
let arr: StringArray = ['a', 'b', 'c']; // 使用字符串类型的数组
interface BooleanArray {
    [index: number]: boolean;
}
let arr: BooleanArray = [true, false, true]; // 使用布尔类型的数组

```

## 5. **TypeScript 中的 this 和 JavaScript 中的 this 有什么差异？**

> 1. TypeScript：noImplicitThis: true 的情况下，必须去声明 this 的类型，才能在函数或者对象中使用this。
> 2. Typescript 中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的

## 6. **TypeScript 如何设计 Class 的声明？**

```ts
class Greeter {
   greeting: string;
   constructor(message: string) {
       this.greeting = message;
   }
   greet(): string{
       return "Hello, " + this.greeting;
   }
}
let greeter = new Greeter("world");
// 在声明类的时候，一般类中都会包含，构造函数、对构造函数中的属性进行类型声明、类中的方法。

```

## 7. **TypeScript 中如何联合枚举类型的 Key?**

> ```ts
> enum str {
>    A,
>    B,
>    C
> }
> type strUnion =  keyof typeof str; // 'A' | 'B' | 'C'
> 
> ```

## 8. **TypeScript 中 ?.、??、!、!.、_、\** 等符号的含义？**

> `?. 可选链` 遇到 null 和 undefined 可以立即停止表达式的运行。
>  `?? 空值合并运算符` 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
>  `! 非空断言运算符` x! 将从 x 值域中排除 null 和 undefined
>  `!. ` 在变量名后添加，可以断言排除undefined和null类型
>  `_ 数字分割符` 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
>  `** `求幂

## 9. **简单介绍一下 TypeScript 模块的加载机制？**

假设有一个导入语句 `import { a } from "moduleA"`; 

1. 首先，编译器会尝试定位需要导入的模块文件，通过绝对或者相对的路径查找方式； 
   1. 尝试寻找对应的模块
2. 如果上面的解析失败了，没有查找到对应的模块，编译器会尝试定位一个`外部模块声明`（.d.ts）； 
   1. 解析失败 寻找 .d.ts
3. 最后，如果编译器还是不能解析这个模块，则会抛出一个错误 `error TS2307: Cannot find module 'moduleA'.`

## 10. **简单聊聊你对 TypeScript 类型兼容性的理解？**

`ts 类型兼容：` 当一个类型 Y 可以赋值给另一个类型 X 时， 我们就可以说类型 X 兼容类型 Y。也就是说两者在结构上是一致的，而不一定非得通过 extends 的方式继承而来

`接口的兼容性：X = Y `只要目标类型 X 中声明的属性变量在源类型 Y 中都存在就是兼容的（ Y 中的类型可以比 X 中的多，但是不能少）

`函数的兼容性：X = Y ` Y 的每个参数必须能在 X 里找到对应类型的参数，参数的名字相同与否无所谓，只看它们的类型

## 11. **类型的全局声明和局部声明**

如果声明文件内不包含`import、export`，那么这个文件声明的类型就会变成全局声明。反之，若是这个文件包含了`import、export`，那么这个文件包含的类型声明则会是局部声明，不会影响到全局声明。

## 12. **declare，declare global是什么？**

> `declare` 是用来定义全局变量、全局函数、全局命名空间、js modules、class等
> `declare global` 为全局对象 `window` 增加新的属性
>
> ```ts
> declare global { 
>    interface Window { 
>         csrf: string; 
>    }
> }
> 
> ```
>
> 

## 13. **对 TypeScript 类中成员的 public、private、protected、readonly 修饰符的理解？**

`public`: 成员都默认为`public`，被此限定符修饰的成员是可以被外部访问；
 `private`: 被此限定符修饰的成员是只可以被类的内部访问；
 `protected`: 被此限定符修饰的成员是只可以被类的内部以及类的子类访问;
 `readonly`: 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

## 14.  **keyof 和 typeof 关键字的作用？**

`keyof 索引类型查询操作符` 获取索引类型的属性名，构成联合类型。
`typeof` 获取一个变量或对象的类型。

## 15. TypeScript数据类型

**基本类型**：

> number
>
> string
>
> null undefined
>
> symbol

**复合类型**

> array
>
> enum
>
> tuple

**对象类型**

> object



