---
title: Vue速记面试题
description: Vue速记面试题
publishedAt: 2026-08-22
category: 面试
tags:
  - 面试
  - Vue
draft: false
---

## 目录

**一、生命周期**
1. Vue 生命周期

**二、响应式原理**
2. Object.defineProperty
3. Proxy
4. Vue 响应式实现原理
5. Vue2 为什么监听不到数组下标和对象新增属性

**三、虚拟DOM与Diff**
6. 虚拟DOM
7. Diff 算法
8. key 的原理
9. key 为什么不能随便用 index

**四、常用API与机制**
10. nextTick 原理
11. v-model 原理
12. computed vs watch
13. v-if vs v-show
14. v-for 中 key 的作用
15. keep-alive
16. 组件通信

**五、组件设计与底层机制**
17. Vue 组件设计原则
18. $attrs / $listeners
19. provide / inject
20. `<style scoped>` 原理
21. template 编译原理
22. Vue 性能优化
23. 首页白屏问题
24. 打包后静态资源失效
25. history 模式部署 404
26. 权限管理方案

**六、路由**
27. 路由模式
28. 路由守卫
29. 路由懒加载
30. 动态路由

**七、Vuex**
31. Vuex 五大核心
32. mutation vs action
33. Vuex 为什么需要

**八、数据与组件基础**
34. 单向数据流 / 双向绑定
35. data 为什么必须是函数
36. data 和 methods 同名
37. computed 和 data 同名
38. props 和 methods 同名
39. `$` 和 `_` 开头变量
40. Vue.delete
41. 数组响应式
42. 自定义指令
43. 自定义组件
44. slot
45. 动态组件
46. 递归组件

---

## 一、生命周期

### 1. Vue 生命周期

**核心概念**
生命周期是组件从创建、挂载、更新到销毁全过程中，Vue 在特定节点自动调用的一系列钩子函数，让开发者能在合适的时机插入自己的逻辑。

**关键要点（Vue2 / Vue3 对照）**

| 阶段 | Vue2 | Vue3 (Options) | Vue3 (setup) |
|---|---|---|---|
| 创建前 | beforeCreate | beforeCreate | setup() 本身替代 |
| 创建后 | created | created | setup() 本身替代 |
| 挂载前 | beforeMount | beforeMount | onBeforeMount |
| 挂载后 | mounted | mounted | onMounted |
| 更新前 | beforeUpdate | beforeUpdate | onBeforeUpdate |
| 更新后 | updated | updated | onUpdated |
| 销毁前 | beforeDestroy | beforeUnmount | onBeforeUnmount |
| 销毁后 | destroyed | unmounted | onUnmounted |

- `beforeCreate`：data、methods 尚未初始化，拿不到 this.xxx。
- `created`：data/computed/methods 已可用，但真实 DOM 未生成，适合发起异步请求（比 mounted 更早触发接口，减少白屏时间）。
- `beforeMount`：模板已编译为 render 函数，虚拟 DOM 已生成，但尚未挂载到页面。
- `mounted`：真实 DOM 已插入页面，可以操作 DOM、初始化第三方插件（图表、地图等）。
- `beforeUpdate` / `updated`：数据变化触发重新渲染前后，注意在 updated 中修改数据可能导致死循环。
- `beforeUnmount/beforeDestroy` / `unmounted/destroyed`：清理定时器、解绑事件、取消订阅，防止内存泄漏。

**应用场景**
- `created` 发请求获取初始数据；
- `mounted` 中初始化 ECharts、监听 window resize；
- `beforeUnmount` 中 clearInterval、移除事件监听、断开 WebSocket。

**深度拓展**
- 父子组件生命周期顺序：父 beforeCreate → 父 created → 父 beforeMount → 子 beforeCreate → 子 created → 子 beforeMount → 子 mounted → 父 mounted；销毁顺序则是父 beforeDestroy → 子 beforeDestroy → 子 destroyed → 父 destroyed（先父后子，先子后父）。
- Vue3 setup() 执行时机在 beforeCreate 之前，因此组合式 API 中没有 beforeCreate/created 钩子，逻辑直接写在 setup 顶层即可。
- `keep-alive` 包裹的组件有额外的 `activated`/`deactivated` 钩子。

**速记法**
- 记忆框架（时间轴 4 阶段）：**创建 → 挂载 → 更新 → 销毁**，每阶段"前/后"成对出现，共 8 个（+ keep-alive 2 个 = 10 个）。
- 关键词提炼：创建管数据、挂载管 DOM、更新管重渲染、销毁管清理。
- 联想记忆：把组件比作"人的一生"——创建（受精卵/胎儿，created=出生但还没上户口即 DOM）、挂载（上户口=插入真实 DOM）、更新（成长变化）、销毁（离世前清理遗物=解绑事件）。
- 简化符号：`bC→C→bM→M→(bU→U)*→bD→D`（beforeCreate→Created→beforeMount→Mounted→循环 update→beforeDestroy→Destroyed）。

---

## 二、响应式原理

### 2. Object.defineProperty

**核心概念**
ES5 提供的 API，用于在对象上定义或修改属性，并可通过 `get`/`set` 存取器精确控制属性的读取和写入行为，是 Vue2 响应式系统的基石。

**关键要点**
```js
Object.defineProperty(obj, 'key', {
  get() { /* 依赖收集：track */ return val },
  set(newVal) { /* 派发更新：trigger */ val = newVal },
  enumerable: true,
  configurable: true
})
```
- 必须在初始化时**遍历对象已有属性**逐个劫持，无法拦截「新增属性」。
- 对数组需要额外重写 7 个变异方法（push/pop/shift/unshift/splice/sort/reverse）才能触发响应式，原生按下标赋值和修改 length 无法拦截。
- 需要递归遍历嵌套对象，深层对象初始化开销大。

**应用场景**
理解 Vue2 `data` 初始化时为什么要递归 walk 每个属性；解释 Vue2 `$set`/`$delete` 存在的必要性。

**深度拓展**
Vue2 中每个属性会对应一个 `Dep`（依赖收集器），组件渲染时读取属性触发 `get` 收集当前 `Watcher`，属性修改时触发 `set` 通知所有 `Watcher` 重新渲染，这套「发布-订阅」机制正是响应式的核心。

**速记法**
- 记忆框架：**遍历 + 劫持 + 存取器（get/set）**。
- 关键词提炼："能拦截已有、拦不了新增"；"数组要单独动手术"。
- 联想记忆：defineProperty 像"门卫盯梢"——只认识入职前就在册的员工（已有属性），新来的人（新增属性）它不认识，进出不通报。
- 简化符号：`defineProperty = get(收) + set(发)`，`⛔+新增` `⛔数组下标`。

### 3. Proxy

**核心概念**
ES6 提供的对象代理机制，可以对整个对象（包括新增/删除属性、数组操作）进行拦截，是 Vue3 响应式系统的基础。

**关键要点**
```js
const proxy = new Proxy(target, {
  get(target, key, receiver) { track(target, key); return Reflect.get(...arguments) },
  set(target, key, value, receiver) { const r = Reflect.set(...arguments); trigger(target, key); return r },
  deleteProperty(target, key) { trigger(target, key); return Reflect.deleteProperty(target, key) }
})
```
- 直接代理整个对象，无需初始化时递归遍历——**惰性代理**，访问到嵌套对象时才递归 Proxy，性能更优。
- 天然支持新增/删除属性、数组下标和 length 变化的拦截，无需 hack 数组方法。
- 需配合 `Reflect` 保证 `this` 指向和默认行为正确。

**应用场景**
Vue3 `reactive()` 的底层实现；理解为何 Vue3 不再需要 `$set`。

**深度拓展**
Proxy 有 13 种可拦截操作（get/set/has/deleteProperty/ownKeys 等），比 defineProperty 能力更全面；但 Proxy 存在兼容性问题（不支持 IE11），且不能被 polyfill，这是 Vue3 放弃低版本浏览器支持的原因之一。

**速记法**
- 记忆框架：**整体代理 + 惰性递归 + 13种拦截**。
- 关键词提炼："万能代理，新增自动感知，数组不用改方法"。
- 联想记忆：Proxy 像"整栋楼的物业"——不管新搬来的住户（新增属性）还是已有住户，物业都能统一管理，而 defineProperty 只是"逐户上门登记"。
- 简化符号：`Proxy = 全屋物业管理`，`✅新增` `✅数组` `❌IE`。

### 4. Vue 响应式实现原理（整体）

**核心概念**
Vue 通过"数据劫持 + 依赖收集/派发更新（发布订阅模式）"，让数据变化能自动驱动视图更新，核心三要素：Observer（劫持）、Dep（依赖管理）、Watcher（订阅者）。

**关键要点**
1. **Observer**：递归/代理遍历 data，把普通对象转换为响应式对象（Vue2 用 defineProperty，Vue3 用 Proxy）。
2. **Dep（依赖收集器）**：每个响应式属性对应一个 Dep 实例，内部维护一个 Watcher 数组。
3. **Watcher（订阅者）**：渲染 Watcher、computed Watcher、watch 侦听器各自订阅所需的数据；组件渲染时读取属性触发 `get`，将当前 Watcher 加入 Dep（**依赖收集**）；数据变化触发 `set`，Dep 通知所有 Watcher 更新（**派发更新**）。
4. Vue3 中依赖收集用 `WeakMap<target, Map<key, Set<effect>>>` 结构管理，配合 `effect`/`ref`/`reactive` 组成响应式系统。

**应用场景**
解释"为什么改了 data 页面自动变了"；排查响应式失效问题（如解构丢失响应式、直接替换整个 data 对象）。

**深度拓展**
- Vue3 中 `ref` 对基本类型通过 `.value` 触发 getter/setter，对象类型内部会自动用 `reactive` 包裹。
- 组件更新是**异步批量**的：多次修改数据只会触发一次视图更新（配合 nextTick 的微任务队列去重）。

**速记法**
- 记忆框架：**劫持（Observer）→ 收集（Dep）→ 通知（Watcher）**，三个角色对应"侦察兵-通讯录-士兵"。
- 关键词提炼："读时收集，写时通知"。
- 联想记忆：把响应式系统比作"报社订阅"——Dep 是报社的订阅名单，Watcher 是订户，属性被读取=有人订阅，属性被修改=报社群发更新给所有订户。
- 简化符号：`get→track→加入订阅表`，`set→trigger→通知全体订户重渲染`。

### 5. Vue2 为什么监听不到数组下标和对象新增属性

**核心概念**
根源在于 `Object.defineProperty` 的能力边界：只能拦截"初始化时已存在"的属性 getter/setter，无法感知新增属性；数组按下标赋值和修改 length 也不会触发已重写的变异方法。

**关键要点**
- 对象新增属性：`this.obj.newKey = 1` 不会触发 setter，因为 `newKey` 在初始化 walk 时并不存在，没有被 defineProperty 处理过。
- 解决：Vue2 提供 `Vue.set(obj, key, value)` / `this.$set`，内部本质是对新 key 手动执行一次 `defineReactive`，再触发依赖通知。
- 数组下标赋值：`arr[0] = 1` 或 `arr.length = 0` 不会触发响应式，因为 Vue2 只重写了 push/pop/shift/unshift/splice/sort/reverse 这 7 个变异方法，原生的下标赋值不经过这些方法。
- 解决：使用 `Vue.set(arr, index, value)` 或 `arr.splice(index, 1, value)`。

**应用场景**
排查"表单赋值后页面不更新""数组某一项改了但列表没重渲染"等经典 bug。

**深度拓展**
Vue3 使用 Proxy 从根源上解决了这两个问题：`obj.newKey = 1` 会触发 `set` trap，`arr[0] = 1` 也会被拦截，因此 Vue3 不再需要 `$set`/`$delete`。

