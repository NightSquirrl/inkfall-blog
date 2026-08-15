---
title: 🪤 2. Vue 状态管理
tag:
  - Vue
  - vuex
  - pinia
---
![pinia.svg](https://pinia.vuejs.org/logo.svg)
# Vue 状态管理 vuex pinia


## Vuex
### Vue2 选项式 API
> 状态管理 - 在 src 中创建文件夹 store，创建 index.js 文件

```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 把 Vuex 注册到Vue 上

export default new Vuex.Store({
    // 在开发环境开启严格模式 这样修改数据 就必须通过 mutation 来处理
    strict:products.env.NODE_ENV !== 'production',
    // 状态
    state: {
    },
    // 用来处理状态
    mutations: {
    },
    // 用于异步处理
    actions: {
    },
    // 用来挂载模块
    modules: {
    }
})
```
> 要使用 store 就在把 store 挂载到 Vue 中

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  // 挂载到vue 中
  store,
  render: (h) => h(App),
}).$mount('#app')

```

#### vuex 基础使用

##### 1.state

> 在 state 中添加数据

```javascript
/* src/store/index.js */

// 导入 Vue
import Vue from 'vue'
// 导入 Vuex 插件
import Vuex from 'vuex'

// 把 Vuex 注册到Vue 上
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  mutations: {},
  actions: {},
  modules: {},
})


```

> State 数据的使用

1. 直接使用 `this.$store.state[属性]` ，（`this` 可以省略）

```javascript
<template>
  <div id="app">
    {{ this.$store.state.name }}
    {{ this.$store.state.age }}
  </div>
</template>

```

2. 使用 mapState

```javascript
<template>
  <div id="app">
    {{ name }}
    {{ age }}
  </div>
</template>

<script>

// 从 Vuex 中导入 mapState
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 将 store 映射到当前组件的计算属性
    ...mapState(['name', 'age'])
  }
}
</script>

<style  scoped>
</style>


```

> 注意 maopState 的别名

```javascript
computed: {
    // name2 和 age2 都是别名
    ...mapState({ name2: 'name', age2: 'age'}])
}

```

##### 2.Mutation

`Store` 中的状态不能直接对其进行操作，我们得使用 `Mutation` 来对 `Store` 中的状态进行修改，虽然看起来有些繁琐，但是方便集中监控数据的变化

`state` 的更新必须是 `Mutation` 来处理

> 我们现在 mutaions 里定义个方法

```javascript
/* src/store/index.js */

// 导入 Vue
import Vue from 'vue'
// 导入 Vuex 插件
import Vuex from 'vuex'

// 把 Vuex 注册到Vue 上
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  mutations: {
    // 在这里定义 方法
    /**
     *
     * @param {*} state 第一个参数是 Store 中的状态(必须传递)
     * @param {*} newName 传入的参数 后面是多个
     */
    changeName(state, newName) {
      // 这里简单举个例子 修改个名字
      state.name = newName
    },
  },
  actions: {},
  modules: {},
})


```

> 在组件中使用 mutations 中的方法

同样有两种方法在组件触发 `mutations` 中的方法

1. this.$store.commit() 触发

在 `methods` 中定义一个方法，在这个方法里面进行触发 `mutations` 中的方法

```javascript
<template>
  <div id="app">
    <button @click="handleClick">方式1 按钮使用 mutation 中方法</button>
    {{ name }}
  </div>
</template>

<script>

// 从 Vuex 中导入 mapState
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 将 store 映射到当前组件的计算属性
    ...mapState(['name', 'age'])
  },
  methods: {
    handleClick() {
      // 触发 mutations 中的 changeName
      this.$store.commit('changeName', '小浪')
    }
  },
}
</script>

<style  scoped>
</style>


```

2. 使用 mapMutations

```javascript
<template>
  <div id="app">
    <button @click="changeName('小浪')">方式2 按钮使用 mutation 中方法</button>
    {{ name }}
  </div>
</template>

<script>

// 从 Vuex 中导入 mapState
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 将 store 映射到当前组件的计算属性
    ...mapState(['name', 'age'])
  },
  methods: {
	// 将 mutations 中的 changeName 方法映射到 methods 中，就能直接使用了 changeName 了
    ...mapMutations(['changeName'])
  },
}
</script>

