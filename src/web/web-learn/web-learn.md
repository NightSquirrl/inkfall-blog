---
title: 🤯 前端学习指引
sticky: 98
tag:
  - web
  - 前端
recommend: 0
---



> 网站汇总:
>
> 前端开发官方网站简称 MDN https://developer.mozilla.org/zh-CN/

# Javascript

## 对象

> 一切都是对象
>
> 在 javascript 中
>
> 基本的数据类型
>
> `const a = 1;const b = '';const c = null;const d = undefined;const e = true ;const f = Symbol('foo');`
>
> 简单的说:基本数据类型存储在栈内存,栈可以理解为一个就是一个队列一样分隔开
>
> ![img](https://www.runoob.com/wp-content/uploads/2019/05/3834493100-57c3ff4a5dac7_articlex.png)
>
> ```javascript
> // 特殊解释 Symbol 创建的值是唯一的,可以简单的理解为就是一个标志的意思,很少用
> 
> // Symbol('foo') === Symbol('foo')  这个值是 false,看上去写的一模一样,但是结果完全不同
> ```
>
> 
>
> 引用数据类型
>
> const a = {} ;const b = [];const c = ()=>{}; function d () {} 都可以
>
> 引用数据类型可以理解为 定义的变量是存储在栈中,值并不是值,存储的而是地址,值存储在堆中,指向在堆中的地址;
>
> ```javascript
> const a = {a:1} const b = a; // 浅拷贝 赋值的操作只是把 a 的地址给了 b
> 
> b.a = 2;
> 
> console.log(a)  // 此时 a.a也是 2 ,因为他们指向的是同一份地址,所以值始终用的都是同一个.
> 
> // 深拷贝其实就是给一个新的地址,不共用一个地址
> // 常见的深拷贝
> const a = {a:1};
> const b = {...a}; // 扩展运算符
> const c = JSON.para(JSON.stringify(a)) // 原理将对象转换为了一个字符串这个时候就已经脱离了堆,在转换为对象会重新创建一个堆来存储
> 
> // 这两种方案不适用于所有的情形,因为有的时候有的数据结构使用或报错,但是大部分的时候可以使用
> // 其次使用 lodash
> 
> // 原生方法 原理使用原型链遍历所有的属性值新建对象赋值 TODO 待补充
> ```
>
> 
>
> 
>
> ![图片描述](https://www.runoob.com/wp-content/uploads/2019/05/3309698956-57c41a89cddc7_articlex.png)
>
> 



// TODO: 对象的原型链

## 正则

[参考链接](/web/package/regular-expression.html)



## work

[参考链接](/web/web-learn/web-worker.md)

## 前端存储

### indexDB

## 缓存机制



# Vue

> vue2 vue3 在底层的逻辑肯定是有很多的区别,但是在使用上,还是有很多相似的地方,或者说没有区别,在大脑中不要去认为他们区别很大,否则你会觉得很很难搞.
> 比如:Javascript 与 Java 有区别吗,那肯定是有的完全不同的两个语言,但是又没有区别,因为他们实现一个方法的逻辑打部分相同,只是调用的方法不同罢了.

## 宏观

```javascript
// vue2 代码结构
<template>
</template>

<script lang='ts'>
export default {
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  methods: {},
  mounted () {
  },
}
</script> 

<style lang='less' scoped>

</style>

// vue3 代码结构

<template>
</template>

<script setup>
import ...

const ...

function ...

// 生命周期
onMounted(() => {})
</script>

<style></style>
```
我们可以看出本质上结构差不不大,只是 vue2 的设计决定了他的代码结构只能写成选项式API 类似于对象的配置项
而 vue3 属于组合式 API 不需要去理解什么是组合式 API 选项是 API ,只需要知道 vue3 更加的符合 JS 原生的写法,在代码结构上与 React 相似

## Vue3

### 变量的定义

> 变量的定义

```javascript
const ref = ref(1)
const reactive = reactive({ name: '张三' })

// TODO 区别和传参
```

### 函数的定义

> 函数的定义
> 与 一个 JS 文件相同

```javascript
const fn = () => {

}
// or
function fn() {
  
}
```

### 生命周期

> 生命周期
>
> 注意事项:
>
> 子组件的onMounted执行顺序比父组件要早,但是比父组件的onBeforeMount
>
> vue3 的生命周期
>
> 在`<script setup></script>`标签内部直接写代码都属于 setup 生命周期 负责数据的初始化,DOM 都还没有挂在,也就是说这个时候是无法获取到 DOM 的,只有在onMounted中才可以获取到 DOM

![生命周期](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)

```javascript
// 关于 setup 的说明

<script setup>
// 此时这个里面的代码都是属于 setup 生命周期

</script>

setup:开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method

// 组件挂载到节点上之前执行的函数。
onBeforeMount(() => {

})
// 组件挂载完成后执行的函数。
onMounted(() => {

})

onUnmounted(() => {

})

// 组件更新之前执行的函数
onBeforeUpdate(() => {

})

// 组件更新完成之后执行的函数
onUpdated(() => {

})

// 组件卸载之前执行的函数
onBeforeUnmount(() => {

})

// 组件卸载完成后执行的函数
onBeforeUpdate(() => {

})

// 被包含在中的组件，会多出两个生命周期钩子函数。被激活时执行
onActivated(() => {

})

// 比如从 A 组件，切换到 B 组件，A 组件消失时执行 一般用在使用<component>
onDeactivated(() => {

})

// 当捕获一个来自子孙组件的异常时激活钩子函数
onErrorCaptured(() => {

})

```

###  监听

#### watch

> watch 监听
>
> 三个参数
>
> 1. 监听的值=>两中写法
>
> 2. 执行的方法
>
> 3. 配置项 
>
>    ```javascript
>      { 
>        deep: true, // 对象的深层次监听
>        immediate: true, // 立即执行,在某一个组件第一次渲染的时候默认不执行,如果为true 将在组件加载出来的时候执行一次
>        once: true // 将监听的函数修改为执行一次就失效
>      }
>    ```
>
>    

```javascript

const ref = ref(1);

watch(ref,  (newQuestion, oldQuestion) => {
// newQuestion 最新的数据
// oldQuestion 之前的数据
})

// 注意点 
// newQuestion, oldQuestion 的值就是 ref.value
// 无法监听对象中的属性值

watch(()=>ref,  (newQuestion, oldQuestion) => {
// newQuestion 最新的数据
// oldQuestion 之前的数据
})

// 如果写的是 ref 那么newQuestion | oldQuestion 是 ref.value
// 如果写的是 ref.value 那么newQuestion | oldQuestion 是 不需要.value 的数据


// 监听对象某一个具体的属性值的变化
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)


// 深层侦听器
// 比如如果obj.count依旧是一个对象,那么obj.count中的某一个属性值发生了变化是不会监听到的,之后当整个obj.count = {} 被更改了一个新的对象=>涉及到对象的存储方式
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  },
  { deep: true }
)



```

#### watchEffect

```javascript
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})

// 在函数的结构体中,只要存在相应式的数据,不论哪一个发生了变化都会触发时事件可以理解为是一个自动完成监听的方法 并且会立即执行即为 immediate: true 
```

#### 🤯 关于监听的额外知识点=> 不常用

```javascript
// Vue 是数据驱动页面更新的 => 当数据发生变化的时候会更新 dom
// 一个最简单的例子 v-if = 'test' 当 test 为 true 的时候,就会将 dom 添加到页面上,添加的逻辑其实是 dom 的添加事件(可以理解为触发的是 js 的 appendChiled()) 如果为 false 其实触发的是 js(dom remove()事件) => 再加深立即, vue 帮我们简化了一层dom 的操作,vue 会将对应的 v-if转化为刚才提到的事件

// 但是dom的更新其实是异步的,理解为在 js 代码执行过程中 vue 层面的数据已经变化了,但是 dom 并不会变化
// 官方解释:
// 当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

await nextTick() // 等待本次函数对应的 dom 更新完成 才会执行下面的方法

// 等待所有的 dom 更新完成触发 => 对应 watchPostEffect
watch(source, callback, {
  flush: 'post'
})

// 同步监听=>理解为与数据的变化同时与 dom 无关 => 对应 watchSyncEffect
watch(source, callback, {
  flush: 'sync'
})
```

### 计算属性

> computed
>
> // 一定要有 return 返回值
>
> 如何理解 
>
> 在调用的方式上其实与 ref 的变量相同其实要获取到值都需要`.value`
>
> 内部的值发生了变化就会触发更新,但是它是具有缓存机制的,在执行效率上比一个普通的以及 watch 监听函数,效率高很多.
>
> 可以理解为涉及到数据的处理(出数据的处理,不包含其他复杂的逻辑)最好统一使用 coputed 项目的执行效率会提升很多

#### 无参

```javascript
const author = ref({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.value.books.length > 0 ? 'Yes' : 'No'
})

// 在 vue 层面的调用 不需要.value 与 ref 变量相同
<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>

// 在 script 中的使用
<script>
const a = publishedBooksMessage.value
</script>
```

#### 传参

```javascript
const author = ref({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed((参数 1)=>()=>{
  console.log(参数 1)
  return author.value.books.length > 0 ? 'Yes' : 'No'
})

// 在 vue 层面的调用 不需要.value 与 ref 变量相同
<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage('xxx') }}</span>
</template>

// 在 script 中的使用
<script>
const a = publishedBooksMessage.value('sss')
</script>
```

### 🤯传参

#### props

```javascript
// Father.vue
<Son/>
const a = ref(0)

// Son.vue
<Grandson/>
// 子组件获取父组件的数据
 

// Grandson.vue
// 开始获取 Father 的数据
```

##### 子组件修改父组件值的方式

> 无论祖孙组件的嵌套了多少层,都可以一直传递,但是最好不要超过 3 层,超过 3 层可以选择使用以来注入的方式

`Son.vue`

```javascript
<script setup lang='ts'>

interface IProps {
    name: string
}

defineProps<IProps>()
</script>

// 只有defineProps<IProps>()的时候 <template> 中可以直接使用 name
// 但是在 script 中需要变量来接收
// const props = defineProps<IProps>()
// props.name => 这样 JS 或者 TS 才可以获取到值
// 需要注意的是不能使用结构赋值,否则失去响应式可以使用 const { name } = toRefs(props) // 此时可以结构赋值


// 关于值的修改
父组件 const a = ref(0) // 基本数据类型
子组件 是无法修改 传递过来的这个 a 的值 readonly

父组件 const a = ref({a:1}) or const a = ref([])
// 如果父组件生命的数据是数组或者对象是可以修改的,但是不能`全量替换`
子组件 a.a = 2 // 可以修改  a.push(2) // 可以修改 a[0] 都可以
// 但是 a = {}  是不允许的这个属于全量替换 类似于 const a = 1
// 我们都知道 const 声明的是常量,是不允许修改的,但是 const a = {a:1} a.a = 2 是可以修改的.但是 a = 22 是不允许的 ,原理类似



```

###### 如果子组件非要修改父组件的数据,那么父组件需要提供修改数据的方法

`Father.vue`

```javascript
<template>
   // 传递数据以及方法
    <Son :a="a" @set-a="setA"></Son>
</template>

<script setup lang='ts'>
const a = ref(0)

function setA(value:string) {
    a.value = value
}
</script>
```

`Son.vue`

```javascript
<script setup lang='ts'>
interface IEmit {
    (e: 'setA', value: string): void
}

const emit = defineEmits<IEmit>()
// 触发父组件的方法, 第一个参数是方法名,第二个参数是 被触发的方法的参数
emit('setA', 2)
</script>
```

#### 依赖注入

依赖注入,只要他们存在父子嵌套的关系都可以直接的传递和使用

`provide()` 提供一个值，可以被后代组件注入。

```javascript
<script setup>
import { ref, provide } from 'vue'

// 提供静态值
provide('path', '/project/')

// 提供响应式的值
const count = ref(0)
provide('count', count)
</script>
```

> 🤯 `provide()` 必须在组件的 `setup()` 阶段同步调用。

`inject()` 注入一个由祖先组件或整个应用 (通过 `app.provide()`) 提供的值。

```javascript
<script setup>
import { inject } from 'vue'

// 注入不含默认值的静态值
const path = inject('path')

// 注入响应式的值
const count = inject('count')
</script>
```

## Router

[参考链接](/web/learn-vue/1-vue-router.html)

## Vuex Pinia

[参考链接1](/web/learn-vue/2-vue-vuex-pinia.html)



# Typescript

[参考链接1🔗](/web/typescript/1-basic-concepts.html)

[参考链接2🔗](web/typescript/3-advanced-expand.html)
