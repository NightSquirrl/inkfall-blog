---
title: 18. TypeScript
icon: skill-icons:typescript
tag:
  -  TypeScript
top: 1
recommend: 1
---

## 基础类型

###  Boolean 类型

```ts
let isDone: boolean = false;
// ES5：var isDone = false;
```

### Number 类型

```ts
let count: number = 10;
// ES5：var count = 10;
```

### String 类型

```ts
let name: string = "semliker";
// ES5：var name = 'semlinker';
```

### Symbol 类型

```ts
const sym = Symbol();
let obj = {

[sym]: "semlinker",

};

console.log(obj[sym]); // semlinker
```

### Array 类型

```ts
let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
```

### 💡Enum 类型

#### 数字枚举-常用

```ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

// 默认情况下 NORTH,  SOUTH,  EAST,  WEST,值一次递增
// 也可以自己指定值

enum Direction {
  NORTH = 3, // 设值的是初始的值,后面的值一次递增,也可以给每一个指定
  SOUTH,
  EAST,
  WEST,
}

```

#### 字符串枚举-常用

```ts
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

// 类似于声明对象一样,可以当做类型使用,也可当做值使用
```

> 特殊

```ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dirName = Direction[0]; // NORTH
let dirVal = Direction["NORTH"]; // 0

```

#### 异构枚举

> 混合罢了

```ts
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}

```

### 💡Any 类型

在类型报错的地方,或者临时不想指定类型的时候可以暂时使用 any,规范的 ts 项目,最好为每一个类型指定

### Unknown 类型

就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）。下面我们来看一下 unknown 类型的使用示例：
```ts
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK

```

### Tuple 类型

==数组一般由同种类型的值组成==，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

```ts
let tupleType: [string, boolean];
tupleType = ["semlinker", true];

```

### Void 类型

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```ts
// 声明函数返回值为 void
function warnUser(): void {
  console.log("This is my warning message");
}

```

### Null 和 Undefined 类型

==TypeScript 里，undefined 和 null 两者有各自的类型分别为 undefined 和 null。==

```ts
let u: undefined = undefined;
let n: null = null;

```

> 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。然而，如果你指定了--strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自的类型。

### object, Object 和 {} 类型

object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。

Object 类型：它是所有 Object 类的实例的类型，它由以下两个接口来定义：

Object 接口定义了 Object.prototype 原型对象上的属性；
```ts
// node_modules/typescript/lib/lib.es5.d.ts
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}

```

#### {} 类型

{} 类型描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译

```ts
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";

```

### Never 类型

never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
```ts
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

```

## typescript 断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”
简单的说: 你比 ts 更清楚的知道此处的类型是什么

- 💡“尖括号” 语法

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

- 💡as 语法

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

- 💡非空断言

  - 💡忽略 undefined 和 null 类型

  ```ts
    // Type 'undefined' is not assignable to type 'string'.
    const ignoreUndefinedAndNull: string = maybeString!; // Ok
  
  ts 觉得 maybeString 可能是空的,但是你知道他不可能为空,所以为了解决 ts 的错误末尾添加!告诉 ts 他不可能为空
  ```

## 类型守卫

### in 关键字

```ts
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```

判断该字符串"privileges"类型,是否在该类型中

### typeof 关键字

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

typeof更像是直接判断类型,判断的值只能是 "number"， "string"， "boolean" 或 "symbol"

### instanceof 关键字

```ts
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  // padder 的类型收窄为 'SpaceRepeatingPadder'
}
```

### 自定义类型保护的类型谓词

```ts
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

## 联合类型和类型别名

### 联合类型

```ts
// 联合类型就是将多个类型使用 | 组合
// 比如 在声明变量的时候但是并不想给值,或者不知道给值
let a : number | undefined;
```

#### 可辨识-不常用

```ts
enum CarTransmission {
  Automatic = 200,
  Manual = 300,
}

interface Motorcycle {
  vType: "motorcycle"; // discriminant
  make: number; // year
}

interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission;
}

interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}
```

在上述代码中，我们分别定义了 Motorcycle、 Car 和 Truck 三个接口，在这些接口中都包含一个 vType 属性，该属性被称为可辨识的属性，而其它的属性只跟特性的接口相关。

### 类型别名

```ts
type Message = string | string[];

let greet = (message: Message) => {
  // ...
};
```

## 交叉类型

在 TypeScript 中交叉类型是将多个类型合并为一个类型。==通过&==运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```ts
type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };

let point: Point = {
  x: 1,
  y: 1,
};
```

### 同名基础类型属性的合并

```ts
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
```

在上面的代码中，接口 X 和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，此时 XY 类型或 YX 类型中成员 c 的类型是不是可以是 string 或 number 类型呢？

成员 c 的类型会变成 never 呢？这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

### 同名非基础类型属性的合并

```typescript
interface D {
  d: boolean;
}
interface E {
  e: string;
}
interface F {
  f: number;
}

interface A {
  x: D;
}
interface B {
  x: E;
}
interface C {
  x: F;
}

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: "semlinker",
    f: 666,
  },
};

console.log("abc:", abc);
```

由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。

## typescript 函数

|   TypeScript   |     JavaScript     |
| :------------: | :----------------: |
|    含有类型    |       无类型       |
|    箭头函数    | 箭头函数（ES2015） |
|    函数类型    |     无函数类型     |
| 必填和可选参数 | 所有参数都是可选的 |
|    默认参数    |      默认参数      |
|    剩余参数    |      剩余参数      |
|    函数重载    |     无函数重载     |

参数类型以及返回值类型

```ts
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}
```

### 💡可选参数及默认参数

```ts
// 可选参数
function createUserId(name: string, id: number, age?: number): string {
  return name + id;
}

// 默认参数
function createUserId(
  name: string = "semlinker",
  id: number,
  age?: number
): string {
  return name + id;
}
```

在声明函数时，可以通过 ? 号来定义可选参数，比如 age?: number 这种形式。在实际使用时，==需要注意的是可选参数要放在普通参数的后面，不然会导致编译错误。==

### 💡剩余参数

```ts
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

### 函数重载

其实来自于 Java

> 简单的说同一个函数名会根据参数个数不同,参数类型不同掉用不同的函数

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type Combinable = string | number;
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

方法重载是指在同一个类中方法同名，参数不同（参数类型不同、参数个数不同或参数个数相同时参数的先后顺序不同），调用时根据实参的形式，选择与它匹配的方法执行操作的一种技术。所以类中成员方法满足重载的条件是：在同一个类中，方法名相同且参数列表不同。下面我们来举一个成员方法重载的例子：

```ts
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
}

const calculator = new Calculator();
const result = calculator.add("Semlinker", " Kakuqo");
```

## 💡typescript 接口

### 对象的形状

```ts
interface Person {
  name: string;
  age: number;
}

let semlinker: Person = {
  name: "semlinker",
  age: 33,
};

```

### 💡可选 | 只读属性

```ts
interface Person {
  readonly name: string;
  age?: number;
}

```

### 💡任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 索引签名 的形式来满足上述要求。
```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;  // 注意这个写法
}

const p1 = { name: "semlinker" };
const p2 = { name: "lolo", age: 5 };
const p3 = { name: "kakuqo", sex: 1 };

```

### 接口与类型别名的区别 

```ts
// 接口
interface Point {
  x: number;
  y: number;
}

// 类型别名
type Point = {
  x: number;
  y: number;
};

```

- 类型别名可以用于一些其他类型，比如原始类型、联合类型和元组：

```ts
// primitive
type Name = string;

// object
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

```

- 接口可以扩展类型别名，而反过来是不行的。 **Extend**

```ts
// 接口继承接口
interface PartialPointX { x: number; }
interface Point extends PartialPointX { 
  y: number; 
}

// 类型别名继承类型别名
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

// 接口继承类型别名
type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }

// 类别别名继承接口
interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
```

- 类型别名不同，接口可以定义多次，会被自动合并为单个接口。

```ts
interface Point {
  x: number;
}
interface Point {
  y: number;
}

const point: Point = { x: 1, y: 2 };

```

## 💡typescript 类

要注意的是,JS 中没有类 的概念,类是强类型语言才有的,在 ts 中进行升级.

可以参考 JAVA 中的定义.

在 TypeScript 中，我们可以通过 Class 关键字来定义一个类：
```ts
class Greeter {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

```

==那么成员属性与静态属性，成员方法与静态方法有什么区别呢？这里无需过多解释，我们直接看一下编译生成的 ES5 代码==

> 简单的说类中的静态方法,直接使用类名直接调用,普通的方法,只有通过 new 实例化之后才可以使用.并且多个实例化共用一个静态方法或者静态变量.

### getter 和 setter

获取和设置值,主要是为了防止能够直接修改值(数据保护),提供修改值的方法(按照规定的方法进行修改)