<style  scoped>
</style>


```

##### 3.Action

> `Action` 和 `Mutation` 区别

`Action` 同样也是用来处理任务，不过它处理的是异步任务，异步任务必须要使用 `Action`，通过 `Action` 触发 `Mutation` 间接改变状态，不能直接使用 `Mutation` 直接对异步任务进行修改

> 先在 `Action` 中定义一个异步方法来调用 `Mutation` 中的方法

```javascript
/* src/store/index.js */

// 导入 Vue
import Vue from 'vue'
// 导入 Vuex 插件
import Vuex from 'vuex'

// 把 Vuex 注册到Vue 上
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  mutations: {
    // 在这里定义 方法
    /**
     *
     * @param {*} state 第一个参数是 Store 中的状态(必须传递)
     * @param {*} newName 传入的参数 后面是多个
     */
    changeName(state, newName) {
      // 这里简单举个例子 修改个名字
      state.name = newName
    },
  },
  actions: {
    /**
     *
     * @param {*} context 上下文默认传递的参数
     * @param {*} newName 自己传递的参数
     */
    // 定义一个异步的方法 context是 store
    changeNameAsync(context, newName) {
      // 这里用 setTimeout 模拟异步
      setTimeout(() => {
        // 在这里调用 mutations 中的处理方法
        context.commit('changeName', newName)
      }, 2000)
    },
  },
  modules: {},
})


```

> 在组件中是 Action 中的异步方法也是有两种方式

1. this.$store.dispatch()

```javascript
<template>
  <div id="app">
    <button @click="changeName2('小浪')">方式1 按钮使用 action 中方法</button>
    {{ name }}
  </div>
</template>

<script>

// 从 Vuex 中导入 mapState mapMutations
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 将 store 映射到当前组件的计算属性
    ...mapState(['name', 'age'])
  },
  methods: {
    changeName2(newName) {
      // 使用 dispatch 来调用 actions 中的方法
      this.$store.dispatch('changeNameAsync', newName)
    }
  },
}
</script>

<style  scoped>
</style>


```

2. 使用 mapActions

```javascript
<template>
  <div id="app">
    <button @click="changeNameAsync('小浪')">
      方式2 按钮使用 action 中方法
    </button>
    {{ name }}
  </div>
</template>

<script>

// 从 Vuex 中导入 mapState mapMutations mapActions
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 将 store 映射到当前组件的计算属性
    ...mapState(['name', 'age'])
  },
  methods: {
    // 映射 actions 中的指定方法 到 methods中，就可以在该组件直接使用
    ...mapActions(['changeNameAsync'])
  },
}
</script>

<style  scoped>
</style>


```

##### 4.Getter

> 简介

`Getter` 类似于计算属性，但是我们的数据来源是 `Vuex` 中的 `state` ,所以就使用 `Vuex` 中的 `Getter` 来完成

> 应用场景

需要对 `state` 做一些包装简单性处理 展示到视图当中

> 先来写个 Getter

```javascript
/* src/store/index.js */

// 导入 Vue
import Vue from 'vue'
// 导入 Vuex 插件
import Vuex from 'vuex'

// 把 Vuex 注册到Vue 上
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  getters: {
    // 在这里对 状态 进行包装
    /**
     *
     * @param {*} state 状态 如果要使用 state 里面的数据，第一个参数默认就是 state ，名字随便取
     * @returns
     */
    decorationName(state) {
      return `大家好我的名字叫${state.name}今年${state.age}岁`
    },
  },
})


```

1. this.$store.getters[名称]

```javascript
<template>
  <div id="app">
    {{ this.$store.getters.decorationName }}
  </div>
</template>

```

2. 使用 mapGetters

```javascript
<template>
  <div id="app">
    {{ decorationName }}
  </div>
</template>

<script>

// 从 Vuex 中导入 mapGetters
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 将 getter 映射到当前组件的计算属性
    ...mapGetters(['decorationName'])
  },
}
</script>

```

5. ##### Module

为了避免在一个复杂的项目 `state` 中的数据变得臃肿，`Vuex` 允许将 `Store` 分成不同的模块，每个模块都有属于自己的 `state`，`getter`，`action`，`mutation`

> 我们这里新建一个 `animal.js` 文件

```javascript
/* animal.js */