**速记法**
- 记忆框架：**"新增属性无 setter" + "下标赋值绕过重写方法"**。
- 关键词提炼："defineProperty 是死名单，新人进不去；数组只认 7 个后门方法"。
- 联想记忆：Vue2 数组响应式像"小区只有 7 个正门有门禁刷卡（push/pop等），你翻墙进去（下标赋值）保安压根不知道你进来了"。
- 简化符号：`新增属性 ⇒ $set 补登记`；`arr[i]=x ⇒ splice 走正门`。

---

## 三、虚拟DOM与Diff

### 6. 虚拟DOM

**核心概念**
虚拟DOM（Virtual DOM）是用 JS 对象描述真实 DOM 结构的一种轻量级抽象（`{tag, props, children}`），Vue 通过对比新旧虚拟DOM树的差异，只更新真正变化的真实 DOM 节点。

**关键要点**
- 组成：`vnode = { tag, data(属性/事件), children, key, text, elm }`。
- 渲染流程：模板 → 编译为 render 函数 → 执行生成 VNode 树 → 通过 patch 转换为真实 DOM。
- 优点：跨平台（可渲染到 Web/小程序/Native）、批量更新减少直接操作真实 DOM 的性能开销、便于做 Diff 优化。
- 并非"虚拟DOM一定比原生操作快"——首次渲染时直接操作 DOM 反而更快，虚拟DOM的价值在于**更新阶段**的精确对比和跨平台能力。

**应用场景**
解释 Vue/React 渲染机制；理解 SSR、小程序跨端框架（uni-app/Taro）为什么能"一次编写多端运行"。

**深度拓展**
Vue3 引入了 **PatchFlag 编译时标记**，在编译阶段就标记出动态节点及动态类型（如只有文本变化、只有 class 变化），运行时 Diff 时跳过静态节点，只比对标记过的动态节点，大幅提升更新性能（"靶向更新"）。

**速记法**
- 记忆框架：**JS对象描述DOM → Diff对比 → 精确更新**。
- 关键词提炼："先造模型（vnode），再对比模型，最后精准施工（真实DOM）"。
- 联想记忆：虚拟DOM像"装修前先做3D效果图纸"——改动前先在图纸（内存）上对比新旧方案差异，再只对现场（真实DOM）动少量的工。
- 简化符号：`Template → Render() → VNode Tree → patch() → 真实DOM`。

### 7. Diff 算法

**核心概念**
Diff 算法是对比新旧两棵虚拟DOM树、找出最小变更集合的策略，Vue 采用**同层比较**（不跨层级对比）的双端/多端指针算法，将复杂度从 O(n³) 降到 O(n)。

**关键要点**
- 只比较同一层级的节点，不做跨层级的节点移动比较（如果层级变了直接删旧建新）。
- Vue2 采用**双端比较**：新旧头、新旧尾四个指针两两比较（旧头vs新头、旧尾vs新尾、旧头vs新尾、旧尾vs新头），命中则移动指针，未命中则通过 key 在旧节点中查找可复用节点。
- Vue3 在此基础上引入**最长递增子序列（LIS）**算法优化中间乱序部分的移动次数，进一步减少 DOM 移动操作。
- 核心目的：尽量复用已有 DOM 节点，减少创建和销毁真实 DOM 的开销。

**应用场景**
解释列表更新时为什么"只增删移动了少数几个节点，而不是全部重建"。

**深度拓展**
Vue3 的 Diff 分为无 key（简单 Diff）、有 key（双端/最长递增子序列）两种优化路径；配合 PatchFlag，Vue3 能跳过纯静态子树，只对带有动态标记的节点做 Diff，理论性能优于 Vue2 全量同层 Diff。

**速记法**
- 记忆框架：**同层比较 + 双端指针 + key复用 + （Vue3）LIS优化**。
- 关键词提炼："只比兄弟不比父子"；"头头尾尾先碰头，碰不上再按key找"。
- 联想记忆：Diff像"两队人排队对暗号"——新旧队伍先看排头和排尾是不是同一个人，是就直接换位置继续对，不是就翻花名册（key）找这个人挪过来，而不是把队伍全部解散重排。
- 简化符号：`旧头↔新头`、`旧尾↔新尾`、`旧头↔新尾`、`旧尾↔新头` → 都不中则查 key。

### 8. key 的原理

**核心概念**
`key` 是虚拟DOM节点的唯一标识，Diff 算法在同层比较时通过 `key` 判断两个节点是否为"同一个节点"，从而决定是复用（patch）还是销毁重建。

**关键要点**
- 没有 key（或 key 相同）：Vue 默认采用"就地复用"策略，按位置对比，导致带状态的组件/DOM（如输入框、勾选状态）可能张冠李戴。
- 有唯一且稳定的 key：Diff 能精确识别节点移动，只做位置调整而不是销毁重建，同时正确复用组件内部状态。
- key 应当使用稳定唯一的业务 ID，而非数组 index。

**应用场景**
`v-for` 渲染列表、`transition-group` 做列表动画、动态组件切换 `<component :key="...">` 强制重新创建组件（常用于路由参数变化但组件复用不刷新的场景）。

**深度拓展**
`:key` 相同但内容不同时，Vue 认为是"同一节点更新属性"，不会触发组件的 `created`/`mounted`；而改变 key 会让 Vue 判定为"全新节点"，强制销毁旧组件、创建新组件，这是解决"路由参数变化但组件未重新初始化"问题的常用技巧。

**速记法**
- 记忆框架：**key = 节点身份证**。
- 关键词提炼："同key当熟人复用，不同key当陌生人重建"。
- 联想记忆：key 就像酒店客房的"房卡编号"——用同一张房卡（key不变）就还是回到同一间房收拾床铺（patch更新），换了房卡号就默认是新客人重新装修整个房间（销毁重建）。
- 简化符号：`key相同 → diff属性`；`key不同 → 卸载+新建`。

### 9. key 为什么不能随便用 index

**核心概念**
用数组下标作为 key，当数组发生**中间插入/删除/排序**时，index 会重新错位对应到不同的数据项，导致 Vue 误判节点身份，产生"复用错误"的 bug 和不必要的性能损耗。

**关键要点**
- 假设列表 `[A, B, C]` 对应 key `[0,1,2]`；在头部插入 `D` 后变为 `[D, A, B, C]`，key 依然是 `[0,1,2,3]`，Vue 会认为 index=0 的节点内容从 A 变成了 D，从而**更新已有DOM的内容**而不是"新增一个节点"——如果节点内部持有状态（如输入框的值、组件的本地 state），就会出现状态错位（如输入框内容跟着别的数据行跑）。
- 只有在列表**纯末尾追加、且不会重排/删除中间项**的静态列表场景下，用 index 作为 key 才是安全的。

**应用场景**
解释"删除列表某一项后，别的行的勾选状态/输入内容跟着变了"这类经典 bug 的成因。

**深度拓展**
本质上是 diff 算法"以 key 判断同一性"的副作用——index 不是数据的稳定身份标识，它会随数组变化而漂移，因此推荐使用数据自身的唯一 ID（如后端返回的 `id` 字段）作为 key。

**速记法**
- 记忆框架：**index 会漂移，数据身份要稳定**。
- 关键词提炼："插队/删除会让index错位，状态就认错人"。
- 联想记忆：用 index 当 key 就像"按座位号发工资条"而不是按工号——中途有人插队坐到第1排，工资条（状态）就发错人了。
- 简化符号：`index作key ⇒ 增删排序时 ⇒ 状态错位 ⚠️`；`唯一id作key ⇒ 安全 ✅`。

---

## 四、常用API与机制

### 10. nextTick 原理

**核心概念**
`nextTick(callback)` 将回调延迟到"下一次 DOM 更新循环结束之后"执行，用于在数据变化、DOM 更新完成后拿到最新的真实 DOM。

**关键要点**
- Vue 的数据更新是**异步批量**的：同一个事件循环中多次修改数据只会触发一次视图更新（用一个队列去重 Watcher，避免重复渲染）。
- `nextTick` 的实现是一个**微任务优先、宏任务兜底**的降级策略：优先使用 `Promise.then`（微任务），不支持时依次降级为 `MutationObserver` → `setImmediate` → `setTimeout(fn, 0)`（宏任务）。
- 微任务比宏任务优先级更高，能保证回调在浏览器重绘之前、但在 DOM 更新之后尽快执行。

**应用场景**
修改 data 后立即操作对应的真实 DOM（如获取新渲染元素的高度）；表单聚焦（`this.$nextTick(() => this.$refs.input.focus())`）。

**深度拓展**
Vue3 中 `nextTick` 直接返回一个 Promise，可以 `await nextTick()`；内部同样维护一个异步更新队列（`queueJob`），保证同一 tick 内的多次状态更新只会触发一次组件重新渲染。

**速记法**
- 记忆框架：**异步更新队列 + 微任务优先降级链**。
- 关键词提炼："改数据不会立刻改DOM，nextTick排队等DOM更新完"。
- 联想记忆：nextTick像"点外卖排队叫号"——你改数据是下单，Vue把多个订单（多次修改）合并一次配送（一次DOM更新），nextTick回调就是"叫到号再取餐（拿到最新DOM）"。
- 简化符号：`data变化 → 入队 → 微任务(Promise>MutationObserver>setImmediate>setTimeout) → 更新DOM → 执行nextTick回调`。

### 11. v-model 原理

**核心概念**
`v-model` 是语法糖，本质是"绑定属性 + 监听事件反向赋值"的组合，实现表单/组件的双向数据绑定。

**关键要点**
- 原生表单元素：`<input v-model="msg">` 等价于 `:value="msg" @input="msg = $event.target.value"`（不同元素类型对应不同的属性/事件，如 checkbox 用 `checked`+`change`）。
- 组件上使用：Vue2 默认等价于 `:value="x" @input="x = $event"`，可通过组件的 `model: { prop, event }` 选项自定义绑定的属性名和事件名。
- Vue3：默认 prop 变为 `modelValue`，事件变为 `update:modelValue`，且支持多个 `v-model`（如 `v-model:title`），对应 `:title` + `@update:title`。

**应用场景**
封装自定义表单组件（如自定义 Select、Switch）时，需要正确 emit 对应事件以支持 `v-model`。

**深度拓展**
Vue3 的 `v-model` 基于**编译时宏**展开，支持传入修饰符（如 `v-model.trim`）并通过 `modelModifiers` prop 让组件感知修饰符，实现更灵活的自定义绑定逻辑。

**速记法**
- 记忆框架：**value（属性）+ input/update（事件）双向绑定语法糖**。
- 关键词提炼："写是value，改是emit事件"。
- 联想记忆：v-model 像"遥控器和电视"——value 是电视当前显示的画面（数据→视图），你按遥控器按钮（用户输入）触发 emit 事件，反过来改变数据源。
- 简化符号：`v-model = :value + @input(x=$event)`（Vue2）；`v-model = :modelValue + @update:modelValue`（Vue3）。

### 12. computed vs watch

**核心概念**
computed 是**基于依赖缓存的派生数据**，watch 是**监听某个数据变化后执行副作用**，二者都基于同一套响应式依赖收集机制，但设计目的不同。

**关键要点**

| 维度 | computed | watch |
|---|---|---|
| 本质 | 有缓存的派生值 | 数据变化的回调 |
| 缓存 | 依赖不变则不重新计算 | 无缓存，每次变化都执行 |
| 用途 | 从已有数据计算出新值 | 执行异步操作/复杂逻辑/DOM操作 |
| 支持异步 | 不支持（需返回同步值） | 支持在回调中写异步逻辑 |
| 多个依赖 | 天然支持多个响应式依赖 | 需要用数组或 computed 中转来监听多个值 |

**应用场景**
- computed：根据 `firstName + lastName` 计算 `fullName`，根据购物车数组计算总价。
- watch：监听路由参数变化重新请求数据，监听搜索框输入做防抖请求。