```ts
let passcode = "Hello TypeScript";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "Hello TypeScript") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Semlinker";
if (employee.fullName) {
  console.log(employee.fullName);
}

```

### 类的继承

继承（Inheritance）是一种联结类与类的层次模型。指的是一个类（称为子类、子接口）继承另外的一个类（称为父类、父接口）的功能，并可以增加它自己的新功能的能力，继承是类与类或者接口与接口之间最常见的关系。


```ts
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }

  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
sam.move();

```

### 抽象类

使用 abstract 关键字声明的类，我们称之为抽象类。抽象类不能被实例化，因为它里面包含一个或多个抽象方法。所谓的抽象方法，是指不包含具体实现的方法：
```ts
abstract class Person {
  constructor(public name: string) {}

  abstract say(words: string): void;
}

// Cannot create an instance of an abstract class.(2511)
const lolo = new Person(); // Error

```

抽象类不能被直接实例化，我们只能实例化实现了所有抽象方法的子类。具体如下所示：
```ts
abstract class Person {
  constructor(public name: string) {}

  // 抽象方法
  abstract say(words: string): void;
}

class Developer extends Person {
  constructor(name: string) {
    super(name);
  }

  say(words: string): void {
    console.log(`${this.name} says ${words}`);
  }
}

const lolo = new Developer("lolo");
lolo.say("I love ts!"); // lolo says I love ts!

```

类方法重载
```ts
class ProductService {
  getProducts(): void;
  getProducts(id: number): void;
  getProducts(id?: number) {
    if (typeof id === "number") {
      console.log(`获取id为 ${id} 的产品信息`);
    } else {
      console.log(`获取所有的产品信息`);
    }
  }
}

const productService = new ProductService();
productService.getProducts(666); // 获取 id 为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息

```

## 💡typescript 泛型

### 泛型语法

