---
title: 3. Vue中组件的通信方式
tag:
  - Vue
---

## Vue2 
子组件中，使用 $emit 触发一个自定义事件，并传递需要传递的数据：

```js
// 子组件
this.$emit('custom-event', data);
```
父组件中，监听子组件触发的自定义事件，并在事件处理函数中接收数据：

```html
<!-- 父组件 -->
<child-component @custom-event="handleCustomEvent"></child-component>
```

```js
// 父组件
methods: {
  handleCustomEvent(data) {
    console.log('接收到子组件传递的数据：', data);
  }
}

```

## Vue3 

### 父子组件

#### emit 的方式
 > 子组件传递
```vue
<template>
  <button @click="clickChild">点击子组件</button>
</template>
 
<script setup>
import { defineEmits } from 'vue'
// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['clickChild'])
const clickChild=()=>{
  let param={
    content:'b'
  }
  //传递给父组件
  emit('clickChild',param)
}
</script>
 
<style>
 
</style>
```

> 父组件接受

```vue
<template>
  <div class="hello">
  我是父组件
  <!-- clickChild是子组件绑定的事件，click是父组件接受方式 -->
   <Child  @clickChild="clickEven"></Child>
 <p>子组件传递的值是 {{result}}</p>
 </div>
</template>
 
<script setup>
import Child from './Child'
import {ref} from 'vue'
const result=ref('')
const clickEven=(val)=>{
  console.log(val);
  result.value=val.content
}
</script>
 
<style scoped>
 
</style>
```

#### 父组件获取子组件中的属性值

> 核心在于 子组件的 `defineExpose({sex, info})`

子组件传递的方式
```vue
<template>
  <div>
        <h2> 我是子组件</h2>
        <p>性别:{{ sex}}</p>
    </div>
</template>
 
<script setup>
import { reactive, ref,defineExpose } from "vue";
let sex=ref('男')
let info=reactive({
    like:'王者荣耀',
    age:18
})
defineExpose({sex, info})
</script>
 
<style>
 
</style>
```

父组件显示的方式

> 为子组件的添加 ref 实例

```vue
<template>
  <div class="hello">
  我是父组件
   <Child ref="testcomRef"></Child>
<button @click="getSonHander">获取子组件中的数据</button>
 </div>
</template>
 
<script setup>
import Child from './Child'
import {ref} from 'vue'
const testcomRef = ref()
const getSonHander=()=>{
  console.log('获取子组件中的性别', testcomRef.value.sex );
    console.log('获取子组件中的其他信息', testcomRef.value.info )
}
</script>
 
<style scoped>
 
</style>
```

#### 子组件调用父组件的方法 | 子组件修改父组件的值

子组件

```vue

<template>
  <div id="cesiumContainer" class="map-x">
    <button class="close" @click="changeFatherData">X</button>
  </div>
</template>
<script setup>
import { defineEmits } from "vue"
const emits = defineEmits(["closeFather"])
 
const changeFatherData = () => {
  emits("closeFather")
}
</script>
```
父组件

```vue
<template>
<XYZLayerList @closeFather="closeFather"></XYZLayerList>
</template>
<script setup>
import XYZLayerList from "./XYZLayerList.vue"//引入子组件
const closeFather = () => {
  console.log("触发了父组件方法")
}
</script>
```

### 爷孙组件通信

#### provide / inject

这个通信方式也是有两部分：

1. Grandfather.vue 通过 provide 向孙组件 Grandson.vue 提供数据和方法
2. Grandson.vue 通过 inject 注入爷爷组件 Grandfather.vue 的数据和方法

无论组件层次结构有多深，发起 provide 的组件都可以作为其所有下级组件的依赖提供者。

![imagede42eb2e9680d4f6.png](https://www.z4a.net/images/2024/06/10/imagede42eb2e9680d4f6.png)

Vue 3 的这一部分内容对比 Vue 2 来说变化很大，但使用起来其实也很简单，开发者学到这里不用慌，它们之间也有相同的地方：

1. 爷组件不需要知道哪些子组件使用它 provide 的数据
2. 子组件不需要知道 inject 的数据来自哪里

另外要切记一点就是： provide 和 inject 绑定并不是可响应的，这是刻意为之的，除非传入了一个可侦听的对象。

##### 发起 provide

> Grandfather.vue 

```vue
// Grandfather.vue
import { defineComponent, provide, ref } from 'vue'

export default defineComponent({
  setup() {
    // 声明一个响应性变量并 provide 其自身
    // 孙组件获取后可以保持响应性
    const msg = ref('Hello World!')
    provide('msg', msg)

    // 只 provide 响应式变量的值
    // 孙组件获取后只会得到当前的值
    provide('msgValue', msg.value)

    // 声明一个方法并 provide
    function printMsg() {
      console.log(msg.value)
    }
    provide('printMsg', printMsg)
  },
})
```

##### 接收 inject

```vue
// Grandson.vue
import { defineComponent, inject } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
  setup() {
    // 获取响应式变量
    const msg = inject<Ref<string>>('msg')
    console.log(msg!.value)

    // 获取普通的字符串
    const msgValue = inject<string>('msgValue')
    console.log(msgValue)

    // 获取函数
    const printMsg = inject<() => void>('printMsg')
    if (typeof printMsg === 'function') {
      printMsg()
    }
  },
})
```

##### 设置默认值

```vue
// Grandson.vue
import { defineComponent, inject, ref } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
  setup() {
    // 获取响应式变量
    const msg = inject<Ref<string>>('msg', ref('Hello'))
    console.log(msg.value)

    // 获取普通的字符串
    const msgValue = inject<string>('msgValue', 'Hello')
    console.log(msgValue)

    // 获取函数
    const printMsg = inject<() => void>('printMsg', () => {
      console.log('Hello')
    })
    printMsg()
  },
})
```