**深度拓展**
computed 内部也是一个特殊的 Watcher（lazy watcher），依赖的响应式数据不变时直接返回缓存值，不重新求值；这也是它为什么"看起来像属性但其实是函数"的原因。watch 支持 `immediate`（立即执行一次）和 `deep`（深度监听对象内部变化）配置。

**速记法**
- 记忆框架：**computed算得快有缓存，watch盯得准做副作用**。
- 关键词提炼："能算出来用computed，要做事情（请求/操作DOM）用watch"。
- 联想记忆：computed像"自动计算器"（有记忆，输入不变直接出上次答案），watch像"监控摄像头+警报器"（发现异常就触发一串动作，不负责算数）。
- 简化符号：`computed = f(依赖)+缓存`；`watch(依赖) => 副作用()`。

### 13. v-if vs v-show

**核心概念**
两者都能控制元素显示/隐藏，但 `v-if` 是**条件渲染**（真正增删DOM），`v-show` 是**样式切换**（`display:none`，DOM始终存在）。

**关键要点**
- `v-if`：切换时会触发组件的销毁和重建（走完整生命周期），初次渲染为 false 时不渲染任何内容，切换开销大，适合**不频繁切换**的场景。
- `v-show`：初次渲染始终会渲染 DOM（只是加上 `display:none`），切换只是改 CSS，开销小，适合**频繁切换**的场景。
- `v-if` 可以和 `v-else-if`/`v-else` 搭配做条件分支；`v-show` 不支持 `template` 标签，也不支持 `v-else`。

**应用场景**
- 权限判断、内容互斥切换（如登录/未登录不同界面）→ `v-if`。
- Tab 页签切换、频繁展开收起的面板 → `v-show`。

**深度拓展**
`v-if` 为 false 时元素/组件不会被创建，意味着内部的 `mounted` 等钩子不会执行，也不会占用运行时资源；`v-show` 无论条件如何都会初始化组件实例，因此首屏若有大量 `v-show=false` 的重组件，会拖慢首次渲染。

**速记法**
- 记忆框架：**if 是"生死"（增删DOM），show 是"隐身"（display切换）**。
- 关键词提炼："if开销大切换少用，show开销小切换多用"。
- 联想记忆：v-if像"拆房子重建房子"，v-show像"关灯开灯"——房子（DOM）一直都在，只是看不看得见。
- 简化符号：`v-if: 有/无DOM`；`v-show: display:none/block`。

### 14. v-for 中 key 的作用

**核心概念**
（与第 8 题原理相同，此处聚焦 `v-for` 场景）`key` 让 Vue 在列表更新时能通过唯一标识精确追踪每一项，从而正确复用/移动/新建/销毁对应的 DOM 与组件实例，而不是简单按位置就地复用。

**关键要点**
- 不加 key：默认按位置 diff，容易在增删排序时导致状态错位。
- 加稳定 key：Vue 能识别"移动了哪几项""新增/删除了哪几项"，只对真正变化的节点操作，同时正确保留每项内部的状态（如输入框的值、动画状态）。
- 官方强烈建议 `v-for` 一定要绑定 `:key`，且避免用 index（同第9题）。

**应用场景**
带交互状态的列表（表单列表、可拖拽列表）、`<transition-group>` 列表过渡动画（依赖 key 识别元素身份来生成正确的进入/离开动画）。

**深度拓展**
`transition-group` 的列表动画完全依赖 key 判断元素是"新增""删除"还是"移动"，从而应用 `v-enter`/`v-leave`/`v-move` 对应的 CSS 类，如果 key 不稳定，动画会错乱。

**速记法**
- 记忆框架：**key = 列表项的追踪ID**。
- 关键词提炼："v-for没key，diff靠猜；有key，diff靠认"。
- 联想记忆：像"快递单号"——没单号（无key）快递员只能按送货顺序瞎猜是谁的包裹，有单号就能精确追踪每件包裹（列表项）去哪了。
- 简化符号：`v-for + :key(唯一id)` = 精确追踪 ✅。

### 15. keep-alive

**核心概念**
`<keep-alive>` 是 Vue 内置的抽象组件，用于**缓存组件实例**，避免组件在切换时被重复销毁和创建，从而保留组件状态（如滚动位置、表单输入）。

**关键要点**
- 被包裹的组件切换时不会走 `beforeUnmount`/`unmounted`，而是触发 `deactivated`；再次激活时不走 `created`/`mounted`，而是触发 `activated`。
- 支持 `include`/`exclude`（字符串、正则、数组，匹配组件的 `name` 选项）精确控制缓存哪些组件；`max` 限制最大缓存数量（超出后按 LRU 策略淘汰最久未使用的组件）。
- 常见组合：`<router-view v-slot="{ Component }"><keep-alive><component :is="Component" /></keep-alive></router-view>`，实现"列表页返回时保留滚动位置和筛选条件"。

**应用场景**
列表页 ↔ 详情页来回切换需要保留列表滚动位置和查询条件；Tab 切换页面保留各 Tab 内部状态。

**深度拓展**
keep-alive 内部维护一个缓存对象（Vue2 是普通对象+key数组模拟 LRU，Vue3 中改用 Map + 更完善的 LRU 实现），本质是"用内存换体验"，缓存过多组件会增加内存占用，需要配合 `max` 或按需 `include` 控制。

**速记法**
- 记忆框架：**缓存组件实例 = 冻住不销毁**。
- 关键词提炼："切走不销毁（deactivated），切回不重建（activated）"。
- 联想记忆：keep-alive 像"游戏存档暂停"——切到别的应用（组件），游戏没有关闭，只是暂停挂起（deactivated），回来接着玩（activated）而不是重开一局。
- 简化符号：`unmount ⇒ deactivated（暂停）`；`mount ⇒ activated（恢复）`。

### 16. Vue 组件通信

**核心概念**
Vue 提供多种组件间数据传递/事件通信的方式，核心思路是"数据从哪来、事件往哪去"，需要根据组件关系（父子/兄弟/跨层级/任意组件）选择合适方式。

**关键要点**

| 关系 | 方式 |
|---|---|
| 父 → 子 | `props` |
| 子 → 父 | `$emit` 自定义事件 |
| 父 ↔ 子（双向） | `v-model` / `.sync`（Vue2） |
| 跨层级（祖孙） | `provide/inject` |
| 任意组件 | 全局状态管理 `Vuex`/`Pinia`；事件总线 `mitt`（Vue3 移除了内置 `$on/$emit` 全局总线） |
| 获取子组件实例 | `ref` + `$refs` |
| 插槽通信 | 作用域插槽 `v-slot` 把子组件数据传给父组件插槽内容 |
| 兄弟组件 | 通过共同父组件中转，或使用全局状态/事件总线 |

**应用场景**
表单组件封装用 `v-model`；深层嵌套的主题配置用 `provide/inject`；跨页面共享的用户信息、购物车用 Vuex/Pinia。

**深度拓展**
Vue3 推荐用 `provide/inject` 结合 `reactive` 传递响应式数据实现跨层级双向感知；大型项目更推荐 Pinia（替代 Vuex），API 更简洁且对 TS 支持更好。

**速记法**
- 记忆框架：**父子用props/emit，跨级用provide/inject，全局用Vuex/Pinia**。
- 关键词提炼："近亲直连，隔代传送，全员广播"。
- 联想记忆：组件通信像"公司沟通方式"——直属上下级当面说（props/emit），跨部门发全员邮件（provide/inject 穿透中间层），全公司共享的信息发布在公告栏（Vuex/Pinia）。
- 简化符号：`父→子: props↓`；`子→父: $emit↑`；`祖→孙: provide/inject`；`任意: store`。

---

## 五、组件设计与底层机制

### 17. Vue 组件设计原则

**核心概念**
组件设计应遵循"单一职责、高内聚低耦合、Props Down Events Up（单向数据流）、可复用可组合"等原则，使组件易维护、易测试、易复用。

**关键要点**
- **单一职责**：一个组件只做一件事，过大的组件应拆分为容器组件（逻辑/数据）+ 展示组件（纯UI）。
- **单向数据流**：数据通过 props 自上而下传递，子组件通过 emit 事件通知父组件修改，禁止子组件直接修改 props。
- **合理的 API 设计**：props 提供默认值和类型校验，暴露必要的 slot 增强灵活性，事件命名清晰语义化。
- **无状态/受控优先**：展示型组件尽量不持有内部状态，由外部完全控制，便于复用和测试。
- **组合优于继承**：通过 slot、mixin（或 Vue3 的组合式函数 composables）复用逻辑，而不是层层继承。

**应用场景**
设计通用组件库（Button、Table、Form）；封装业务组件时决定哪些数据用 props 传入、哪些逻辑抽成 composable。

**深度拓展**
Vue3 的组合式 API（Composition API）本质上是对"逻辑复用"原则的加强——用 `useXxx()` 函数封装一段有状态的逻辑，替代 Vue2 中 mixin 命名冲突、来源不清晰的问题。

**速记法**
- 记忆框架：**单一职责 + 单向数据流 + 组合复用**。
- 关键词提炼："只做一件事，数据往下流、事件往上抛，逻辑用组合不用继承"。
- 联想记忆：组件设计原则像"乐高积木"——每块积木功能单一（单一职责），插口标准统一（props/emit接口清晰），可以自由拼装组合（可组合复用）。
- 简化符号：`Props↓ Events↑`，`组件=积木块`。

### 18. $attrs / $listeners

**核心概念**
`$attrs` 是父组件传入但未被子组件 `props` 显式声明接收的属性集合（class/style除外），`$listeners`（Vue2专属，Vue3已合并进`$attrs`）是父组件绑定但未被子组件显式声明的事件监听器集合，二者常用于**多层组件透传属性**。

**关键要点**
- Vue2：`$attrs` 不含 class/style，`$listeners` 单独存放事件；需要配合 `inheritAttrs: false` 关闭默认的属性自动挂载到根元素行为，再手动 `v-bind="$attrs" v-on="$listeners"` 透传给内部真实元素。
- Vue3：`$listeners` 被合并进 `$attrs`（事件监听器以 `onXxx` 形式出现在 `$attrs` 中），只需 `v-bind="$attrs"` 即可同时透传属性和事件。

**应用场景**
封装二次包装的组件（如基于 Element Plus 的 Input 再封装一层业务组件），需要把未被显式声明的属性/事件原样透传给内部真实的表单组件，避免逐个 props 声明。

**深度拓展**
`inheritAttrs: false` + `$attrs` 透传是实现"高阶组件/组件二次封装"的关键技巧，可以让外部组件像使用原生组件一样使用被包装组件，同时内部能自由控制根元素结构。

**速记法**
- 记忆框架：**未声明的属性/事件 = "漏网之鱼"，靠 $attrs 兜底透传**。
- 关键词提炼："props没收的、Vue2里$listeners没接的，都进$attrs"。
- 联想记忆：像"快递中转站"——没写清收件人（未声明为props）的包裹先堆在中转站（$attrs），可以整批转发给下一级（v-bind="$attrs"）。
- 简化符号：`$attrs = 未声明props的属性`（Vue3含事件）；`Vue2另有$listeners = 未声明的事件`。

### 19. provide / inject

**核心概念**
`provide`/`inject` 是 Vue 提供的跨层级依赖注入机制，允许祖先组件向所有后代组件（无论嵌套多深）传递数据，而不需要逐层通过 props 透传。

**关键要点**
- 祖先组件用 `provide()`（组合式API）或 `provide` 选项提供数据，任意后代组件用 `inject()` 获取，无需知道数据具体来自哪一层。
- 默认提供的数据不是响应式的（传入的是普通值），若要响应式联动需要显式传入 `ref`/`reactive` 包裹的数据。
- 常用于组件库内部实现（如 Element Plus 的 Form 与 FormItem 之间共享校验规则、ElTabs 与 ElTabPane 共享激活状态）。