首次看到`<T>` 语法会感到陌生。其实它没有什么特别，就像传递参数一样，我们传递了我们想要用于特定函数调用的类型。
![image.png](https://www.z4a.net/images/2024/06/10/image.png)

参考上面的图片，当我们调用 identity`<Number>`(1) ，Number 类型就像参数 1 一样，它将在出现 T 的任何位置填充该类型。图中 `<T>` 内部的 T 被称为类型变量，它是我们希望传递给 identity 函数的类型占位符，同时它被分配给 value 参数用来代替它的类型：此时 T 充当的是类型，而不是特定的 Number 类型。 其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

> `K（Key）`：表示对象中的键类型；
> `V（Value）`：表示对象中的值类型；
> `E（Element）`：表示元素类型。

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U，用于扩展我们定义的 identity 函数：
```ts
function identity<T, U>(value: T, message: U): T {
  console.log(message);
  return value;
}

console.log(identity<Number, string>(68, "Semlinker"));

```

![imagea51c66c2771cdfd7.png](https://www.z4a.net/images/2024/06/10/imagea51c66c2771cdfd7.png)

除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号，比如：
```ts

function identity<T, U>(value: T, message: U): T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));

```

对于上述代码，编译器足够聪明，能够知道我们的参数类型，并将它们赋值给 T 和 U，而不需要开发人员显式指定它们。

### 泛型接口

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}

copied
```

### 泛型类

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

```

### 泛型工具类型

为了方便开发者 TypeScript 内置了一些常用的工具类型

#### typeof

在 TypeScript 中，typeof 操作符可以用来获取一个变量声明或对象的类型。

```ts
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: "semlinker", age: 33 };
type Sem = typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
```

#### keyof

keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

```ts
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person }; // string | number
```

在 TypeScript 中支持两种索引签名，数字索引和字符串索引：

```ts
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string;
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}
```

为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 keyof { [x: string]: Person } 的结果会返回 string | number。

#### in

in 用来遍历枚举类型：

```ts
type Keys = "a" | "b" | "c";

type Obj = {
  [p in Keys]: any;
}; // -> { a: any, b: any, c: any }
```

#### infer

在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

#### extends

有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```typescript
loggingIdentity(3); // Error, number doesn't have a .length property
```

这时我们需要传入符合约束类型的值，必须包含必须的属性：

```typescript
loggingIdentity({ length: 10, value: 3 });
```

#### Partial

Partial`<T>` 的作用就是将某个类型里的属性全部变为可选项 ?。

```ts

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "Learn TS",
  description: "Learn TypeScript",
};

const todo2 = updateTodo(todo1, {
  description: "Learn TypeScript Enum",
});
```

在上面的 updateTodo 方法中，我们利用 Partial`<T>` 工具类型，定义 fieldsToUpdate 的类型为 Partial`<Todo>`，即：

```typescript
{
title?: string | undefined;
description?: string | undefined;
}
```

## 🤯装饰器

> 参考的是 JAVA 的注解功能

### 装饰器是什么

- 它是一个表达式
- 该表达式被执行后，返回一个函数
- 函数的入参分别为 target、name 和 descriptor
- 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象

### 装饰器的分类

- 类装饰器（Class decorators）
- 属性装饰器（Property decorators）
- 方法装饰器（Method decorators）
- 参数装饰器（Parameter decorators）
- 需要注意的是，若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用 experimentalDecorators 编译器选项：

```typescript
tsc --target ES5 --experimentalDecorators
```

tsconfig.json：

```typescript
{
  "compilerOptions": {
     "target": "ES5",
     "experimentalDecorators": true
   }
}
```

### 类装饰器

类装饰器声明：

```typescript
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
```

类装饰器顾名思义，就是用来装饰类的。它接收一个参数：

- target: TFunction - 被装饰的类 看完第一眼后，是不是感觉都不好了。没事，我们马上来个例子：

```typescript
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker!';
```

上面的例子中，我们定义了 Greeter 类装饰器，同时我们使用了 @Greeter 语法糖，来使用装饰器。

友情提示：读者可以直接复制上面的代码，在 TypeScript Playground 中运行查看结果。

有的读者可能想问，例子中总是输出 Hello Semlinker! ，能自定义输出的问候语么 ？这个问题很好，答案是可以的。

具体实现如下：

```typescript
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

@Greeter("Hello TS!")
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello TS!';
```

### 属性装饰器

属性装饰器声明：

```typescript
declare type PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => void;
```

属性装饰器顾名思义，用来装饰类的属性。它接收两个参数：

- target: Object - 被装饰的类
- propertyKey: string | symbol - 被装饰类的属性名 趁热打铁，马上来个例子热热身：

```typescript
function logProperty(target: any, key: string) {
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";
```

以上代码我们定义了一个 logProperty 函数，来跟踪用户对属性的操作，当代码成功运行后，在控制台会输出以下结果：

```typescript
Set: (name) => semlinker;
Set: (name) => kakuqo;
```

### 方法装饰器

方法装饰器声明：

```typescript
declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypePropertyDescript<T>
) => TypedPropertyDescriptor<T> | void;
```

方法装饰器顾名思义，用来装饰类的方法。它接收三个参数：

- target: Object - 被装饰的类
- propertyKey: string | symbol - 方法名
- descriptor: TypePropertyDescript - 属性描述符 废话不多说，直接上例子：

```typescript
function LogOutput(tarage: Function, key: string, descriptor: any) {
  let originalMethod = descriptor.value;
  let newMethod = function (...args: any[]): any {
    let result: any = originalMethod.apply(this, args);
    if (!this.loggedOutput) {
      this.loggedOutput = new Array<any>();
    }
    this.loggedOutput.push({
      method: key,
      parameters: args,
      output: result,
      timestamp: new Date(),
    });
    return result;
  };
  descriptor.value = newMethod;
}

class Calculator {
  @LogOutput
  double(num: number): number {
    return num * 2;
  }
}

let calc = new Calculator();
calc.double(11);
// console ouput: [{method: "double", output: 22, ...}]
console.log(calc.loggedOutput);
```

下面我们来介绍一下参数装饰器。

### 参数装饰器

参数装饰器声明：

```typescript
declare type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;
```

参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：

- target: Object - 被装饰的类
- propertyKey: string | symbol - 方法名
- parameterIndex: number - 方法中参数的索引值

```typescript
function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
	been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
    this.greeting = phrase;
  }
}

// console output: The parameter in position 0
// at Greeter has been decorated
```

## 💡编译上下文

### tsconfig.json 的作用

- 用于标识 TypeScript 项目的根路径；
- 用于配置 TypeScript 编译器；
- 用于指定编译的文件。

### tsconfig.json 重要字段

- files - 设置要编译的文件的名称；
- include - 设置需要进行编译的文件，支持路径模式匹配；
- exclude - 设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 设置与编译流程相关的选项。

### compilerOptions 选项

compilerOptions 支持很多选项，常见的有 baseUrl、 target、baseUrl、 moduleResolution 和 lib 等。

compilerOptions 每个选项的详细说明如下：

```typescript
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```
