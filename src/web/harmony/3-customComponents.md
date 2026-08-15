---
title:  3-自定义组件
tag:
  - harmony
star: true
---



## 同一文件内

> 父组件 & 子组件

```ts
@Entry
@Component
struct Father{
  
  build(){
    // 调用子组件
    Son({title:"我是标题"})
  }
}

@Component
struct Son{
  private title:string
  build(){
    
  }
}
```



## 单独组件封装

> 子组件

新建文件**/components/TestSon.ets

```ts
@Component
export struct TestSon {
   private title:string
  build() {
    
  }
}
```

> 父组件

```ts
import {TestSon} from "**/TestSon"

@Entry
@Component
struct Father{
  
  build(){
    // 调用子组件
    TestSon({title:"我是标题"})
  }
}
```



## 自定义构建函数

### 全局自定义构建函数

```ts
@Builder function SelfComponent() {
  Row(){
    xxx
  }.width()
  .height()
}
```



### 局部自定义函数

```ts
@Builder SelfComponent() {
  Row(){
    xxx
  }.width()
  .height()
}
```



## 公共样式

### 全局公共样式

```ts
@Styles function testStyle() {
	.width()
  .height()
}
```

### 局部公共样式

```ts
@Styles  testStyle() {
	.width()
  .height()
}
```

### 特定组件的样式

```ts
@Extend(Text) function testStyle() {
  .fontColor()
  .fontSize()
  
}
```