**应用场景**
主题配置（darkMode）、国际化语言包、表单组件与子表单项之间的上下文共享，避免"prop 逐层透传（prop drilling）"。

**深度拓展**
Vue3 中可以配合 `readonly()` 包裹 provide 的响应式数据，防止后代组件意外修改祖先状态，只允许通过祖先暴露的方法（一并 provide 出去）来修改，形成清晰的单向数据流约束。

**速记法**
- 记忆框架：**跨代传递，不用逐层递props**。
- 关键词提炼："祖先广播，后代按需订阅"。
- 联想记忆：像"家族祖传密码"——祖先设定一个密码（provide），不管隔多少代子孙，只要知道去哪查（inject）就能直接拿到，不用一代代口口相传（props逐层传）。
- 简化符号：`祖先: provide(key, value)` → `任意后代: inject(key)`。

### 20. `<style scoped>` 原理

**核心概念**
`scoped` 通过给组件模板的每个元素添加唯一的**属性选择器**（如 `data-v-xxxxxx`），并在编译CSS时给每条选择器规则追加同样的属性选择器，实现组件级别的样式隔离，避免全局样式污染。

**关键要点**
- 编译阶段：为组件的每个 DOM 元素添加一个唯一 hash 属性（如 `data-v-7ba5bd90`）；同时把 `.css` 中的选择器 `.a{color:red}` 编译为 `.a[data-v-7ba5bd90]{color:red}`。
- 属性选择器的**权重高于**普通类选择器一点点（等同于增加了一个属性选择器权重），但需注意如果和全局样式权重冲突，仍可能被覆盖。
- 父组件的 scoped 样式不会渗透到子组件内部，但子组件的**根节点**会同时带有父子两个组件的 data-v 属性，因此父组件可以设置子组件根节点的样式。
- 深度选择器 `:deep()`（Vue3）/ `>>>` 或 `/deep/`（Vue2）可以让 scoped 样式突破隔离去影响子组件内部元素（常用于覆盖第三方组件库样式）。

**应用场景**
业务组件避免样式冲突；用 `:deep()` 定制 Element Plus/Ant Design Vue 等组件库内部的样式细节。

**深度拓展**
scoped 是**编译时**方案（PostCSS插件处理），运行时没有额外性能开销，区别于 CSS Modules（生成哈希类名）和 CSS-in-JS（运行时生成样式）等其他隔离方案。

**速记法**
- 记忆框架：**编译时打标签（data-v-hash）+ 属性选择器隔离**。
- 关键词提炼："每个组件发一个专属工牌（data-v-xxx），CSS选择器认工牌才生效"。
- 联想记忆：scoped像"给每个班级发不同颜色的校服"——CSS规则只认对应颜色（属性选择器），其他班级（组件）的学生穿了也不会被这条规则命中。
- 简化符号：`元素 + [data-v-hash]`，`:deep()` = 破例允许影响子组件内部。

### 21. template 编译原理

**核心概念**
Vue 的模板编译分为三个阶段：**parse（解析）→ optimize/transform（转换优化）→ generate（代码生成）**，最终把 `template` 字符串编译为可执行的 `render` 函数。

**关键要点**
1. **parse**：用正则和状态机解析模板字符串，生成 AST（抽象语法树），描述标签、属性、指令、文本节点等结构。
2. **transform（Vue3）/ optimize（Vue2）**：遍历 AST，标记**静态节点/静态根节点**（Vue2），或标记**PatchFlag（动态类型）**、提升静态节点（Vue3的静态提升 hoistStatic）。
3. **generate**：把处理后的 AST 转换为 render 函数的字符串代码，最终通过 `new Function()` 生成可执行函数。
- Vue3 编译期优化亮点：**静态提升**（静态节点只创建一次，跨渲染复用）、**PatchFlag**（标记动态内容类型，Diff 时跳过静态部分）、**block树**（收集动态子节点，扁平化Diff，不用逐层递归全树）、**缓存事件处理函数**（内联事件默认加 cache，避免不必要的子组件重新渲染）。

**应用场景**
理解为什么写 `template` 而不是手写 render 函数也能获得优化；解释 Vue3 为什么运行时性能优于 Vue2。

**深度拓展**
`.vue` 单文件组件在**构建时**（Vite/webpack + vue-loader）就已经把 template 编译为 render 函数，运行时不需要再编译，这也是为什么"运行时+编译器"版本比"仅运行时"版本体积更大——生产环境通常只需运行时版本。

**速记法**
- 记忆框架：**parse解析 → transform转换优化 → generate生成代码**。
- 关键词提炼："模板变AST，AST打标记，标记生代码"。
- 联想记忆：模板编译像"写代码翻译成机器语言"——先分词造语法树（parse），再做语法优化打标记哪些不用重复处理（transform），最后翻译生成可执行指令（generate）。
- 简化符号：`template --parse--> AST --transform--> 优化AST --generate--> render()`。

### 22. Vue 性能优化

**核心概念**
性能优化贯穿"加载、渲染、运行时更新"三个维度，核心思路是**减少不必要的资源体积、减少不必要的渲染/计算**。

**关键要点**
- **加载优化**：路由懒加载、组件异步加载（`defineAsyncComponent`）、第三方库按需引入、CDN引入公共库、Gzip/Brotli压缩、图片懒加载与压缩、开启 http2。
- **渲染优化**：`v-show`替代频繁切换的`v-if`、合理使用`key`、大列表用虚拟滚动（vue-virtual-scroller）、避免在模板中写复杂表达式（提到 computed）、`v-for` 避免与 `v-if` 同时用在同一元素（Vue3 中 v-if 优先级高于 v-for，写法上更应拆分）。
- **响应式相关**：大数据量只读列表用 `Object.freeze()`（Vue2）或 `shallowRef`/`shallowReactive`（Vue3）跳过深度响应式转换；合理拆分组件粒度，减少无关状态导致的大范围重渲染。
- **运行时更新优化**：`keep-alive` 缓存不必要的重复渲染；函数式组件/无状态组件减少实例开销；使用 Vue3 的 `PatchFlag`、静态提升天然获得的编译期优化。
- **打包优化**：Tree-shaking、代码分割（splitChunks）、公共依赖提取、Gzip压缩、生产环境去除 sourcemap、图片转 webp。

**应用场景**
首屏加载慢、长列表滚动卡顿、频繁输入触发大量重渲染等性能问题的排查与优化。

**深度拓展**
性能优化需要配合 Chrome DevTools Performance 面板、Vue DevTools 的组件渲染高亮功能定位真正的瓶颈，避免"猜测式优化"；大列表虚拟滚动是解决"上万条数据卡死页面"的根本手段。

**速记法**
- 记忆框架：**加载（少加载） + 渲染（少渲染） + 运行时（少计算）** 三板斧。
- 关键词提炼："该来的才来（懒加载），该看的才画（虚拟滚动），该算的才算（computed/shallow）"。
- 联想记忆：性能优化像"减肥+提效"——加载优化是"少吃"（减少体积），渲染优化是"少动作"（减少不必要渲染），三者共同让应用"跑得又快又轻"。
- 简化符号：`加载↓体积` + `渲染↓次数` + `打包↓冗余`。

### 23. 首页白屏

**核心概念**
首页白屏指页面加载后长时间没有内容展示，常见原因包括 JS 资源体积过大、路由懒加载导致的等待、接口请求阻塞渲染、CDN/网络问题、代码报错导致挂载失败等。

**关键要点**
- **常见原因**：入口 JS 体积过大（未做代码分割）、`index.html` 中 `<div id="app">` 之前没有任何占位内容、首屏必要接口串行请求耗时长、第三方脚本阻塞、路由懒加载首个 chunk 下载慢、JS 报错导致 Vue 实例挂载失败。
- **排查手段**：Chrome DevTools Network/Performance 面板分析加载耗时；查看 Console 是否有报错；Lighthouse 跑分析首屏指标（FCP/LCP）。
- **优化手段**：路由懒加载 + 按需分包、公共依赖提取（vendor chunk）、开启 Gzip/CDN加速、首屏骨架屏（skeleton screen）或 loading 占位、关键接口并行请求、SSR/预渲染（prerender）直接输出有内容的HTML。

**应用场景**
首屏性能优化的核心考察点，常见于面试中考察"你做过哪些性能优化"的实操经验。

**深度拓展**
SSR（服务端渲染，如Nuxt）或预渲染方案能从根本上解决 SPA 首屏白屏问题——因为服务端直接返回带内容的 HTML，浏览器无需等待 JS 下载执行完才看到内容；对纯前端 SPA，骨架屏是性价比较高的折中方案。

**速记法**
- 记忆框架：**资源加载慢 + 接口阻塞 + 报错挂载失败**三类原因。
- 关键词提炼："要么东西没下载完，要么在等接口，要么代码挂了"。
- 联想记忆：白屏像"饭店还没开门"——要么食材（JS资源）还在运输路上，要么厨师（接口数据）还没准备好，要么厨房（代码）直接出故障关门了。
- 简化符号：`白屏 = 资源慢 or 接口慢 or JS报错`；`解法：分包+骨架屏+SSR`。

### 24. 打包后静态资源失效

**核心概念**
打包部署后出现图片/CSS/JS等静态资源404或路径错误，主要原因是**资源路径的配置（publicPath/base）与实际部署路径不一致**，或资源引用方式不当（相对路径 vs 绝对路径处理差异）。

**关键要点**
- **`publicPath`/`base` 配置错误**：Vue CLI 的 `publicPath` 或 Vite 的 `base` 需要与实际部署的子路径一致（如部署在 `/app/` 子目录下却仍配置为 `/`，会导致资源请求路径错误）。
- **相对路径引用图片**：模板/CSS中用相对路径引用的图片，构建工具会自动处理为带 hash 的正确路径并打入 `assets`；但如果在 `data`/JS变量中拼接路径字符串（如 `:src="'./img/' + name + '.png'"`），构建工具无法静态分析、不会被打包处理，部署后就会404——需要用 `import` 动态引入或放到 `public` 目录用绝对路径引用。
- **CDN/OSS 部署**：需要确认资源实际上传路径与 `publicPath` 配置的 CDN 域名一致。
- **缓存问题**：资源文件名未加 hash 导致浏览器/CDN 缓存旧文件，需要开启 `[name].[contenthash].js` 等文件名哈希策略。

**应用场景**
项目部署到非根路径的子目录、部署到 CDN、或产品反馈"线上图片裂了但本地正常"时的排查思路。

**深度拓展**
`public` 目录下的静态资源不经过 webpack/vite 处理，直接原样拷贝到输出目录，适合放置不需要哈希、需要绝对路径直接引用的资源（如 favicon、第三方SDK文件）；而 `src/assets` 下的资源会被构建工具处理、内联或加 hash，适合模板/组件内静态引用的图片。

**速记法**
- 记忆框架：**路径配置（base/publicPath）+ 动态路径引用方式**两大雷区。
- 关键词提炼："部署路径对不上，或者拼字符串引图片，构建工具都不认"。
- 联想记忆：像"寄快递写错地址"——`publicPath`配错就是包裹（资源）寄到了错误的城市（路径前缀不对）；动态拼路径就是"收件地址是拼凑猜的"，快递公司(构建工具)提前不知道，没法打包处理这份包裹。
- 简化符号：`publicPath/base 要match部署路径`；`动态图片路径 → import()引入或放public目录`。

### 25. history 模式部署 404

**核心概念**
`vue-router` 的 `history` 模式使用真实 URL（无 `#`），依赖浏览器 `history.pushState` 实现无刷新跳转；但用户直接刷新或直接访问深层路径时，请求会发到服务器，而服务器上并没有对应的物理文件，从而返回 404，需要服务器端配置**所有路径统一 fallback 返回 `index.html`**。