const state = {
  animalName: '狮子',
}
const mutations = {
  setName(state, newName) {
    state.animalName = newName
  },
}

//导出
export default {
  state,
  mutations,
}


```

> 在 `store/index.js`中的 `modules` 进行挂载这个模块

```javascript
/* src/store/index.js */

// 导入 Vue
import Vue from 'vue'
// 导入 Vuex 插件
import Vuex from 'vuex'
// 引入模块
import animal from './animal'

// 把 Vuex 注册到Vue 上
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    animal,
  },
})


```

> 然后我们就可以在组件中使用了

```javascript
<template>
  <div id="app">
    {{ this.$store.state.animal.animalName }}
    <button @click="$store.commit('setName', '老虎')">改名</button>
  </div>
</template>

```



### Vue3 组合式 API @4

[官方教程](https://vuex.vuejs.org/guide/)

简单的使用 -- 创建

```javascript
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state,val) {
      state.count++
    }
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
```

现在，你可以通过 `store.state` 来获取状态对象，并通过 `store.commit` 方法触发状态变更：

```Plain Text
    import {useStore} from "vuex"
    const store = useStore()
        <button @click="store.commit('increment')">vuex increment</button>


    store.commit('increment',"xxxx")

    console.log(store.state.count) // -> 1
```

在 Vue 组件中， 可以通过 `this.$store` 访问 store 实例。现在我们可以从组件的方法提交一个变更：

```JavaScript
    methods: {
      increment() {
        this.$store.commit('increment')
        console.log(this.$store.state.count)
      }
    }
```

### 增加模块的概念

单个:

```javascript
    // 用户
    export default {
      // 开启命名空间
      namespaced: true,
      state: {
        info: {
          uname: 'Leo',
          age: 21
        }
      },
      mutations: {
        updateUname(state, val) {
          state.info.uname = val
        },
        updateAge(state, val) {
          state.info.age = val
        }
      },
      actions: {
        asyncUpdate(store, val) {
          setTimeout(() => {
            store.commit('updateAge', val)
          }, 2000)
        }
      },
      getters: {
        format(state) {
          return state.info.uname + ',nice to meet you~'
        }
      }
    }


```

整合:

```Plain Text
    import { createStore } from 'vuex'

    import global from './modules/global.js'
    import user from './modules/user.js'

    export default createStore({
      // 公共模板直接在这里展开就可以
      ...global,
      modules: {
        user
      }
    })


```

## Pinia

### vue3

    安装

````Vue
    import { createApp } from 'vue'
    import { createPinia } from 'pinia'
    import App from './App.vue'

    const pinia = createPinia()
    const app = createApp(App)

    app.use(pinia)
    app.mount('#app')
    ```

    Option Store

    ```TypeScript
    export const useCounterStore = defineStore('counter', {
      state: () => ({ count: 0 }),
      getters: {
        double: (state) => state.count * 2,
      },
      actions: {
        increment() {
          this.count++
        },
      },
    })
````

Setup Store

```TypeScript
    export const useCounterStore = defineStore('counter', () => {
      const count = ref(0)
      function increment() {
        count.value++
      }

      return { count, increment }
    })
```

数据的使用

```TypeScript
    import usexxx from ""

    const xxx = usexxx()

    //使用
    xxx.yyy

    //

```

重置 state

```TypeScript
    const store = useStore()

    store.$reset()
```

storeToRefs -- 解决结构丢失响应式

#### pinia 持久化

[https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

安装

```Plain Text
    yarn add pinia-plugin-persistedstate

    import { createPinia } from 'pinia'
    import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)

```

使用

```Plain Text
    import { defineStore } from 'pinia'

    export const useStore = defineStore(
      'main',
      () => {
        const someState = ref('你好 pinia')
        return { someState }
      },
      {
        persist: true,
        key:"xxxx"
      }
    )
```

### vue2

安装

```TypeScript
    import { createPinia, PiniaVuePlugin } from 'pinia'

    Vue.use(PiniaVuePlugin)
    const pinia = createPinia()

    new Vue({
      el: '#app',
      // 其他配置...
      // ...
      // 请注意，同一个`pinia'实例
      // 可以在同一个页面的多个 Vue 应用中使用。
      pinia,
    })
```