**关键要点**
- 原理：SPA 只有一个 `index.html` 入口，路由跳转由前端 JS 拦截并用 `pushState` 修改地址栏，**不会**真正向服务器发起请求；但用户刷新页面/直接输入URL时，浏览器会真实请求该路径，服务器找不到匹配的静态文件就返回404。
- **解决方案**：服务器配置通配符重写规则，所有未匹配到静态资源的请求都返回 `index.html`，交由前端路由接管。
  - Nginx：`try_files $uri $uri/ /index.html;`
  - Node/Express：使用 `connect-history-api-fallback` 中间件。
  - Apache：`.htaccess` 配置 `FallbackResource /index.html`。
- `hash` 模式（带 `#`）天然不会有此问题，因为 `#` 后面的内容不会发送给服务器，但 URL 不够美观、且不利于部分 SEO 场景。

**应用场景**
项目上线后"直接刷新页面/分享链接打开报404"的经典部署问题。

**深度拓展**
配置了统一 fallback 后，需要额外注意**真正不存在的路径**（如输错URL）也会被重写返回 `index.html`（默认200），此时前端路由内部需要自己配置一个 `404` 兜底路由（`path: '/:pathMatch(.*)*'`）来正确展示"页面不存在"，而不是让用户以为页面加载中。

**速记法**
- 记忆框架：**history模式=前端管的URL，服务器不认识，需要fallback统一回退到index.html**。
- 关键词提炼："刷新会问服务器，服务器没有这个文件，兜底返回入口页"。
- 联想记忆：像"前台代收所有信件"——不管信封写的是哪个房间号（路径），只要没有这个实体房间，前台（服务器）都统一转交给总机（index.html），由总机内部（前端路由）根据房间号分发。
- 简化符号：`直接访问深层路径 → 服务器无该文件 → 404`；`解法：nginx try_files → 统一fallback到index.html`。

### 26. 权限管理方案

**核心概念**
前端权限管理通常分为**路由权限（页面级）**和**按钮/操作权限（元素级）**两个维度，核心思路是根据登录用户的角色/权限标识，动态控制可访问的路由和可见的操作按钮。

**关键要点**
- **路由权限**：
  1. 前端预先配置全部路由，登录后根据接口返回的权限列表**动态过滤**可访问路由，用 `router.addRoute()` 动态挂载。
  2. 全局前置守卫 `router.beforeEach` 拦截，判断目标路由是否在用户权限列表中，无权限则重定向到登录页/403页面。
  3. 结合 `meta` 字段（如 `meta: { roles: ['admin'] }`）标记每个路由所需权限。
- **按钮/操作权限**：
  1. 自定义指令（如 `v-permission="'user:delete'"`），在指令的 `mounted`/`inserted` 钩子中判断用户是否拥有该权限，没有则移除DOM或隐藏元素。
  2. 封装权限判断函数/组合式函数（`usePermission`），在模板中用 `v-if` 结合权限判断结果控制渲染。
- **Token与状态**：登录后存储 token（一般在内存+localStorage，配合刷新token机制），路由守卫中校验 token 有效性，过期则跳转登录。

**应用场景**
中后台管理系统中，不同角色（管理员/普通用户/访客）看到不同的菜单、不同的操作按钮（如只有管理员能看到"删除"按钮）。

**深度拓展**
真正的安全边界必须在**后端接口层面**做权限校验，前端权限控制只是"体验层面"的隐藏/禁用，防止普通用户误触或看到不该看的界面，但不能作为唯一安全防线——即便前端隐藏了按钮，恶意用户仍可能直接调用接口，因此接口权限校验才是最后一道防线。

**速记法**
- 记忆框架：**路由级（能不能进这个页面）+ 按钮级（能不能点这个操作）双层权限**。
- 关键词提炼："菜单看角色动态生成，按钮靠指令/v-if控制显隐"。
- 联想记忆：像"公司门禁+办公室钥匙"——路由权限是"能不能刷卡进某层楼"，按钮权限是"进去后能不能打开某个抽屉（操作）"，而真正锁保险柜的钥匙（数据安全）始终在后端手里。
- 简化符号：`路由权限: beforeEach + addRoute 动态挂载`；`按钮权限: v-permission指令/v-if`；`真正防线: 后端接口校验`。

---

## 六、路由

### 27. 路由模式

**核心概念**
`vue-router` 主要有 `hash` 模式和 `history` 模式两种（Vue3 还有 `memory` 模式，用于非浏览器环境如SSR/测试）。

**关键要点**

| 维度 | hash 模式 | history 模式 |
|---|---|---|
| URL 形式 | `xxx.com/#/home` | `xxx.com/home` |
| 实现原理 | 监听 `window.onhashchange`，`#`后内容不发给服务器 | `history.pushState`/`replaceState`，真实修改URL但不刷新页面 |
| 兼容性 | 兼容性好，支持所有浏览器 | 需要 HTML5 History API（IE10+） |
| 部署要求 | 无需服务器额外配置 | 需服务器配置 fallback（见第25题），否则刷新404 |
| SEO | 较差（`#`后内容一般不被爬虫识别） | 相对较好 |

**应用场景**
对URL美观度和SEO有要求、且能控制服务器配置的项目用 `history`；纯静态托管/无法配置服务器（如某些对象存储直接托管）优先用 `hash`。

**深度拓展**
`pushState`/`replaceState` 是 HTML5 History API 的方法，可以在不刷新页面的前提下修改浏览器地址栏 URL 并新增/替换历史记录，`vue-router` 的 history 模式正是基于此实现无刷新路由跳转。

**速记法**
- 记忆框架：**hash靠#不发服务器，history靠pushState真改URL**。
- 关键词提炼："hash简单省心不用配服务器，history好看但要服务器兜底"。
- 联想记忆：hash模式像"内部楼层导览牌"（`#`后面的内容只在浏览器内部生效，不发给服务器/物业），history像"真的换了门牌号"（服务器会收到这个新地址的请求，得提前打好招呼/兜底）。
- 简化符号：`hash: #不发服务器，兼容好`；`history: 真实URL，需nginx fallback`。

### 28. 路由守卫

**核心概念**
路由守卫（Navigation Guards）是 `vue-router` 提供的在路由跳转过程中的钩子函数，用于控制导航行为（放行、重定向、取消），分为**全局守卫、路由独享守卫、组件内守卫**三个层级。

**关键要点**
- **全局守卫**：
  - `router.beforeEach((to, from, next) => {})`：全局前置守卫，最常用于登录鉴权。
  - `router.beforeResolve`：所有组件内守卫和异步路由组件解析完之后、导航确认前调用。
  - `router.afterEach`：导航完成后调用（无 `next`），常用于修改页面标题、埋点统计。
- **路由独享守卫**：在路由配置对象中定义 `beforeEnter`，只对该条路由生效。
- **组件内守卫**：`beforeRouteEnter`（此时组件实例还未创建，不能用 `this`，需用 `next(vm => {})` 访问实例）、`beforeRouteUpdate`（当前路由改变但组件被复用时，如动态参数变化）、`beforeRouteLeave`（离开该组件对应路由前，常用于"未保存提醒"）。
- Vue3 组合式API中可用 `onBeforeRouteLeave`/`onBeforeRouteUpdate` 函数式写法。

**应用场景**
登录鉴权拦截（`beforeEach`）、页面离开前未保存提示（`beforeRouteLeave`）、动态修改浏览器标题（`afterEach`）。

**深度拓展**
完整的导航解析流程顺序为：失活组件 `beforeRouteLeave` → 全局 `beforeEach` → 路由重用组件 `beforeRouteUpdate` → 路由独享 `beforeEnter` → 解析异步路由组件 → 激活组件 `beforeRouteEnter` → 全局 `beforeResolve` → 导航确认 → 全局 `afterEach` → DOM更新 → `beforeRouteEnter` 中 `next` 回调执行。

**应用场景补充**
多级权限拦截、路由切换loading进度条（NProgress常用 `beforeEach`开启、`afterEach`关闭）。

**速记法**
- 记忆框架：**全局（beforeEach/beforeResolve/afterEach）→ 独享（beforeEnter）→ 组件内（beforeRouteEnter/Update/Leave）**三级守卫。
- 关键词提炼："先全局把关，再单条路由把关，最后组件自己把关"。
- 联想记忆：路由守卫像"过安检"——先过机场大门安检（全局beforeEach），再到具体登机口二次检查（beforeEnter），最后登机前空乘再核对一次（组件内守卫）。
- 简化符号：`离开旧组件(beforeRouteLeave) → 全局(beforeEach) → 独享(beforeEnter) → 进入新组件(beforeRouteEnter) → 全局(beforeResolve) → afterEach`。

### 29. 路由懒加载

**核心概念**
路由懒加载（异步路由组件）指路由对应的组件不在首屏一次性全部打包进主 bundle，而是**访问到该路由时才动态加载对应的 JS chunk**，减少首屏加载体积。

**关键要点**
```js
// 静态引入（不推荐，会打进主包）
import Home from './views/Home.vue'

// 懒加载（推荐），webpack/vite 会自动做代码分割
const Home = () => import('./views/Home.vue')

const routes = [{ path: '/home', component: () => import('./views/Home.vue') }]
```
- 基于 ES 模块动态 `import()` 语法，构建工具（webpack/Vite/Rollup）识别后自动做**代码分割（code splitting）**，生成独立的 chunk 文件。
- 可以用魔法注释给分割出的 chunk 命名或分组：`import(/* webpackChunkName: "group-a" */ './views/A.vue')`，把多个路由打包进同一个 chunk 减少请求数。
- 结合 `defineAsyncComponent`（Vue3）可以进一步配置加载中/加载失败的展示组件、超时时间、延迟展示loading的时间。

**应用场景**
所有中大型项目的路由配置都应使用懒加载，避免首屏加载体积过大导致白屏时间增加。

**深度拓展**
过度拆分（每个路由都独立一个chunk）会导致请求数过多，可根据业务模块把相关性强的几个页面打包进同一个 chunk（通过 chunkName 分组），在"减少首屏体积"和"减少请求数量"之间做平衡。

**速记法**
- 记忆框架：**访问到才下载 = 按需加载**。
- 关键词提炼："import() 动态引入 = 自动代码分割"。
- 联想记忆：懒加载像"自助餐现点现做"——不是把所有菜（所有路由组件）都提前做好摆一桌子（打进主包），而是客人点到哪道菜（访问到哪个路由）才现做现上（动态加载对应chunk）。
- 简化符号：`component: () => import('xxx.vue')` = 懒加载路由。

### 30. 动态路由

**核心概念**
动态路由指**路径中包含可变参数**的路由（如 `/user/:id`），或**运行时根据权限动态添加/移除的路由**（`router.addRoute`）。两种含义在面试中都可能被问到，需要分清语境。

**关键要点**
- **动态路径参数**：`{ path: '/user/:id', component: User }`，匹配时 `id` 会被设置到 `route.params.id`；支持多段参数、可选参数（`:id?`）、通配符（Vue3中用 `:pathMatch(.*)*` 替代Vue2的 `*`）。
- **组件内获取参数**：`route.params`（选项式用 `this.$route.params`，组合式用 `useRoute().params`），配合 `props: true` 可以把路由参数以 props 形式传入组件，解耦组件与 `$route` 的直接依赖，更利于复用和单测。
- **动态添加路由（权限路由）**：登录后根据接口返回的权限数据，用 `router.addRoute(routeConfig)` 在运行时动态注册路由，常见于权限管理方案（见第26题）。
- 参数变化但复用同一组件时（如 `/user/1` 跳到 `/user/2`），组件不会重新创建，需要用 `watch(() => route.params.id, ...)` 或 `beforeRouteUpdate` 监听参数变化重新加载数据。

**应用场景**
详情页 `/product/:id`、多级动态权限菜单的运行时构建。

**深度拓展**
Vue Router 4（配合Vue3）的动态路由匹配基于全新的路径排序算法，能更智能地处理路由优先级冲突（如同时存在 `/user/:id` 和 `/user/new` 时，会优先匹配更具体的静态路径）。

**速记法**
- 记忆框架：**路径带参数（:id）+ 运行时动态注册（addRoute）**两种"动态"。
- 关键词提炼："URL里的变量是动态参数，权限路由是动态注册"。
- 联想记忆：动态路径参数像"填空题模板"（`/user/:id` 是模板，`123`是填进去的答案）；动态注册路由像"根据VIP等级临时开放的楼层权限"。
- 简化符号：`/user/:id → route.params.id`；`权限路由 → router.addRoute()`。

---

## 七、Vuex

### 31. Vuex 五大核心

**核心概念**
Vuex 是 Vue 官方的集中式状态管理方案，采用"单一状态树"，包含 **State、Getters、Mutations、Actions、Modules** 五大核心概念，规范了状态的读取和修改方式。

**关键要点**
- **State**：单一数据源，存放全局共享的状态，组件通过 `mapState`/`this.$store.state.xxx` 读取。
- **Getters**：对 state 的派生计算（类似 computed），有缓存，依赖变化才重新计算。
- **Mutations**：**唯一**允许直接修改 state 的地方，必须是**同步**函数，通过 `store.commit('mutationName', payload)` 触发，便于用 devtools 追踪每一次状态变更（时间旅行调试）。
- **Actions**：处理**异步**操作和复杂业务逻辑，内部通过 `commit` 触发 mutation 间接修改 state，通过 `store.dispatch('actionName', payload)` 触发。
- **Modules**：将 store 按业务模块拆分为多个子模块，每个模块拥有自己的 state/getters/mutations/actions，支持 `namespaced: true` 开启命名空间避免命名冲突。

**应用场景**
多组件共享、跨页面持久存在的全局状态：用户登录信息、权限数据、购物车、全局loading状态等。

**深度拓展**
Vuex 强制"单向数据流+集中管理"的意义在于**可预测性和可调试性**——所有状态变更都必须经过 mutation，配合 Vue DevTools 能清晰看到每次变更的来源和状态快照，便于排查"数据到底是哪里改的"这类难以追踪的bug。Vue3 生态中官方更推荐用 **Pinia** 替代 Vuex，去除了 mutations 概念（actions中可直接同步/异步修改state），API 更简洁，且对 TypeScript 支持更完善。

**速记法**
- 记忆框架：**State(数据) → Getters(计算) → Mutations(同步改) → Actions(异步改) → Modules(分模块)**。
- 关键词提炼："状态仓库，取数据用getters，改数据先commit(同步)，异步先dispatch再commit"。
- 联想记忆：Vuex像"银行流程"——State是账户余额，Getters是账单汇总（计算），Mutations是柜台柜员执行的每一笔存取款登记（必须同步、留痕可追溯），Actions是"网上银行发起转账申请"（可以异步处理，最终还是要柜员登记）。
- 简化符号：`dispatch(action，异步) → commit(mutation，同步) → 改state`。

### 32. mutation vs action

**核心概念**
两者都是修改 state 的途径，核心区别在于 **mutation 必须同步、直接修改state**，而 **action 可以异步、通过 commit mutation 间接修改state**。

**关键要点**

| 维度 | mutation | action |
|---|---|---|
| 是否能异步 | 不能（必须同步） | 可以（内部可写异步逻辑） |
| 修改state方式 | 直接修改 | 通过 `commit` 间接修改，自己不直接改 |
| 触发方式 | `store.commit()` | `store.dispatch()` |
| devtools追踪 | 每次commit都会被记录（时间旅行调试基础） | 本身不直接记录状态变更，最终落到commit上被记录 |

- 为什么 mutation 要求同步：Vuex 的 devtools 通过记录每次 mutation 前后的 state 快照实现"时间旅行"调试，如果 mutation 里有异步操作，无法确定状态变化的具体时间点，快照会失真。
- 复杂业务逻辑（如先请求接口，再根据结果决定commit哪个mutation，或连续commit多个mutation）应该写在 action 中。

**应用场景**
简单同步赋值（如 `SET_LOADING`）用 mutation；请求接口获取列表数据后更新state，用 action（内部 `commit('SET_LIST', data)`）。

**深度拓展**
Pinia 取消了 mutation 这一层，action 中可以直接修改 state（无论同步异步），本质是因为 Pinia 基于 Vue3 的响应式系统直接跟踪修改，不再需要"必须同步的mutation"这个人为约束来保证可追踪性。

**速记法**
- 记忆框架：**mutation=同步直接改，action=异步间接改（内部还是靠commit）**。
- 关键词提炼："mutation像柜台记账（必须当面同步办），action像客服受理（可以异步处理，最后还得转给柜台记账）"。
- 联想记忆：mutation是"银行柜员"（必须当场、同步完成一笔登记），action是"客服热线"（可以挂起等待，处理完再通知柜员commit登记）。
- 简化符号：`action(异步允许) --commit--> mutation(必须同步) --> state`。

### 33. Vuex 为什么需要

**核心概念**
当应用中有**多个组件共享同一状态**、且这些组件不存在直接的父子关系（或层级过深）时，单纯依靠 props/emit 逐层传递会变得非常繁琐且难以维护，Vuex 提供集中式的状态管理解决这一问题。

**关键要点**
- **解决的痛点**：多个非父子组件需要共享/同步同一份数据（如登录用户信息在导航栏、侧边栏、多个页面都要用到）；深层嵌套组件传递数据需要层层transmit props（prop drilling）；多个组件都可能修改同一状态，缺乏统一管理容易导致状态不可预测、难以追踪谁改的、何时改的。
- **Vuex的价值**：单一数据源保证状态一致性；严格的mutation规范使状态变更可追踪、可调试（时间旅行）；模块化管理使大型项目状态可维护；配合插件可实现状态持久化（如 `vuex-persistedstate`）。
- **不是所有场景都需要**：简单的父子组件通信用 props/emit 即可，小型项目引入 Vuex 反而增加复杂度，应根据项目规模权衡（Vue3中也可以用简单的 `reactive` + `provide/inject` 封装轻量级全局状态，不一定非要上 Vuex/Pinia）。

**应用场景**
中大型单页应用中，用户信息、权限、主题配置、多页面共享的业务状态（如电商购物车、多步骤表单）。

**深度拓展**
面试中常被追问"不用Vuex能不能实现全局状态"——可以，比如用一个单独的 `reactive` 对象作为简易 store 全局 `provide`，但缺少 Vuex/Pinia 提供的**规范约束（谁能改、怎么改）、devtools集成、插件生态（持久化/日志）**，团队协作和长期维护成本更高。

**速记法**
- 记忆框架：**多组件共享 + 非父子关系 + 状态需要可追踪** = 需要Vuex。
- 关键词提炼："状态要跨组件共享，还要能查清是谁改的"。
- 联想记忆：没有Vuex像"每个人自己记账，对不上账目"；有Vuex像"公司统一用一套财务系统记账，每一笔都有据可查（mutation记录），谁都能查账本（state）但只能通过财务流程（commit）改账"。
- 简化符号：`跨组件共享 + 可追踪可调试 ⇒ 上Vuex/Pinia`；`简单父子 ⇒ props/emit足够`。

---

## 八、数据与组件基础

### 34. 单向数据流 / 双向绑定

**核心概念**
Vue 的核心数据流是**单向**的（父传子通过 props，子改父通过 emit），而 `v-model` 提供的"双向绑定"其实是这套单向机制包装出来的语法糖，本质并未打破单向数据流。

**关键要点**
- **单向数据流原则**：子组件不能直接修改父组件传入的 props（Vue 会在非生产环境下发出警告），任何修改都应该通过 `emit` 事件通知父组件，由父组件决定是否更新数据后再传回子组件。这样保证了数据流向清晰可追溯，便于调试"数据到底是哪里改的"。
- **v-model 的本质**：`:value + @input` 组合，是"单向数据流"基础上包装出的语法糖，让"父传子 + 子通知父改"这套操作写起来像双向绑定，但底层依然遵守单向数据流。
- 双向绑定不等于"魔法般互相感知"，而是"父传子(数据) + 子通知父(事件)"两条单向链路的组合。

**应用场景**
理解为什么修改 props 会有警告；理解 v-model 内部机制以正确封装自定义表单组件。

**深度拓展**
React 只有单向数据流没有内置双向绑定语法糖，这也是 Vue 与 React 设计理念的一个显著差异——Vue 更强调"开发体验的便利性"，用编译期语法糖降低双向绑定场景下的代码量。

**速记法**
- 记忆框架：**单向数据流是基础规则，双向绑定是包装出来的语法糖**。
- 关键词提炼："数据往下传，事件往上抛，看似双向实则两条单行道拼出来的"。
- 联想记忆：像"信件来往"——父组件写信（props）给子组件，子组件不能直接改父组件的原件，只能"回信"（emit）告诉父组件"我建议改成这样"，父组件同意后再重新"寄信"过去，看起来像对话（双向），其实是两条独立的单向信件往来。
- 简化符号：`props(父→子)` + `emit(子→父)` = 看似双向，实为两条单向链路。

### 35. data 为什么必须是函数

**核心概念**
组件的 `data` 选项必须是一个**返回对象的函数**，而不能直接是一个对象字面量，目的是保证**每个组件实例都拥有独立的数据副本**，避免多个实例共享同一份数据引用导致互相污染。

**关键要点**
- 如果 `data` 是对象字面量，所有该组件的实例会共享同一个对象引用（JS 对象赋值是引用传递）——一个实例修改了 data，其他所有实例的数据都会跟着变化，这在组件可能被多次复用（多个实例）的场景下是灾难性的。
- `data` 写成函数后，每次创建组件实例时都会**重新调用该函数**，返回一个全新的对象，各实例数据互不影响。
- 特例：Vue 的根实例（`new Vue({data: {...}})`）本身全局唯一，不会被复用多份实例，因此根实例的 `data` 可以直接写成对象（虽然通常仍推荐写成函数保持一致性）。

**应用场景**
理解组件复用（如同一个组件在页面上渲染多次、或被 `v-for` 循环渲染多份）时为什么各自数据独立不串。

**深度拓展**
这一设计体现了 Vue 组件"类"与"实例"的关系——组件选项对象类似"类的定义"，`data` 函数类似构造函数中初始化实例属性的逻辑，每个 `new` 出来的实例都应该有独立的状态，这与面向对象编程中"实例属性不应共享引用"的原则是一致的。

**速记法**
- 记忆框架：**函数返回新对象 = 每个实例独立副本**。
- 关键词提炼："对象字面量会被共享引用，函数每次调用产生新对象"。
- 联想记忆：像"复印 vs 传阅原件"——data写成对象字面量就像大家传阅同一份原件（改了大家都看到变化），写成函数就像每人发一份复印件（各自修改互不影响）。
- 简化符号：`data: {...}` = 共享引用 ⚠️；`data() { return {...} }` = 独立副本 ✅。

### 36. data 和 methods 同名

**核心概念**
Vue 在初始化时会按顺序合并 `props → methods → data → computed` 等选项到组件实例上，若 `data` 和 `methods` 中定义了同名属性/方法，**Vue 会在开发环境下报错提示冲突**，因为它们都会被挂载到组件实例（`this`）的同一命名空间下，无法共存。

**关键要点**
- Vue2 源码初始化顺序：`initProps → initMethods → initData → initComputed → initWatch`；`initMethods` 时会检查方法名是否与 `props` 冲突；`initData` 时会检查字段名是否与 `methods`、`props` 冲突，冲突则 `warn` 提示"该字段已在methods中定义"。
- 本质原因：`this.xxx` 只有一个命名空间，`data` 的字段和 `methods` 的方法最终都是挂在同一个组件实例对象上的属性，同名会导致后声明的覆盖先声明的（实际表现为 methods 覆盖 data，但这是不被允许的用法，应避免）。

**应用场景**
排查"明明定义了方法，调用时却提示不是function"或"数据没有按预期变化"这类因命名冲突导致的诡异bug。

**深度拓展**
Vue3 组合式API的 `setup()` 返回一个对象暴露给模板，理论上同名会直接被后面的键覆盖（JS对象字面量特性），组合式API不像选项式API那样有专门的运行时冲突检测，因此更依赖开发者自身注意命名规范或使用ESLint规则约束。

**速记法**
- 记忆框架：**同一个this命名空间，data和methods不能同名**。
- 关键词提炼："都挂在this上，撞车了以谁为准不确定，Vue直接报错提醒"。
- 联想记忆：像"两个人抢同一个工位（this.xxx）"——data字段和methods方法都想用这个名字挂在实例上，公司（Vue）直接不允许注册重名工位，报错提示改名。
- 简化符号：`data.x` vs `methods.x` 同名 ⇒ ⚠️ 命名冲突警告。

### 37. computed 和 data 同名

**核心概念**
与"data和methods同名"原理相同——`computed` 最终也会被定义到组件实例（`this`）上，若与 `data` 中的字段重名，Vue 会在初始化阶段检测并给出冲突警告。

**关键要点**
- `initComputed` 阶段会检查 computed 的 key 是否已存在于 `data`/`props` 中，若存在则 `warn`：`computed property "xxx" is already defined in data`。
- 实际运行时表现：由于 `computed` 是在 `data` 之后初始化的，同名情况下 computed 的 getter 会覆盖 data 中原本的值定义在实例上的行为（但这属于不推荐、有警告的用法，不应该依赖这种覆盖顺序）。
- 正确做法：computed 应该是"从其他响应式数据派生而来的新名字"，不应与已有 data 字段重名。

**应用场景**
排查"computed属性没有按预期计算，反而好像直接被data的初始值覆盖了"这类问题。

**深度拓展**
这类"同名覆盖"问题在选项式 API 中之所以能被检测到，是因为 Vue2/3 选项式 API 在初始化阶段对 `data`、`props`、`methods`、`computed` 做了统一的**代理到 `this` + 冲突检测**的处理；而在组合式 API 的 `<script setup>` 中，变量名冲突会在**编译阶段直接报 JS 语法错误**（重复声明变量），比运行时警告更早暴露问题。

**速记法**
- 记忆框架：**同一this命名空间，computed不能和data重名**（与第36题同一原理，主体换成computed）。
- 关键词提炼："computed也挂在this上，和data撞名一样会被警告"。
- 联想记忆：延续"抢工位"比喻——computed这次是想用已经被data占用的工位名，Vue同样识别冲突并报警。
- 简化符号：`computed.x` vs `data.x` 同名 ⇒ ⚠️ "already defined in data"。

### 38. props 和 methods 同名

**核心概念**
同理，`props` 也会被代理到组件实例 `this` 上，且 `props` 的初始化**先于** `methods`，若 `methods` 中定义了与 `props` 同名的方法，Vue 会在初始化 `methods` 阶段检测到冲突并警告。

**关键要点**
- 初始化顺序：`initProps` 在 `initMethods` 之前，因此当 `initMethods` 遍历方法名时，会检查该名字是否已经存在于 `props` 中，若存在则 `warn`：`Method "xxx" has already been defined as a prop`。
- 这类冲突常见于"组件封装时，方法名不小心和父组件传入的prop重名"，例如都叫 `submit`。
- 解决：规范命名，给方法名加上动词前缀（如 `handleSubmit`）以降低和 props（通常是名词性的数据）冲突的概率。

**应用场景**
封装通用组件时的命名规范制定；排查"调用this.xxx()报错不是一个函数"类问题（因为props同名的xxx其实是数据不是函数，methods里定义的同名函数被判定冲突而未生效或被拦截警告）。

**深度拓展**
这类"同一this命名空间冲突检测"统一体现了 Vue2 选项式 API 设计上的一个特点：**所有选项最终都会挂到同一个组件实例上**，因此设计组件时需要有一个心智模型——`this` 下的所有 key（无论来自props/data/methods/computed）共享同一命名空间，命名时要整体考虑不能重复。

**应用场景补充**
代码规范/ESLint 中可配置"禁止methods、data、props之间同名"的自定义规则，在编码阶段而非运行时发现问题。

**速记法**
- 记忆框架：**props初始化在methods之前，同名时methods会被判定冲突**（与36/37同源，主体换成props）。
- 关键词提炼："props先占坑，methods重名会被警告"。
- 联想记忆：延续"抢工位"系列——props是"最早入职占好工位的人"，methods如果想用同一个工位名字，会被直接告知"这个工位（prop）已经有人了"。
- 简化符号：`props.x` 先注册 → `methods.x` 同名 ⇒ ⚠️ "already defined as a prop"。

### 39. `$` 和 `_` 开头变量

**核心概念**
Vue 实例上以 `$` 开头的属性/方法是 **Vue 暴露给开发者使用的公共API**（如 `$data`、`$props`、`$el`、`$refs`、`$emit`），以 `_` 开头的是 **Vue 内部使用的私有属性/方法**，两者都不会被加入到 `data` 的响应式代理遍历中，以避免和用户自定义数据冲突。

**关键要点**
- `data` 初始化时遍历用户定义的字段并做响应式代理，但会**过滤/跳过**以 `$` 或 `_` 开头的 key，不会把它们加入响应式系统，也不会代理到 `this` 上（如果用户在 `data` 中定义了 `_foo` 或 `$foo`，需要通过 `this.$data._foo` 访问，而不是 `this._foo`）。
- 这样设计是为了给 Vue 自身预留命名空间（如 `$el`、`$parent`、`$root`、`$refs`、`$slots`、`$attrs`；内部用 `_isVue`、`_uid`、`_data` 等），避免用户随意命名的数据字段（比如恰好也叫 `refs`）意外覆盖或冲突 Vue 内部/公共属性。

**应用场景**
理解为什么不能在 `data` 里随便定义一个叫 `$xxx` 或 `_xxx` 的字段并指望它像普通 data 一样响应式可用；阅读 Vue 源码时区分公共API（`$`）和内部实现（`_`）。

**深度拓展**
这是一种"命名空间隔离约定"，在很多框架/库设计中都很常见（如约定 `_` 前缀表示私有/内部使用，不保证API稳定性，可能随版本变化）；`$` 前缀则是稳定对外的公共契约，遵循语义化版本承诺。

**速记法**
- 记忆框架：**`$` = 对外公共API，`_` = 内部私有实现，两者都不进data响应式代理**。
- 关键词提炼："$对外用，_内部用，data里同名字段不会被自动代理到this"。
- 联想记忆：像"公司的对外客服电话（$开头，公开可拨打）和内部专线分机（_开头，员工内部用不对外公开）"——你自己起的名字如果撞上这两类专用号段，公司不会把它自动接入总机（不代理到this）。
- 简化符号：`$xxx` = 公共API（$el/$refs/$emit...）；`_xxx` = 内部私有（_uid/_data...）；`data`中同前缀字段 ⇒ 不自动代理到this。

### 40. Vue.delete

**核心概念**
`Vue.delete(obj, key)`（Vue2，组件内为 `this.$delete`）用于**响应式地删除对象的属性**，直接用 JS 的 `delete obj.key` 虽然能删除属性，但**不会触发视图更新**，因为 Object.defineProperty 无法拦截"属性被删除"这一操作。

**关键要点**
- 原生 `delete obj.key`：属性确实被删除了，但 Vue2 的响应式系统感知不到这个操作，视图不会自动更新。
- `Vue.delete`/`this.$delete`：内部先执行真正的删除，再手动触发该属性所在对象 Dep 的 `notify()`，通知所有相关 Watcher 更新视图。
- 对数组同理：`Vue.delete(array, index)` 等价于 `array.splice(index, 1)`，能触发响应式；而 `delete array[index]` 只会把该项置为 `empty`/`undefined`，不会改变数组长度也不会触发视图更新。

**应用场景**
需要在交互中动态删除对象的某个属性（如动态表单删除某个字段）且希望视图同步更新。

**深度拓展**
Vue3 中 Proxy 天然支持 `deleteProperty` 陷阱，原生 `delete obj.key` 就能被拦截并触发响应式更新，因此 Vue3 中 `delete`/`$delete` 已无必要保留（Vue3 仍保留了兼容API，但内部实现已简化为可选）。

**速记法**
- 记忆框架：**原生delete不通知，Vue.delete手动补通知**。
- 关键词提炼："删了但没人知道(delete)，Vue.delete删完还广播一下(notify)"。
- 联想记忆：像"员工离职但没通知HR系统"——原生delete是"人已经走了但花名册系统没同步（视图不更新）"，Vue.delete是"走的同时HR马上更新系统并通知相关部门（触发视图更新）"。
- 简化符号：`delete obj.key` = 删除但不触发更新 ⚠️；`Vue.delete/$delete` = 删除+notify ✅。

### 41. 数组响应式

**核心概念**
Vue2 由于 `Object.defineProperty` 无法拦截数组下标和 `length` 变化，专门通过**重写数组原型上的7个变异方法**并结合依赖通知机制，实现了数组常用操作的响应式；Vue3 用 Proxy 天然支持全部数组操作的拦截。

**关键要点**
- **Vue2 的实现方式**：创建一个继承自 `Array.prototype` 的新对象 `arrayMethods`，重写其中的 `push/pop/shift/unshift/splice/sort/reverse` 这7个会改变原数组的方法——在方法内部先调用原生方法执行真正的操作，再手动调用 `dep.notify()` 触发依赖通知；对于 `push`/`unshift`/`splice` 新增的元素，还会调用 `observeArray` 对新增项递归做响应式处理。
- 把响应式数组的 `__proto__` 指向这个重写后的 `arrayMethods`（若环境不支持 `__proto__` 则直接把这7个方法用 `Object.defineProperty` 挂载到数组实例上）。
- **不能响应式的操作**（Vue2）：`arr[index] = value` 直接下标赋值、直接修改 `arr.length`——这两种都不经过被重写的7个方法，因此需要用 `Vue.set`/`splice` 替代（同第5题）。
- **Vue3**：`reactive([])` 生成的数组是 Proxy，`get`/`set`/`deleteProperty` 陷阱天然覆盖下标读写、length变化、以及所有数组方法调用（数组方法内部本质也是读写下标和length，会被Proxy统一拦截），无需重写方法。

**应用场景**
理解 `this.list.push(item)` 为什么页面自动更新，而 `this.list[0] = newItem` 在 Vue2 中却不更新。

**深度拓展**
Vue2 只拦截"变异方法"而不拦截"返回新数组的方法"（如 `filter`/`map`/`concat` 返回新数组，需要重新赋值给响应式属性才能触发更新，这本身就是正常的赋值触发响应式，不需要特殊处理）。

**速记法**
- 记忆框架：**Vue2：重写7个变异方法+手动notify；Vue3：Proxy天然全覆盖**。
- 关键词提炼："7个方法是响应式正门，下标赋值/改length是后门（不响应）"。
- 联想记忆：延续第2题"小区门禁"比喻——Vue2数组像"只有7个正门装了门禁刷卡器（重写的方法），从围墙翻进去（下标赋值）保安（Vue）根本不知道你进来了"；Vue3像"整个小区装了全方位监控（Proxy），任何进出方式都逃不过监控"。
- 简化符号：`Vue2: push/pop/shift/unshift/splice/sort/reverse ✅响应式`；`arr[i]=x / arr.length=n ❌`；`Vue3: 全部✅`。

### 42. 自定义指令

**核心概念**
自定义指令（Custom Directives）用于对DOM元素进行底层操作的复用封装，当需要直接操作原生DOM（而非通过组件抽象）时使用，如自动聚焦、权限控制隐藏、图片懒加载、防抖点击等。

**关键要点**
- **Vue2 钩子函数**：`bind`（指令首次绑定到元素）、`inserted`（元素插入父节点后）、`update`（组件更新时）、`componentUpdated`（组件及其子节点更新完毕后）、`unbind`（指令解绑时）。
- **Vue3 钩子函数**（与组件生命周期对齐更直观）：`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeUnmount`、`unmounted`。
- 每个钩子接收 `(el, binding, vnode, prevVnode)` 参数，`binding` 中包含 `value`（指令绑定的值）、`arg`（参数，如 `v-my-directive:arg`）、`modifiers`（修饰符对象）。
- 注册方式：全局 `app.directive('focus', {...})` 或组件内 `directives: { focus: {...} }`；Vue3 `<script setup>` 中约定以 `vNameCase` 命名的变量会被自动识别为局部指令。

**应用场景**
`v-focus` 自动聚焦输入框、`v-permission` 按钮级权限控制（见第26题）、`v-loading` 加载遮罩、`v-lazy` 图片懒加载、`v-debounce` 按钮防抖。

**深度拓展**
自定义指令与组件的选择原则：需要**直接操作DOM底层行为**且不涉及复杂的模板结构/状态管理时用指令；需要**渲染UI结构**、管理内部状态、组合插槽时用组件。两者不是互斥关系，指令更轻量、更贴近DOM操作本身。

**速记法**
- 记忆框架：**指令 = 直接操作DOM的复用逻辑**，钩子函数对齐生命周期（mounted/updated/unmounted）。
- 关键词提炼："组件管结构和状态，指令管DOM底层行为"。
- 联想记忆：自定义指令像"贴在物品上的功能贴纸"——比如给杯子贴个"防烫贴纸"（v-focus贴纸让输入框自动聚焦），贴纸只负责一个具体的DOM级小功能，不改变杯子（元素）本身的结构。
- 简化符号：`el, binding(value/arg/modifiers)` → 钩子（mounted/updated/unmounted）直接操作`el`。

### 43. 自定义组件

**核心概念**
自定义组件是对UI结构、交互逻辑、状态的**封装复用单元**，通过 `props`（输入）、`emit`（输出）、`slot`（内容分发）构成完整的对外接口，是 Vue 应用组织代码的基本单位。

**关键要点**
- **组件注册**：全局注册（`app.component('MyComp', {...})`，适合高频通用组件如Button）、局部注册（在需要的组件内 `components: {...}` 声明，适合业务组件，利于tree-shaking减小打包体积）。
- **组件通信接口**：`props`（父传子，需声明类型/默认值/校验器 `validator`）、`emit`（子传父自定义事件，Vue3中可通过 `defineEmits` 做类型声明和校验）、`slot`（内容分发，见第44题）。
- **组件命名规范**：多单词命名（如 `TodoItem` 而非 `Todo`）避免和现有及未来的HTML元素冲突；文件名与组件名保持PascalCase或kebab-case一致。
- Vue3 `<script setup>` 语法糖下，组件默认自动注册（导入即可用，无需在 `components` 选项声明）。

**应用场景**
业务模块拆分为可复用的展示组件（Card/Table/Modal）与容器组件（页面级，负责数据请求和逻辑编排）。

**深度拓展**
组件设计应尽量遵循"高内聚低耦合"（详见第17题），并合理选择函数式组件（Vue3中 `<script setup>`天然编译为高效渲染函数，不再需要单独的functional组件概念）来减少无状态展示组件的实例开销。

**速记法**
- 记忆框架：**props输入 + emit输出 + slot内容分发 = 组件对外三大接口**。
- 关键词提炼："组件是带输入输出接口的功能单元"。
- 联想记忆：自定义组件像"一个功能齐全的电器"——props是电源输入接口（数据进），emit是报警灯/蜂鸣器输出信号（事件出），slot是可更换的配件卡槽（内容自定义）。
- 简化符号：`Props(in) + Emit(out) + Slot(content) = 组件接口`。

### 44. slot 插槽

**核心概念**
`slot` 是组件**内容分发**的机制，允许父组件向子组件的指定位置插入自定义模板内容，实现"结构由子组件定义、内容由父组件决定"的灵活复用，分为**默认插槽、具名插槽、作用域插槽**三类。

**关键要点**
- **默认插槽**：子组件中用 `<slot></slot>` 占位，父组件在子组件标签内直接写内容即可填充；子组件可以在 `<slot>` 标签内提供**默认内容**（父组件未传内容时兜底展示）。
- **具名插槽**：子组件 `<slot name="header"></slot>`，父组件用 `<template v-slot:header>` (简写 `#header`) 指定填充到对应命名插槽。
- **作用域插槽**：子组件在 `<slot :item="item">` 上绑定数据，父组件通过 `<template v-slot:default="slotProps">` 接收子组件传出的数据并在插槽内容中使用——这是"数据由子组件提供、结构由父组件决定"的关键机制，常用于封装Table/List等需要自定义单元格渲染的组件。
- 编译原理：插槽内容本质是父组件作用域下编译的一个函数（Vue3中插槽被编译为函数，子组件通过调用这个函数并传入数据来渲染，天然支持作用域插槽的数据传递）。

**应用场景**
封装Modal组件（header/body/footer具名插槽自定义各区域内容）、封装Table组件（作用域插槽自定义每列单元格的渲染方式）。

**深度拓展**
Vue3 中插槽内容的**编译作用域**规则很关键：插槽内容中能访问父组件作用域的数据，也能通过 `v-slot="slotProps"` 访问子组件通过slot传出的数据，但不能访问子组件内部的其他data——这体现了插槽"父组件提供结构模板、子组件提供渲染时机和数据"的分工。

**速记法**
- 记忆框架：**默认插槽（占位填内容）→ 具名插槽（分区域填内容）→ 作用域插槽（子传数据给父来渲染）**，复杂度递进。
- 关键词提炼："slot是留给父组件的自定义窗口，作用域插槽还能把子组件的数据递出来给父组件用"。
- 联想记忆：slot像"预制毛坯房的可装修区域"——默认插槽是"客厅留白，你不装修我给你摆个默认沙发（默认内容）"；具名插槽是"客厅、厨房、卧室分别留白（多个具名区域）"；作用域插槽是"精装房但把建材清单（数据）给你，你自己决定怎么装（渲染方式）"。
- 简化符号：`<slot>` 默认；`<slot name="x">` 具名；`<slot :data="x">` 作用域(子传数据给父渲染)。

### 45. 动态组件

**核心概念**
动态组件通过 `<component :is="组件名或组件对象">` 实现在同一个挂载点根据数据动态切换渲染不同的组件，常用于Tab切换、表单动态渲染等场景。

**关键要点**
- `:is` 的值可以是**已注册组件的名字字符串**，也可以是**组件的选项对象/组件构造器**本身（更常见、更灵活，尤其在使用 `<script setup>` 时直接绑定导入的组件变量）。
- 默认情况下切换动态组件时，旧组件会被销毁、新组件会被创建（走完整生命周期）；如果希望保留组件状态，需要用 `<keep-alive>` 包裹（见第15题）。
- 结合 `:key` 可以强制在同一个组件类型但传参不同时也重新创建实例（见第8题的深度拓展）。
- Vue3 中动态组件在原生HTML元素和自定义组件之间切换时，行为略有差异（原生标签部分不支持组件特有的一些机制，一般动态组件更多用于业务组件间切换）。

**应用场景**
Tab页签内容根据当前激活Tab渲染不同组件；表单设计器根据字段类型（input/select/date）动态渲染对应的表单控件组件。

**深度拓展**
动态组件配合异步组件（`defineAsyncComponent`）可以实现"按需加载 + 动态切换"，比如后台管理系统的Tab多开场景，每个Tab对应的组件在真正被激活展示时才异步加载。

**速记法**
- 记忆框架：**`<component :is="x">` = 同一个坑位插不同组件**。
- 关键词提炼："is指向谁就渲染谁，不加keep-alive每次切换都重新创建"。
- 联想记忆：动态组件像"电视机换台"——`<component>`是电视机外壳（固定挂载点），`:is`是当前选的频道（具体组件），换台默认会重启当前节目（销毁重建），除非开了"后台保持"功能（keep-alive）。
- 简化符号：`<component :is="CompA/CompB">` = 同插槽位动态切换渲染。

### 46. 递归组件

**核心概念**
递归组件是指组件在自己的模板中**引用自身**，用于渲染层级不确定、结构自相似的树形数据（如多级菜单、评论嵌套回复、组织架构树）。

**关键要点**
- 实现方式：组件需要有一个 `name` 选项（Vue2）或文件本身通过默认文件名注册（Vue3 `<script setup>` 中组件会自动以文件名作为组件名支持自身递归引用，无需手动声明 `name`，但显式声明更保险和清晰），模板中用该 `name` 标签引用自己：
```vue
<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.label }}
      <MenuTree v-if="item.children && item.children.length" :list="item.children" />
    </li>
  </ul>
</template>
<script>
export default { name: 'MenuTree', props: ['list'] }
</script>
```
- **必须有终止条件**：通过 `v-if` 判断是否还有子节点（`children.length > 0`）来决定是否继续递归渲染，否则会无限递归导致栈溢出（"Maximum call stack size exceeded"）。
- 数据结构通常是**树形数据**（每项包含 `children` 数组），递归组件天然契合这种自相似结构。

**应用场景**
多级联动菜单/侧边栏菜单树、评论区多级回复嵌套展示、组织架构图、文件目录树。

**深度拓展**
对于层级极深或节点数极多的树形结构（如上千节点的部门树），单纯递归组件渲染性能可能成为瓶颈，此时可考虑虚拟滚动树组件，或者先做数据层面的懒加载（点击展开时才请求/渲染子节点），而不是一次性递归渲染整棵树。

**速记法**
- 记忆框架：**组件调用自己 + 必须有终止条件（v-if判断有无子节点）**。
- 关键词提炼："自己长得像自己（树形结构），但一定要有'不再往下长'的判断条件"。
- 联想记忆：递归组件像"俄罗斯套娃"——每一层结构长得一模一样（同一个组件），但最里面那层必须是"实心的"（没有children，v-if判断为false，停止递归），否则套娃永远打不开到头（栈溢出）。
- 简化符号：`<Self v-if="hasChildren" :list="children" />`，终止条件必不可少。

---

## 附：全局速记总表

| 板块 | 一句话总纲 |
|---|---|
| 生命周期 | 创建管数据、挂载管DOM、更新管重渲染、销毁管清理 |
| 响应式 | 读时收集依赖（track），写时通知更新（trigger） |
| 虚拟DOM/Diff | 造模型→同层对比→key认身份→最小化操作真实DOM |
| nextTick | 数据变化异步批量更新，微任务优先排队执行回调 |
| computed/watch | 能算出来用computed（有缓存），要做事情用watch（无缓存） |
| v-if/v-show | if管生死（增删DOM），show管隐身（display切换） |
| keep-alive | 缓存实例，切走deactivated，切回activated |
| 组件通信 | 近亲props/emit，隔代provide/inject，全局Vuex/Pinia |
| scoped | 编译时打专属标签，属性选择器隔离样式 |
| 性能优化 | 少加载（懒加载分包）+ 少渲染（虚拟滚动/shallow）+ 少冗余（打包优化） |
| 路由模式 | hash不发服务器兼容好，history要服务器fallback配合 |
| 路由守卫 | 全局把关→独享把关→组件内把关，三级依次执行 |
| Vuex | state数据、getters计算、mutation同步改、action异步改、modules分模块 |
| 数组响应式(Vue2) | 7个变异方法是正门，下标/length赋值是不响应的后门 |
| 插槽 | 默认占位、具名分区、作用域插槽让子组件把数据递给父组件渲染 |

---
