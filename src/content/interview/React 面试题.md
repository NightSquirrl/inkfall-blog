---
title: React 面试题
tags: ["React", "interview"]
draft: false
description: React 面试题
category: interview
publishedAt: "2026-08-23"
---

> 每题包含【详细答案】（核心概念+原理+易错点）与【速记】（口诀/表格/代码片段）。按优先级分两大部分。

---

# 第一优先级

## 一、基础

### 1. React是什么？主要特点是什么？

**详细答案**

- React 是 Facebook（Meta）开源的​**用于构建用户界面的 JavaScript 库**，专注于视图层（View），不是完整框架。
- 核心特点：① 声明式编程（描述"是什么"而非"怎么做"）；② 组件化（UI 拆分为独立可复用单元）；③ 虚拟 DOM（提高渲染效率、跨平台能力，如 React Native）；④ 单向数据流（数据从父到子，可预测）；⑤ 一次学习，随处编写（Learn Once, Write Anywhere）。
- 易错点：React 不是 MVC 框架，只是 View 层方案；不自带路由、状态管理、请求库，都靠生态补齐。

**速记**

- 口诀：​  **"声明组件虚拟单向"**  （声明式、组件化、虚拟DOM、单向数据流）
- 类比：React 像"乐高积木"——用可复用的小组件拼出整个 UI。

---

### 2. React的核心思想是什么？

**详细答案**

- **UI **​ **=**​ ** f(state)**  ：界面是状态的函数，状态变了 UI 自动重新计算渲染，开发者不用手动操作 DOM。
- 配合虚拟 DOM 做 diff，只更新变化的部分，兼顾开发效率与性能。
- 组件化 + 单向数据流让大型应用的数据流向可预测、易调试。

**速记**

- 公式记忆：​**UI **​ **=**​ ** f(state)**  ，state 变 → render 函数重新执行 → 新 VDOM → diff → 更新真实 DOM。

---

### 3. React和Vue有什么区别？

**详细答案**

|维度|React|Vue|
| --------| -------------------------------| --------------------------------------------|
|编程范式|更偏函数式，JSX 全部用 JS 写|模板语法（HTML-like），更"渐进式"|
|响应式|手动 setState/useState 触发更新|数据劫持（Proxy/defineProperty）自动追踪依赖|
|状态管理|需要显式调用更新函数|data 修改后自动更新视图|
|生态|库自由组合（灵活但需自行选型）|官方全家桶（Vue Router、Pinia）更统一|
|组件写法|函数组件+Hooks 为主|Options API / Composition API|
|学习曲线|JSX+函数式思维，门槛略高|模板更接近传统前端，上手快|

**速记**

- 口诀：  **"React是JS写HTML（JSX），Vue是HTML写JS（模板+指令）"**

---

## 二、组件

### 4. React有几种声明组件的方式？

**详细答案**

- **函数组件**（Function Component）：普通函数，返回 JSX，配合 Hooks 管理状态，是现代 React 的主流写法。
- **类组件**​（Class Component）：继承 `React.Component`​，用 `this.state`、生命周期方法。
- 早期还有 `React.createClass`（已废弃）。

**速记**

```js
// 函数组件
function Foo() { return <div/> }
// 类组件
class Foo extends React.Component { render() { return <div/> } }
```

### 5. 类组件和函数组件有什么区别？

**详细答案**

- 语法：类组件用 `class extends React.Component`；函数组件是纯函数。
- 状态：类组件用 `this.state`​+`setState`​；函数组件用 `useState`。
- 生命周期：类组件有 `componentDidMount`​ 等；函数组件用 `useEffect` 模拟。
- `this`​ 指向：类组件常需 `bind`​；函数组件无 `this` 困扰。
- 性能与心智模型：函数组件配合 Hooks 逻辑复用更简单（自定义 Hook vs HOC/Render Props）。
- 官方推荐：新项目优先函数组件 + Hooks。

**速记**

- 口诀：  **"类组件this绑定烦，函数组件Hook来简"**

---

## 三、JSX

### 6. JSX和HTML有什么区别？

**详细答案**

- JSX 是 JS 的语法扩展，最终会被编译成 `React.createElement()` 调用，本质是 JS 对象。
- 属性命名用小驼峰：`class`​→`className`​，`for`​→`htmlFor`​，`onclick`​→`onClick`。
- JSX 中可以用 `{}` 嵌入任意 JS 表达式；HTML 不能。
- JSX 必须只有一个根节点（或用 Fragment `<>...</>`）。
- 自闭合标签必须写斜杠：`<img />`。

**速记表**

|HTML|JSX|
| -----------------| ---------------------|
|class|className|
|for|htmlFor|
|onclick|onClick|
|style\="color:red"|style\={{color:'red'}}|

### 7. React必须使用JSX吗？

**详细答案**

- 不是必须。JSX 只是语法糖，可以直接写 `React.createElement(type, props, children)` 达到同样效果。
- JSX 让代码更直观、接近 HTML 结构，是官方推荐但非强制的写法。

**速记**

```js
// 等价
<div id="a">Hi</div>
React.createElement('div', {id:'a'}, 'Hi')
```

### 8. JSX最终是如何转换成JavaScript的？

**详细答案**

- 由 Babel（`@babel/preset-react`​）在编译阶段把 JSX 转换成 `React.createElement()`​ 调用（React 17+ 也可用自动运行时 `jsx()`​/`jsxs()`​，不再需要显式 `import React`）。
- `createElement` 返回一个描述节点的普通对象（type、props、key 等），即"虚拟 DOM 节点"。

**速记**

- 流程：**JSX → Babel 编译 → createElement()/jsx() → 虚拟DOM对象 → 渲染真实DOM**

---

## 四、Props / State

### 9. props和state有什么区别？

**详细答案**

||props|state|
| --------| -----------------------| -----------------------------|
|来源|父组件传入|组件内部自己维护|
|可变性|只读，不能修改|可通过 setState/useState 修改|
|归属|组件对外的"接口"|组件私有数据|
|触发更新|父组件重渲染或props变化|自身状态变化|

**速记**

- 口诀：  **"props是别人给的信，state是自己管的账"**

### 10. 为什么props是只读的？

**详细答案**

- React 遵循单向数据流：数据只能从父组件流向子组件，保证数据流向可预测、可追踪。
- 若子组件能随意修改 props，会破坏父组件对自身状态的"单一数据源"控制，导致状态难以追踪、产生副作用和 bug。
- 想改变由 props 派生的数据，应通过回调函数通知父组件修改其 state，再重新传入新的 props（"状态提升"）。

**速记**

- 口诀：  **"谁的state谁做主，改数据请走回调"**

### 11. 为什么不能直接修改state？

**详细答案**

- 直接修改（如 `this.state.x = 1`）不会触发 React 的调度机制，视图不会更新。
- React 需要通过 `setState`​/`useState` 的 setter 来"登记"更新，从而进入调度、批处理、diff、渲染流程。
- 直接修改还可能破坏 `shouldComponentUpdate`​/`React.memo` 的浅比较（引用未变，认为没变化）。

**速记**

- 口诀：  **"不call set，React不知道你变了"**

### 12. React如何更新组件状态？

**详细答案**

- 调用 `setState(newState)`​（类组件）或 `setX(newValue)`（函数组件的 useState setter）。
- React 将更新加入队列，触发重新渲染（re-render），执行 diff，计算最小更新并提交到真实 DOM。
- 函数组件每次渲染是"重新执行整个函数"，用新的 state 值生成新的 JSX。

**速记**

- 流程：**setState → 加入更新队列 → 调度(Scheduler) → render阶段(diff) → commit阶段(真实DOM更新)**

### 13. setState是什么？

**详细答案**

- 类组件用于更新 `state` 并触发重新渲染的 API。
- 用法：`setState(partialState)`​ 或 `setState(updater, callback)`​，会与已有 state ​**浅合并**（对象合并，不是替换）。
- 不会立即修改 `this.state`，而是加入队列，异步（在合成事件/生命周期中）批量处理。

**速记**

```js
this.setState({count: this.state.count + 1}); // 对象方式（可能读到旧值）
this.setState(prev => ({count: prev.count + 1})); // 函数方式（推荐，拿到最新值）
```

### 14. setState是同步还是异步？

**详细答案**

- 在 React 的合成事件和生命周期函数中，setState 是​**异步**（批量更新，多次调用会被合并，最后统一执行一次 render）。
- 在 `setTimeout`​、原生 DOM 事件监听器、Promise 回调中，**React 17 及之前是同步**的（不批处理）；​**React 18 起引入自动批处理（automatic batching）**  ​，无论在哪里调用，只要不是 `flushSync` 包裹，都会被批量处理，表现为"异步"。
- 版本差异需明确标注：React 18 用 `createRoot`​ 时才有自动批处理；仍用旧版 `ReactDOM.render` 则保持 17 的行为。

**速记**

- 口诀：  **"合成事件里问同步都是异步，React18全场统一批处理"**

### 15. 多次setState调用会发生什么？

**详细答案**

- 同一事件循环内多次调用会被​**合并（batch）**  ，state 更新会按顺序合并到同一次更新中，最终只触发一次 re-render（而不是多次）。
- 若传对象字面量：`setState({count: count+1})`​ 多次调用，因为闭包里的 `count` 是同一个旧值，结果只加了一次。
- 若传函数式更新 `setState(prev => ...)`，React 会按顺序依次执行，得到累加效果。

**速记**

```js
// 只+1（对象方式，都读同一个旧count）
setState({count: count+1}); setState({count: count+1});
// +2（函数方式，拿最新prev）
setState(p=>({count:p.count+1})); setState(p=>({count:p.count+1}));
```

### 16. setState批量更新原理是什么？

**详细答案**

- React 内部维护一个更新队列（Fiber 上的 `updateQueue`​），事件处理函数执行期间，React 处于"批处理模式"（`isBatchingUpdates=true`），所有 setState 调用只是把更新对象 push 进队列，不立即执行 render。
- 事件处理函数执行完毕后，React 统一处理队列，做一次 diff+commit。
- React 18 的自动批处理是通过新的 Scheduler + `unstable_batchedUpdates` 机制扩展到了 Promise、setTimeout、原生事件等场景。

**速记**

- 类比：像"购物车"——事件执行期间只是把 setState "加入购物车"，事件结束后统一"结算"一次。

### 17. setState第二个参数有什么作用？

**详细答案**

- `setState(updater, callback)`​：第二个参数 `callback` 是一个函数，会在 state 更新完成且组件重新渲染之后执行，可用于拿到更新后的最新 DOM 或 state 做后续操作。
- 函数组件的 `useState`​ 没有这个回调参数，通常用 `useEffect` 监听 state 变化来替代。

**速记**

```js
this.setState({count:1}, () => { console.log('更新完成', this.state.count) });
```

---

## 五、生命周期

### 18. React生命周期有哪些？

**详细答案**分三阶段（以 React 16.3+ 为准）：

- **挂载（Mounting）**  ：constructor → getDerivedStateFromProps → render → componentDidMount
- **更新（Updating）**  ：getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
- **卸载（Unmounting）**  ：componentWillUnmount
- 错误处理：`static getDerivedStateFromError`​、`componentDidCatch`（Error Boundary 专用）。

**速记**

- 口诀：​  **"生（挂载）—长（更新）—死（卸载）"**  ，配合 "构造-渲染-挂载 / 派生-判断-渲染-快照-更新 / 卸载"

### 19. React16之后生命周期有什么变化？

**详细答案**

- React 16.3 引入 `getDerivedStateFromProps`​（静态方法，替代 `componentWillReceiveProps`​ 做 props→state 派生）和 `getSnapshotBeforeUpdate`​（替代 `componentWillUpdate`，在 DOM 更新前读取信息，如滚动位置）。
- 引入 Fiber 架构后，render 阶段可能被打断重来，因此标记了一批"不安全"的生命周期（详见下题）。

**速记**

- 新增两个：**getDerivedStateFromProps、getSnapshotBeforeUpdate**

### 20. React16废弃了哪些生命周期？为什么？

**详细答案**

- 废弃（加 `UNSAFE_`​ 前缀）：`componentWillMount`​、`componentWillReceiveProps`​、`componentWillUpdate`。
- 原因：Fiber 架构支持​**异步可中断渲染**，render 阶段（含这些 will 系列钩子）可能被多次调用或中途放弃重来，如果在这些钩子里做了副作用（如发请求、订阅），会导致重复执行、内存泄漏等不可预测问题，因此官方标记为不安全。

**速记**

- 口诀：  **"will系列不安全，Fiber可能重新来"**

---

## 六、Hooks

### 21. 为什么React推出Hooks？

**详细答案**

- 解决类组件中逻辑复用困难（HOC/Render Props 导致组件嵌套地狱、"包装地狱"）。
- 解决类组件中相关逻辑分散在不同生命周期方法里、无关逻辑却写在同一个方法里的问题（如 componentDidMount 里既有订阅又有请求）。
- 让函数组件也能拥有状态和副作用能力，避免 `this` 指向问题，代码更简洁。

**速记**

- 口诀：  **"复用难、逻辑散、this烦——三大痛点催生Hooks"**

### 22. Hooks解决了哪些问题？

**详细答案**

- **逻辑复用**：自定义 Hook 可以像函数一样自由组合、复用状态逻辑，无需修改组件树结构。
- **关注点分离**：可以按"功能"组织代码（一个 useEffect 处理一类副作用），而不是按生命周期阶段。
- **告别 this**：函数组件+闭包代替类的 this 绑定问题。

**速记**

- 同上题延伸："自定义Hook \= 可复用的状态逻辑单元"

### 23. Hooks有哪些使用规则？

**详细答案**

1. **只在最顶层调用 Hooks**，不要在循环、条件、嵌套函数中调用（保证每次渲染时 Hooks 调用顺序一致，React 靠调用顺序而非命名来关联 state）。
2. **只在 React 函数组件或自定义 Hook 中调用**，不要在普通 JS 函数中调用。

- ESLint 插件 `eslint-plugin-react-hooks` 可以自动检测违规。

**速记**

- 口诀：  **"顶层调用不循环，只在组件和Hook里面"**

### 24. useState是什么？

**详细答案**

- 让函数组件拥有状态的 Hook：`const [state, setState] = useState(initialValue)`。
- 惰性初始化：传函数 `useState(() => computeExpensive())`，只在首次渲染执行。
- setter 更新是**异步/批处理**的（同 setState），如果新值依赖旧值，建议用函数式更新 `setState(prev => prev+1)`。

**速记**

```js
const [count, setCount] = useState(0);
```

### 25. useEffect是什么？

**详细答案**

- 用于处理​**副作用**​（数据请求、订阅、手动 DOM 操作、定时器等）的 Hook，相当于 `componentDidMount`​+`componentDidUpdate`​+`componentWillUnmount` 的组合。
- 默认在每次渲染后（浏览器绘制之后，**异步**执行）都会执行；可通过依赖数组控制执行时机；返回一个函数作为清理（cleanup）逻辑。

**速记**

```js
useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer); // 清理函数
}, [dep]);
```

### 26. useEffect依赖数组有什么作用？

**详细答案**

- 决定 effect 何时重新执行：

  - 不传数组：每次渲染都执行。
  - 传空数组 `[]`：只在挂载时执行一次（模拟 componentDidMount）。
  - 传 `[a, b]`：仅当 a 或 b 变化时才重新执行（浅比较）。
- 易错点：闭包陷阱——effect 内使用的变量若未加入依赖数组，会拿到"过期"的旧值；应遵循 `eslint-plugin-react-hooks`​ 的 `exhaustive-deps` 规则。

**速记**

- 口诀：  **"空数组只跑一次，有依赖谁变跑谁"**

### 27. useEffect如何模拟生命周期？

**详细答案**

- `componentDidMount`​ ≈ `useEffect(fn, [])`
- `componentDidUpdate`​ ≈ `useEffect(fn)`（不传依赖数组，或依赖数组中包含对应变量）
- `componentWillUnmount`​ ≈ `useEffect(fn, [])`​ 中 `fn` 返回的清理函数

**速记表**

|类组件|Hooks等价写法|
| --------------------| ----------------------|
|componentDidMount|useEffect(fn, [])|
|componentDidUpdate|useEffect(fn) 或带依赖|
|componentWillUnmount|useEffect返回的cleanup|

### 28. useEffect和useLayoutEffect区别？

**详细答案**

- `useEffect`​：**异步**执行，在浏览器完成绘制（paint）之后才执行，不阻塞渲染，适合大多数副作用（请求、订阅、日志）。
- `useLayoutEffect`​：**同步**执行，在 DOM 更新后、浏览器绘制之前执行，会阻塞浏览器绘制，适合需要​**同步读取/修改 DOM 布局**（如测量元素尺寸后立刻调整样式，避免闪烁）的场景。
- 易错点：滥用 useLayoutEffect 会造成性能问题（阻塞渲染），大多数场景优先用 useEffect。

**速记**

- 口诀：  **"Effect画完再执行，LayoutEffect画之前抢先跑"**

### 29. useRef是什么？有什么作用？

**详细答案**

- 返回一个可变的 ref 对象 `{current: initialValue}`​，在组件整个生命周期内保持同一个引用，且​**修改**  **​**​ **​`.current`​**​**​**​ **不会触发重新渲染**。
- 主要用途：① 获取 DOM 元素引用（如 `inputRef.current.focus()`）；② 保存跨渲染周期的可变值（如定时器 id、上一次的 props/state），替代类组件的实例属性。

**速记**

```js
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();
```

### 30. useMemo是什么？

**详细答案**

- 缓存**计算结果**的 Hook：`const memoValue = useMemo(() => computeExpensive(a,b), [a,b])`，只有依赖变化时才重新计算，否则复用上次结果。
- 用于避免每次渲染都重复执行昂贵的计算逻辑。
- 注意：不要滥用，useMemo 本身也有开销，只在计算确实昂贵或需要保持引用稳定（如传给 memo 组件的对象）时使用。

**速记**

- 口诀：  **"useMemo存值，值不常变别重算"**

### 31. useCallback是什么？

**详细答案**

- 缓存**函数引用**的 Hook：`const memoFn = useCallback(fn, [deps])`，依赖不变时返回同一个函数引用。
- 常用于把回调函数传给做了 `React.memo` 优化的子组件，避免因父组件重渲染导致函数引用变化，从而使子组件不必要地重渲染。
- 本质上 `useCallback(fn, deps)`​ 等价于 `useMemo(() => fn, deps)`。

**速记**

```js
const handleClick = useCallback(() => doSomething(id), [id]);
```

### 32. useReducer是什么？

**详细答案**

- 类似 Redux 的状态管理 Hook：`const [state, dispatch] = useReducer(reducer, initialState)`，适合状态逻辑复杂、多个子值互相关联、或下一状态依赖前一状态的场景。
- `reducer(state, action)` 是纯函数，根据 action 返回新 state。
- 相比 useState，逻辑更集中、可测试性更好，也更方便配合 Context 做轻量级全局状态管理。

**速记**

```js
function reducer(state, action) {
  switch(action.type){ case 'inc': return {count: state.count+1}; default: return state; }
}
const [state, dispatch] = useReducer(reducer, {count:0});
dispatch({type:'inc'});
```

### 33. useImperativeHandle是什么？（重点）

**详细答案**

- 配合 `forwardRef`​ 使用，​**自定义暴露给父组件 ref 的实例值**，而不是把整个 DOM 节点/实例暴露出去，可以限制父组件只能访问指定的方法/属性，实现更好的封装。

**速记**

```js
const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));
  return <input ref={inputRef} />;
});
```

---

## 七、VDOM / Diff / Fiber

### 34. 什么是Virtual DOM？

**详细答案**

- 用 JS 对象来描述真实 DOM 结构的一种轻量级表示（树形结构，含 type、props、children）。
- 是 React 渲染流程中的"中间层"：状态变化时先生成新的 VDOM 树，再和旧 VDOM 树做 diff，计算出最小的真实 DOM 操作集合。

**速记**

- 类比：VDOM 像"施工蓝图"，先在图纸上改好，再一次性去工地施工（操作真实DOM），减少来回折腾。

### 35. Virtual DOM的工作原理是什么？

**详细答案**

1. state/props 变化 → 重新执行 render，生成新的 VDOM 树。
2. React 用 diff 算法比较新旧两棵 VDOM 树，找出差异（patch）。
3. 把差异一次性、批量地应用到真实 DOM 上（commit 阶段）。

- 好处：避免频繁直接操作真实 DOM（代价高），JS 层面的对比更快；同时提供了跨平台渲染能力（React Native 用同一套 VDOM 渲染到原生视图）。

**速记**

- 流程：**state变 → 新VDOM → diff对比旧VDOM → 计算patch → 批量更新真实DOM**

### 36. React Diff算法是什么？

**详细答案**

- React 的 diff 是基于三个假设的​**启发式（O(n)）算法**（而非传统树 diff 的 O(n³)）：

  1. **同层比较**：只比较同一层级的节点，不跨层级移动比较。
  2. **类型不同则整棵子树替换**：如果元素类型（div→span）不同，直接销毁旧的、创建新的，不再复用。
  3. **key 提示复用**：通过 key 标识列表中的元素，帮助 React 判断哪些节点可以复用、移动，而不是删除重建。

**速记**

- 口诀：  **"同层比、类型不同就重建、key帮你认出谁是谁"**

### 37. React reconciliation是什么？

**详细答案**

- Reconciliation（协调）是 React 用 diff 算法比较新旧 VDOM 树、决定如何高效更新真实 DOM 的整个过程，是"Diff算法"在 React 架构中的正式称呼。
- React 16 起，reconciliation 过程基于 Fiber 架构实现，可以被拆分成多个小任务、支持中断和恢复（可中断渲染）。

**速记**

- 一句话：**Reconciliation **​ **=**​ ** Diff算法的工程实现（在 Fiber 架构上跑）**

### 38. React Fiber是什么？

**详细答案**

- Fiber 是 React 16 引入的​**新的协调引擎（架构）**  ​，把之前基于递归、不可中断的 Stack Reconciler，改造成**链表结构 + 可中断/可恢复**的执行模型。
- 每个 Fiber 节点对应一个组件/DOM节点，保存了类型、props、state、指向父/子/兄弟的指针，构成一棵 Fiber 树。
- Fiber 让 React 可以按优先级调度任务（Scheduler），实现时间切片（time slicing），把渲染工作拆成小任务穿插执行，避免长时间阻塞主线程导致页面卡顿。

**速记**

- 口诀：  **"Fiber **​ **=**​ ** 可中断的链表任务树"**

### 39. Fiber解决了什么问题？

**详细答案**

- 旧版 Stack Reconciler 是同步递归、不可中断的，一旦开始就要"一口气"算完整棵树，遇到大型应用会长时间占用主线程，导致动画卡顿、输入延迟。
- Fiber 把渲染工作拆成一个个可中断的"工作单元"，配合 Scheduler 按优先级（如用户输入 \> 数据更新 \> 屏幕外内容）调度，实现了​**增量渲染**​、​**任务可暂停/恢复/丢弃**，从而支撑并发特性（Concurrent Features，如 React 18 的 Suspense、Transition）。

**速记**

- 一句话：**Fiber让React从"一次性算完"变成"分片可打断"，为并发模式铺路。**

### 40. React16 reconciliation和commit是什么？（重点）

**详细答案**

- Fiber 架构下渲染分两大阶段：

  - **Render/Reconciliation 阶段**​：可中断、可异步。构建 workInProgress Fiber 树，执行 diff，标记副作用（哪些需要增/删/改），期间**不会**操作真实 DOM，可以被打断重做。
  - **Commit 阶段**​：​**同步、不可中断**。把 render 阶段标记好的变更一次性应用到真实 DOM（含 DOM 操作和生命周期/Effect 调用），保证用户看到的界面是一致的、不会出现半更新状态。

**速记**

- 口诀：  **"Render阶段能暂停，Commit阶段一口气"**

---

## 八、Key / Render / 性能

### 41. React中的key有什么作用？

**详细答案**

- key 是 React 用来在 diff 列表节点时**唯一标识元素身份**的属性，帮助 React 判断元素是"新增/删除/移动/复用"，而不是全部销毁重建，从而提高更新效率、保持组件内部状态（如输入框光标）正确对应。

**速记**

- 口诀：  **"key是元素的身份证，diff靠它认亲人"**

### 42. 为什么不建议使用index作为key？

**详细答案**

- 当列表发生\*\*顺序变化（插入/删除/排序）\*\*时，index 会随位置变化而变化，导致 React 错误地复用组件实例（把状态、DOM 关联到错误的数据项），出现渲染错乱、表单内容错位、动画错误等 bug。
- 仅当列表​**是静态的、不会重新排序/增删**，或者没有唯一 id 时，才可以退而求其次用 index。
- 推荐使用数据本身的唯一稳定 id（如数据库主键）作为 key。

**速记**

- 口诀：  **"列表会变别用index，稳定id才是真key"**

### 43. render什么时候执行？

**详细答案**

- 首次挂载时执行一次。
- 之后每当 state/props 变化（或父组件重渲染导致子组件重渲染）、`forceUpdate` 被调用、或 Context 值变化被消费时，会重新执行 render。
- 注意：render 执行 ≠ 真实 DOM 一定更新，diff 后没有差异则不会操作 DOM。

**速记**

- 触发条件：**state变 / props变 / 父组件重渲染 / forceUpdate / Context变化**

### 44. React组件什么时候会重新渲染？

**详细答案**

- 自身 state 更新（useState/setState）。
- 接收到新的 props（父组件重渲染且没有做优化时，子组件默认也会重渲染，即使 props 没变）。
- 使用的 Context 的 value 发生变化。
- 父组件 `forceUpdate`。
- 易错点：父组件重渲染，默认会导致所有子组件也重渲染（除非用 `React.memo` 优化）。

**速记**

- 口诀：  **"自己变、爹变、Context变，都会重渲染"**

### 45. 如何阻止不必要的重新渲染？

**详细答案**

- 函数组件：`React.memo(Component)`​ 对 props 做浅比较，无变化则跳过渲染；配合 `useMemo`​/`useCallback` 保持传给子组件的对象/函数引用稳定。
- 类组件：`PureComponent`​（自动浅比较 props/state）或手写 `shouldComponentUpdate`。
- 拆分组件粒度，把频繁变化的状态"下沉"到局部组件，减少影响范围。
- 使用 key 合理管理列表；避免在 render 中创建新对象/内联函数（每次渲染都是新引用，会破坏 memo）。

**速记**

- 口诀：  **"memo挡props，useMemo/useCallback稳引用，PureComponent自动浅比较"**

### 46. React如何进行性能优化？

**详细答案**

- 渲染层面：`React.memo`​/`PureComponent`​/`shouldComponentUpdate`​ 减少无效渲染；合理拆分组件；用 `key` 优化列表 diff。
- 计算层面：`useMemo`​/`useCallback` 缓存计算和函数引用。
- 加载层面：代码分割（`React.lazy`​+`Suspense`）、路由懒加载、图片懒加载。
- 长列表：虚拟列表（react-window/react-virtualized）只渲染可视区域。
- 其他：避免不必要的内联对象/函数、合理使用 Context（避免大范围重渲染）、使用生产环境构建（关闭 devtools 检查开销）、Web Vitals 监控定位瓶颈。

**速记**

- 口诀：  **"减少渲染、缓存计算、按需加载、虚拟长列表"**

### 47. React.memo是什么？

**详细答案**

- 高阶函数，包裹函数组件后，对其 props 做​**浅比较**​，若 props 无变化则跳过本次渲染，直接复用上次渲染结果，是函数组件版的 `PureComponent`。
- 可传第二个参数自定义比较函数：`React.memo(Component, areEqual)`。
- 注意：只对 props 浅比较，如果 props 包含每次新建的对象/数组/函数，仍会判定为"变化"。

**速记**

```js
const MyComp = React.memo(function MyComp(props) { ... });
```

### 48. PureComponent是什么？

**详细答案**

- 类组件的基类，自动实现了对 `props`​ 和 `state`​ 的**浅比较**版 `shouldComponentUpdate`，若浅比较无变化则跳过渲染。
- 与 `React.memo` 是同一思路的类组件版本。
- 易错点：浅比较对嵌套对象、数组内部变化不敏感（引用没变就认为没变），需要配合不可变数据（Immutable）使用。

**速记**

- 一句话：**PureComponent **​ **=**​ ** Component + 自动浅比较的shouldComponentUpdate**

### 49. shouldComponentUpdate是什么？

**详细答案**

- 类组件的生命周期方法，在 render 之前调用，返回 `false` 可以阻止本次重渲染，是手动控制渲染性能的"开关"。
- 签名：`shouldComponentUpdate(nextProps, nextState)`，可以自定义任意比较逻辑（不仅限于浅比较）。

**速记**

```js
shouldComponentUpdate(nextProps) {
  return nextProps.value !== this.props.value; // 只有value变化才更新
}
```

### 50. useMemo/useCallback什么时候使用？

**详细答案**

- 计算成本高的场景（如大数组的排序/过滤）用 `useMemo` 缓存结果。
- 需要把函数作为 props 传给经过 `React.memo`​ 优化的子组件、或作为 `useEffect`​ 依赖时，用 `useCallback` 保持函数引用稳定，避免破坏子组件的memo优化或触发effect重复执行。
- 不要滥用：简单计算/普通函数没必要包裹，反而增加额外开销和代码复杂度。

**速记**

- 口诀：  **"贵的计算用Memo，传给memo子组件的函数用Callback"**

---

## 九、Context / 通信

### 51. Context是什么？

**详细答案**

- React 提供的跨层级数据传递方案：`React.createContext(defaultValue)`​ 创建，`<Context.Provider value={...}>`​ 提供数据，子孙组件用 `useContext(Context)`​（或 `Context.Consumer`）读取，不需要一层层通过 props 传递。

**速记**

```js
const ThemeContext = React.createContext('light');
<ThemeContext.Provider value="dark"><App/></ThemeContext.Provider>
const theme = useContext(ThemeContext);
```

### 52. Context解决什么问题？

**详细答案**

- 解决"prop drilling"（属性逐层透传）问题：中间层组件本不需要某数据，却要一层层往下传，代码冗余、难维护。
- 适合共享**全局性、变化不频繁**的数据，如主题、语言、登录用户信息。

**速记**

- 口诀：  **"跨层传值不用一层层递，Context直达目的地"**

### 53. 为什么不推荐滥用Context？

**详细答案**

- Context 的 value 一旦变化，​**所有消费该 Context 的组件都会重渲染**（即使它们只用到了 value 中的一小部分），容易造成大范围不必要的重渲染，性能隐患大。
- 会让组件的数据来源变得隐式（不像 props 那样一目了然），增加组件复用和测试的难度（脱离 Provider 无法独立测试）。
- 频繁变化的状态更适合用状态管理库（Redux/Zustand）或状态提升，Context 更适合低频更新的全局配置类数据。

**速记**

- 口诀：  **"Context一变全家重渲染，高频状态别乱用"**

### 54. React组件之间有哪些通信方式？

**详细答案**

1. 父传子：props
2. 子传父：父组件传回调函数给子组件，子组件调用
3. 兄弟组件：状态提升到共同父组件，或用 Context/事件总线
4. 跨层级：Context、状态管理库（Redux/MobX/Zustand）
5. 其他：ref（父组件直接调用子组件暴露的方法）、发布订阅模式

**速记**

- 口诀：  **"父子props+回调，兄弟提升到爹，跨层Context/仓库"**

### 55. 父子组件如何通信？

**详细答案**

- 父→子：通过 props 传递数据。
- 子→父：父组件把一个回调函数通过 props 传给子组件，子组件在合适时机调用该回调并传参，实现"反向"通信。

**速记**

```js
function Parent(){ const [v,setV]=useState(''); return <Child onChange={setV}/> }
function Child({onChange}){ return <input onChange={e=>onChange(e.target.value)}/> }
```

### 56. 兄弟组件如何通信？

**详细答案**

- **状态提升（Lifting State Up）**  ：把共享状态提到两个兄弟组件的最近公共父组件中，父组件通过 props 分别传给两个子组件（一个展示、一个修改）。
- 也可以用 Context 或全局状态管理库，或自定义事件总线（EventEmitter）。

**速记**

- 口诀：  **"兄弟没有直连线，数据交给共同的爹管"**

### 57. 非父子组件如何通信？

**详细答案**

- 层级较浅：状态提升到共同祖先。
- 层级较深/跨树：Context、全局状态管理库（Redux/Zustand/MobX）、或事件总线（发布订阅模式）。

**速记**

- 同56题，核心是"找共同的数据管理者"。

---

## 十、表单 / 事件 / Ref

### 58. 什么是受控组件？

**详细答案**

- 表单元素的值由 React 的 state 完全控制：`value`​ 来自 state，`onChange` 更新 state，形成"数据驱动视图"的单向数据流闭环。
- 优点：state 是唯一数据源，方便做校验、格式化、联动等逻辑。

**速记**

```js
<input value={val} onChange={e=>setVal(e.target.value)} />
```

### 59. 什么是非受控组件？

**详细答案**

- 表单元素的值由 **DOM 自身**维护，不受 React state 控制，需要时通过 `ref` 主动读取当前值（类似原生表单）。
- 常用 `defaultValue` 设置初始值。

**速记**

```js
const ref = useRef();
<input defaultValue="hi" ref={ref} />
// 需要时: ref.current.value
```

### 60. 受控组件和非受控组件区别？

**详细答案**

||受控组件|非受控组件|
| -------------| ----------------------| -----------------------------------------|
|数据源|React state|DOM 自身|
|取值方式|直接读 state|通过 ref 读取|
|实时校验/联动|容易|较麻烦|
|代码量|稍多（需写onChange）|较少|
|适用场景|复杂表单、需要即时反馈|简单表单、文件上传（file 类型必须非受控）|

**速记**

- 口诀：  **"受控靠state管着，非受控靠ref问DOM要"**

---

### 61. React事件和原生DOM事件有什么区别？

**详细答案**

- React 使用​**合成事件（SyntheticEvent）**  ：对原生事件的跨浏览器包装，抹平浏览器差异，API 统一。
- 事件绑定：React 17 之前事件委托到 `document`​，React 17+ 委托到​**应用根容器（root container）**  ，而非直接绑定到每个 DOM 节点。
- 命名：驼峰式（onClick vs onclick），传入的是函数引用而非字符串。
- 阻止默认行为需显式调用 `e.preventDefault()`​，不能靠 `return false`。

**速记**

- 口诀：  **"合成事件跨浏览器统一，委托挂载不逐个绑"**

### 62. 什么是合成事件？

**详细答案**

- SyntheticEvent 是 React 对浏览器原生事件的一层封装对象，具备与原生事件一致的接口（stopPropagation、preventDefault等），但行为在各浏览器间保持一致。
- React 17 之前合成事件对象会被​**复用（对象池）**  ​，异步访问需要 `e.persist()`；React 17 起取消了事件池，可以直接异步访问。

**速记**

- 一句话：**合成事件 **​ **=**​ ** 原生事件的跨浏览器统一包装**

### 63. React如何阻止默认行为？

**详细答案**

- 调用事件对象的 `e.preventDefault()`，与原生 DOM 事件用法一致（因为合成事件模拟了原生事件接口）。
- 注意不能用 `return false` 阻止（这在 jQuery 时代有效，但 React 无效）。

**速记**

```js
function handleSubmit(e) { e.preventDefault(); }
```

---

### 64. React中的ref有什么作用？

**详细答案**

- 提供一种绕过声明式数据流、**直接访问 DOM 节点或组件实例**的方式，常用于：聚焦输入框、测量 DOM 尺寸、触发动画、集成第三方 DOM 库。
- 函数组件本身没有实例，默认不能被加 ref（需要 `forwardRef` 转发）。

**速记**

```js
const ref = useRef(null);
<div ref={ref}></div>
```

### 65. forwardRef是什么？

**详细答案**

- 用于让**函数组件**能够接收父组件传来的 `ref`​，并把它转发到内部的某个 DOM 节点或子组件上（因为函数组件默认不暴露实例，直接在函数组件上写 `ref` 拿不到东西）。

**速记**

```js
const MyInput = forwardRef((props, ref) => <input ref={ref} {...props} />);
```

### 66. 为什么不推荐滥用Ref？（重点）

**详细答案**

- Ref 绕过了 React 的声明式数据流、直接操作 DOM/实例，容易破坏"UI由state驱动"的可预测性，增加调试和维护难度。
- 过度使用 ref 会让组件行为变得命令式、难以测试、难以复用，也容易和 React 的渲染时机产生竞态问题（如 ref 还未挂载就访问）。
- 官方建议：能用 state/props 声明式解决的，就不要用 ref；ref 仅用于必须直接操作 DOM 的场景（焦点管理、动画、第三方库集成）。

**速记**

- 口诀：  **"能声明就别命令，Ref是最后的手段"**

---

## 十一、条件渲染 / 列表 / Fragment / Portal / 错误处理 / 代码分割

### 67. JSX如何进行条件渲染？

**详细答案**

- 三元表达式：`{cond ? <A/> : <B/>}`
- 逻辑与：`{cond && <A/>}`​（注意 `cond`​ 为 `0` 时会渲染出 "0" 的坑）
- 提前 return：在函数组件内 `if (!data) return null;`
- IIFE 或 switch：复杂分支时用立即执行函数或独立函数封装。

**速记**

- 口诀：  **"非此即彼用三元，有才显示用&amp;&amp;，复杂逻辑提前return"**

### 68. JSX如何进行列表渲染？

**详细答案**

- 用数组的 `map()`​ 方法把数据转成 JSX 元素数组，每个元素需要唯一 `key`。

**速记**

```js
{list.map(item => <li key={item.id}>{item.name}</li>)}
```

### 69. Fragment有什么作用？

**详细答案**

- `<React.Fragment>`​（简写 `<>...</>`​）让组件可以返回多个子元素而​**不额外产生真实 DOM 包裹节点**（避免多余的 div 嵌套破坏样式/语义，如 table 中的 tr）。
- 简写 `<>`​ 不能带 key；需要 key 时（如在 map 中）必须用完整写法 `<React.Fragment key={id}>`。

**速记**

```js
<><Child1/><Child2/></>
```

### 70. Portal是什么？

**详细答案**

- `ReactDOM.createPortal(child, container)`​：把子节点渲染到 DOM 树中**指定的、组件层级之外**的容器节点，但在 React 组件树（事件冒泡、Context）中仍属于原来的父组件。
- 常用于弹窗、Modal、Tooltip，避免被父级的 `overflow:hidden`​/`z-index` 限制。

**速记**

```js
ReactDOM.createPortal(<Modal/>, document.getElementById('modal-root'))
```

### 71. Portal有哪些应用场景？（重点）

**详细答案**

- Modal/对话框、Tooltip/气泡提示、全局 Toast 通知、下拉菜单（Dropdown）——这些 UI 通常需要脱离父容器的层叠上下文/溢出限制，直接挂在 body 下，但逻辑上仍归属发起它的组件（事件依然能冒泡到 React 组件树的父级）。

**速记**

- 口诀：  **"Modal/Tooltip/Toast常驻body下，逻辑上还是原来的娃"**

### 72. Error Boundary是什么？

**详细答案**

- 一种特殊的​**类组件**​，通过实现 `static getDerivedStateFromError(error)`​（渲染降级 UI）和/或 `componentDidCatch(error, info)`​（记录错误日志）来捕获**子组件树**渲染期间的 JS 错误，避免整个应用崩溃白屏，展示兜底 UI。
- 局限：**无法**捕获自身的错误、异步代码（setTimeout/Promise）、事件处理函数中的错误、服务端渲染错误。函数组件本身不能直接实现 Error Boundary（需借助类组件或第三方库 `react-error-boundary`）。

**速记**

```js
class ErrorBoundary extends React.Component {
  state = {hasError:false};
  static getDerivedStateFromError(){ return {hasError:true}; }
  componentDidCatch(err, info){ logError(err, info); }
  render(){ return this.state.hasError ? <Fallback/> : this.props.children; }
}
```

### 73. React如何进行代码拆分？

**详细答案**

- **动态 import()**  ​：Webpack/Vite 等打包工具会自动把 `import()` 的模块拆成独立 chunk，按需加载。
- 配合 `React.lazy` 实现组件级的懒加载（见下题）。
- 路由级拆分：每个路由页面单独 `React.lazy` 引入，是最常见、收益最高的拆分粒度。

**速记**

- 口诀：  **"路由级拆分收益最大，import()配合lazy按需加载"**

### 74. React.lazy是什么？

**详细答案**

- `React.lazy(() => import('./Comp'))`​ 让组件实现​**懒加载**，只有真正渲染到该组件时才会去请求对应的代码 chunk，减小首屏 bundle 体积。
- 必须配合 `<Suspense fallback={...}>` 包裹使用，否则加载中会报错。
- 注意：`React.lazy` 目前只支持 default export 的组件。

**速记**

```js
const LazyComp = React.lazy(() => import('./Comp'));
<Suspense fallback={<Loading/>}><LazyComp/></Suspense>
```

### 75. Suspense是什么？

**详细答案**

- 一个包裹组件，用来在其子组件"尚未准备好"（如 `React.lazy`​ 加载中、React 18 的数据请求 Suspense）时，展示 `fallback` 占位内容，等准备好后自动替换为真实内容。
- React 16/17：主要用于代码分割（`React.lazy`）。
- React 18：`Suspense`​ 能力扩展到​**数据获取**​（配合支持 Suspense 的框架，如 Relay、Next.js 的 RSC/`use()`），并支持嵌套 Suspense、多个边界。

**速记**

- 口诀：  **"没准备好先占位，Suspense兜底不留白"**

---

# 第二优先级

## 一、Redux

### 76. Redux是什么？

**详细答案**

- 一个独立于 React 的**可预测状态容器**库，采用集中式 store 管理应用状态，遵循严格的单向数据流：View 触发 Action → Reducer 计算新 State → 更新 View。
- 常与 React 配合（`react-redux`），但本身可用于任何 JS 框架。

**速记**

- 口诀：  **"一个store，单向数据流"**

### 77. Redux三大原则是什么？

**详细答案**

1. **单一数据源**：整个应用状态存在一棵 state 树里（一个 store）。
2. **State只读**：唯一改变 state 的方式是 dispatch 一个 action 对象。
3. **纯函数修改**：reducer 必须是纯函数，接收旧 state 和 action，返回新 state，不直接修改（immutable）。

**速记**

- 口诀：  **"一个仓库、只读state、纯函数改"**

### 78. Redux由哪些部分组成？

**详细答案**

- **Store**：保存整个应用状态的对象。
- **Action**​：描述"发生了什么"的普通对象（含 `type` 字段）。
- **Reducer**​：纯函数，`(state, action) => newState`，定义状态如何变化。
- **Dispatch**：触发 action 的方法。
- 可选：​**Middleware**​（如 thunk/saga 处理异步）、​**Selector**（从 state 中派生数据）。

**速记**

- 口诀：  **"Store仓库、Action指令、Reducer加工、Dispatch发货"**

### 79. action是什么？

**详细答案**

- 一个普通 JS 对象，描述"发生了什么事情"，必须有 `type`​ 字段（通常是字符串常量），可携带 `payload` 等数据。
- 由 ​**Action Creator**​（返回 action 对象的函数）创建，通过 `dispatch(action)` 发出。

**速记**

```js
{ type: 'ADD_TODO', payload: {text: 'learn redux'} }
```

### 80. reducer是什么？

**详细答案**

- 纯函数：`(prevState, action) => newState`，根据 action.type 决定如何计算并返回新的 state（不修改原 state，返回新对象）。
- 必须无副作用（不发请求、不改传入参数、相同输入永远得到相同输出）。

**速记**

```js
function reducer(state=initial, action){
  switch(action.type){ case 'ADD': return {...state, count: state.count+1}; default: return state; }
}
```

### 81. store是什么？

**详细答案**

- 通过 `createStore(reducer)`​（或 Redux Toolkit 的 `configureStore`​）创建的对象，保存整个应用的 state 树，并暴露 `getState()`​、`dispatch(action)`​、`subscribe(listener)` 等方法。
- 一个应用通常只有一个 store。

**速记**

- 一句话：**store **​ **=**​ ** 状态容器 + dispatch/subscribe/getState 三大API**

### 82. Redux完整数据流是什么？

**详细答案**

1. 用户操作触发 `dispatch(action)`。
2. Store 把当前 state 和 action 一起传给 reducer。
3. reducer 计算并返回新的 state，store 用新 state 替换旧 state。
4. Store 通知所有订阅者（如 react-redux 的 connect/useSelector），触发相关组件重新渲染。

**速记**

- 流程图口诀：**View → dispatch(Action) → Reducer → 新State → 更新View**

### 83. Redux为什么是单向数据流？

**详细答案**

- 数据只能沿着 "View触发Action → Reducer处理 → 更新State → 驱动View" 这一个方向流动，View 不能直接修改 State，必须经过标准通道（dispatch+reducer）。
- 好处：状态变化可预测、可追踪（每次变化都有明确的 action 记录，配合 Redux DevTools 可以"时间旅行调试"）。

**速记**

- 同 React 单向数据流思想的放大版：  **"一切变化皆有迹可循"**

### 84. Redux middleware是什么？

**详细答案**

- 位于 `dispatch(action)`​ 和 `reducer`​ 之间的​**扩展点**，可以拦截、修改、延迟、记录、甚至取消 action，用于处理异步逻辑、日志、错误上报等横切关注点。
- 通过 `applyMiddleware(...)`​ 注册，本质是对 `dispatch` 函数的链式包装（洋葱模型）。

**速记**

```js
const store = createStore(reducer, applyMiddleware(thunk, logger));
```

### 85. redux-thunk是什么？

**详细答案**

- 最常用的异步中间件，允许 action creator 返回一个​**函数**​（而不仅是普通对象），该函数接收 `dispatch`​、`getState` 作为参数，可以在其中执行异步操作（如请求），完成后再 dispatch 真正的 action。

**速记**

```js
const fetchUser = () => async (dispatch) => {
  dispatch({type:'LOADING'});
  const res = await api.getUser();
  dispatch({type:'SUCCESS', payload: res});
};
```

### 86. redux-saga是什么？

**详细答案**

- 基于 **ES6 Generator** 函数的异步中间件，把异步逻辑抽离成独立的"saga"（副作用管理进程），通过 `yield`​ 声明式地描述副作用（如 `call`​、`put`​、`take`），更适合复杂异步流程（如取消请求、防抖节流、多个异步任务协调、长时间监听）。

**速记**

```js
function* fetchUserSaga(){
  const user = yield call(api.getUser);
  yield put({type:'SUCCESS', payload: user});
}
```

### 87. thunk和saga有什么区别？

**详细答案**

||redux-thunk|redux-saga|
| ------------------------------| ----------------| -----------------------------------|
|语法|函数/async-await|Generator函数|
|学习成本|低|较高|
|复杂异步流程（取消/竞态/防抖）|需手写较麻烦|内建effect（take/cancel等），更擅长|
|可测试性|一般|更好（generator易于纯函数式测试）|
|适用场景|简单异步请求|复杂业务流程编排|

**速记**

- 口诀：  **"thunk简单直给，saga擅长编排复杂副作用"**

### 88. Redux和MobX有什么区别？

**详细答案**

||Redux|MobX|
| -------------| -----------------------------------| ----------------------------------------------|
|编程范式|函数式，强调不可变数据|响应式，基于可观察对象（observable）|
|数据修改|必须通过 action+reducer，不可直接改|可以直接修改 observable 对象，自动追踪依赖更新|
|样板代码|较多（action/reducer/type）|较少，更简洁|
|可预测性/调试|强（纯函数、时间旅行调试）|相对弱一些（直接可变）|
|学习曲线|中等偏概念化|较平缓，更接近直觉|

**速记**

- 口诀：  **"Redux讲规矩（不可变+纯函数），MobX讲自由（直接改，自动追踪）"**

### 89. Redux和Context有什么区别？

**详细答案**

- Context 只是一个​**跨层级传值的通道**，本身不提供状态管理逻辑（怎么改数据还得自己写 useState/useReducer），且 value 变化会导致所有消费者重渲染，缺少精细化订阅（无法只订阅state的一部分而不重渲染）。
- Redux 是完整的状态管理方案，配合 `react-redux`​ 的 `useSelector`​ 可以做到​**按需订阅**（只有选中的那部分数据变化才触发对应组件重渲染），还有中间件、DevTools、时间旅行调试等生态能力。
- 简单场景（主题、语言）用 Context 足够；复杂、大规模、需要精细性能优化的全局状态适合 Redux。

**速记**

- 口诀：  **"Context是管道，Redux是自来水公司（含调度和精细订阅）"**

---

## 二、状态管理

### 90. 什么时候需要使用状态管理器？

**详细答案**

- 多个非父子/跨多层级组件需要共享和同步同一份状态，props 逐层传递变得繁琐（prop drilling）。
- 状态变化逻辑复杂（多处触发、互相依赖），单靠组件本地 state 难以维护、追踪。
- 需要状态持久化、跨页面共享、时间旅行调试、多人协作维护大型代码库等工程化需求。

**速记**

- 口诀：  **"传得深、逻辑乱、要追溯——该上状态管理器了"**

### 91. 状态管理器解决了什么问题？

**详细答案**

- 统一状态存储位置，避免状态分散在各组件、难以同步。
- 规范状态修改方式（如 Redux 的 action+reducer），使状态变化可预测、可追踪、可调试。
- 提供跨组件、跨层级共享状态的高效机制，避免层层透传。

**速记**

- 同 89 题延伸："让状态从'散养'变成'集中托管'"

### 92. 状态管理器的核心思想是什么？

**详细答案**

- **单一数据源** + **状态不可变（immutable）**   + ​**通过明确定义的方式（action/mutation）修改状态**，从而让状态变化可预测、可追踪、易于调试和测试。

**速记**

- 口诀：  **"一处存、不能改（只能换）、走流程"**

---

## 三、Router

### 93. React Router是什么？

**详细答案**

- React 生态中最主流的​**客户端路由库**，通过监听 URL 变化，动态渲染对应的组件，实现单页应用（SPA）内的"多页面"体验而无需刷新整个页面。

**速记**

- 一句话：**React Router **​ **=**​ ** URL 与组件的映射关系管理器**

### 94. React Router实现原理是什么？

**详细答案**

- 基于浏览器提供的两种能力监听/修改 URL 而不刷新页面：

  - **History 模式**​：利用 HTML5 `history.pushState`​/`replaceState`​ API + 监听 `popstate` 事件。
  - **Hash 模式**​：利用 URL 中 `#`​ 后的部分变化不会引起页面刷新，监听 `hashchange` 事件。
- 内部维护一个"路由表"，当 URL 变化时匹配对应规则，通过 Context 把当前路由信息传递下去，触发对应组件树的渲染。

**速记**

- 口诀：  **"改URL不刷新（pushState/hash），监听变化换组件"**

### 95. Link和a标签有什么区别？

**详细答案**

- `<a>`​ 标签点击会导致浏览器​**整页刷新**、重新加载所有资源（丢失 SPA 状态）。
- `<Link to="...">`​ 内部阻止了默认的页面跳转行为（`preventDefault`），改用 History API 修改 URL，由 React Router 拦截并只重新渲染匹配的组件，保持单页应用体验（不刷新、更快）。

**速记**

- 口诀：  **"a标签刷新一整页，Link只换该换的那一块"**

### 96. history模式是什么？

**详细答案**

- 基于 HTML5 History API 的路由模式，URL 形如 `/user/1`​（无 `#`），更美观、利于 SEO。
- 缺点：需要​**服务端配合配置**​（所有路径都 fallback 返回 `index.html`），否则用户直接刷新某个子路径或分享链接会导致服务器 404（因为服务端没有对应的真实资源）。

**速记**

- 口诀：  **"history模式好看但要服务器兜底(fallback)"**

### 97. push和replace有什么区别？

**详细答案**

- `push`​：往浏览器历史栈**新增**一条记录，用户可以点击"后退"返回上一个页面。
- `replace`​：**替换**当前历史栈顶的记录，不会新增，用户"后退"时会跳过被替换的这个页面（常用于登录后跳转、重定向，避免后退回到登录页）。

**速记**

- 口诀：  **"push是新增一页，replace是原地换页"**

### 98. React Router如何获取URL参数？

**详细答案**

- 动态路由参数（如 `/user/:id`​）：用 `useParams()`​ 获取 `{id: '1'}`。
- 查询字符串（如 `?page=2`​）：用 `useSearchParams()`​（v6）或手动解析 `location.search`。
- 路由状态（跳转时传递的额外数据）：`useLocation().state`。

**速记**

```js
const { id } = useParams();
const [searchParams] = useSearchParams(); searchParams.get('page');
```

### 99. React Router如何实现重定向？

**详细答案**

- 声明式：`<Navigate to="/login" replace />`​（v6）或旧版 `<Redirect to="/login"/>`（v5）。
- 编程式：`useNavigate()`​（v6）或 `useHistory().push()`（v5）在逻辑代码中主动跳转。

**速记**

```js
// v6
const navigate = useNavigate();
navigate('/login', { replace: true });
```

### 100. Switch有什么作用？

**详细答案**

- React Router **v5** 中的组件，包裹多个 `<Route>`​，只渲染**第一个匹配**到当前 URL 的路由，而不是把所有匹配的路由都渲染出来。
- **v6** 中已改名为 `<Routes>`​，且匹配逻辑更严格（默认精确匹配、内部用打分算法选最佳匹配），不再需要 `exact` 属性。

**速记**

- 版本差异：**v5用**​ **​**​ **​`<Switch>`​**​**​** ​  **+**​****​****​**​**​**​`exact`​**​**​**​  **，v6用**​ **​**​ **​`<Routes>`​**​**​** ​  **（自动精确匹配）**

### 101. React Router有哪些路由模式？

**详细答案**

- **BrowserRouter**​：History 模式，URL 无 `#`，需服务端配合。
- **HashRouter**​：Hash 模式，URL 带 `#`，纯前端即可运行，兼容性好但不利于 SEO。
- **MemoryRouter**：路由状态保存在内存中，不反映到浏览器地址栏，常用于测试或非浏览器环境（如 React Native）。

**速记**

- 口诀：  **"Browser要服务器配合、Hash自己就能跑、Memory只活在内存里"**

---

## 四、HOC

### 102. 什么是高阶组件HOC？

**详细答案**

- Higher-Order Component：一个​**函数**​，接收一个组件作为参数，返回一个新的、增强过的组件：`const EnhancedComp = withXXX(Comp)`。
- 本质是函数式编程"高阶函数"思想在组件层面的应用，用于​**逻辑复用**（在 Hooks 出现前是主流复用方案）。

**速记**

```js
function withLoading(Comp) {
  return function(props) {
    return props.loading ? <Spinner/> : <Comp {...props}/>;
  };
}
```

### 103. HOC有哪些应用场景？

**详细答案**

- 权限控制（未登录重定向）、加载状态包装（withLoading）、数据注入（如 `connect()`​ 把 store 数据注入 props）、日志/埋点、主题注入、错误边界包装等​**跨组件复用的横切逻辑**。

**速记**

- 口诀：  **"权限、loading、数据注入、埋点——都是HOC常见活"**

### 104. HOC属性代理是什么？

**详细答案**

- Props Proxy：HOC 通过​**渲染被包裹组件**，并操作传递给它的 props（增加、删除、修改 props，或渲染额外的 UI 包裹它）来实现功能增强，是最常见的 HOC 实现方式。

**速记**

```js
function withExtra(Comp){
  return (props) => <Comp {...props} extra="hi" />; // 代理并增强props
}
```

### 105. HOC反向继承是什么？（了解）

**详细答案**

- Inheritance Inversion：返回的新组件**继承自**被包裹的组件（`class Enhanced extends WrappedComponent`），从而可以重写/拦截其 render 方法、访问其实例的 state 等，实现更深度的控制（如渲染劫持）。
- 使用较少，因为耦合度高、灵活性和可维护性不如属性代理，且不支持函数组件（无实例可继承）。

**速记**

- 一句话：**反向继承 **​ **=**​ ** extends 被包裹组件（能改它的渲染结果，但耦合重）**

### 106. HOC有哪些优缺点？

**详细答案**

- 优点：逻辑复用不改变原组件代码，符合开放封闭原则；可以组合多个 HOC 叠加功能。
- 缺点：① **多层嵌套**导致组件树变深、调试时 DevTools 显示的组件名冗余（"包装地狱"）；② ​**props 命名冲突**​（多个 HOC 注入同名 props 互相覆盖）；③ ​**ref 无法透传**（需要额外用 forwardRef 处理）；④ 静态方法不会自动被复制，需手动 hoist-non-react-statics。
- Hooks 出现后，自定义 Hook 在很多场景下是更简洁的替代方案。

**速记**

- 口诀：  **"复用是真香，嵌套是真烦"——Hooks时代能用Hook就别用HOC**

---

## 五、动画 / 样式

### 107. React如何实现动画？

**详细答案**

- CSS 方案：直接用 CSS transition/animation，配合 class 切换（简单场景首选，性能好）。
- 库方案：`react-transition-group`​（管理进入/离开动画的生命周期）、`Framer Motion`​（声明式、功能强大，支持手势/布局动画）、`react-spring`（基于物理弹簧模型）。
- JS 方案：手动用 `requestAnimationFrame` 或结合 state 控制样式变化。

**速记**

- 口诀：  **"简单用CSS，复杂上Framer Motion/react-spring"**

### 108. React如何使用CSS？

**详细答案**

- 普通 CSS 文件直接 `import './App.css'`（全局生效，需注意类名冲突）。
- **CSS Modules**​（`.module.css`）：编译时自动生成局部作用域的唯一类名，避免全局污染。
- **CSS-in-JS**（styled-components、emotion）：用 JS 写样式，天然支持组件级作用域、动态样式（基于 props）。
- 内联样式：`style={{color:'red'}}`，用于简单动态样式，但不支持伪类/媒体查询。
- 原子化 CSS：Tailwind CSS，通过组合工具类快速构建样式。

**速记**

- 口诀：  **"全局CSS/CSS Modules局部/CSS-in-JS动态/内联简单/Tailwind原子"**

### 109. React如何使用Sass/Less？

**详细答案**

- 安装对应的 loader/插件（Create React App 内置支持 `.scss`​/`.sass`​，需装 `sass`​ 包；Vite 需装 `sass`​ 或 `less`）。
- 直接 `import './App.scss'`​，可结合 CSS Modules：`import styles from './App.module.scss'`。

**速记**

```bash
npm install sass  # CRA/Vite 均按此约定自动识别 .scss
```

---

## 六、工程化

### 110. React项目如何打包？

**详细答案**

- 主流用 ​**Webpack**​（CRA 默认）或 ​**Vite**（基于 esbuild+Rollup，开发体验更快）打包，将多个模块（JS/CSS/图片等）打包合并、压缩、做 Tree Shaking，生成生产环境静态资源（HTML/CSS/JS bundle）。
- 常见配置：入口(entry)、出口(output)、loader/plugin（处理 JSX/CSS/图片转译）、压缩（Terser）、代码分割（splitChunks）。

**速记**

- 口诀：  **"入口进、loader转、plugin加工、出口出"**

### 111. Webpack如何优化React项目体积？

**详细答案**

- **Tree Shaking**​：基于 ES Module 静态分析，移除未使用的代码（需保证依赖库支持 ESM/`sideEffects`配置）。
- **代码分割**​：`splitChunks`​ 把第三方库（vendor）与业务代码分开打包，配合 `React.lazy` 按路由拆分。
- **压缩**​：Terser 压缩 JS，`cssnano` 压缩 CSS，图片压缩（image-webpack-loader）。
- **按需引入组件库**​（如 Ant Design 的 `babel-plugin-import`），避免引入整个库。
- 用 `webpack-bundle-analyzer` 分析产物，定位体积大户。
- 开启 gzip/brotli 压缩、CDN 加速静态资源。

**速记**

- 口诀：  **"摇树、分包、压缩、按需引入、CDN加速"**

### 112. React如何根据环境使用不同API域名？

**详细答案**

- 用环境变量：CRA 用 `.env.development`​/`.env.production`​ 文件定义 `REACT_APP_API_URL`​；Vite 用 `.env.development`​/`.env.production`​ + `import.meta.env.VITE_API_URL`。
- 代码中通过 `process.env.REACT_APP_API_URL`​（CRA）或 `import.meta.env.VITE_API_URL`（Vite）读取，打包时会被静态替换为对应环境的值。

**速记**

```
# .env.production
REACT_APP_API_URL=https://api.prod.com
```

### 113. 如何关闭生产环境sourcemap？

**详细答案**

- CRA：在打包命令前设置环境变量 `GENERATE_SOURCEMAP=false`​，或写入 `.env` 文件。
- Vite：在 `vite.config.js`​ 中设置 `build: { sourcemap: false }`。
- 目的：减小构建体积、避免暴露源码结构（安全考虑），但会增加线上报错定位难度（可结合 Sentry 等单独上传 sourcemap 用于错误还原）。

**速记**

```bash
GENERATE_SOURCEMAP=false npm run build
```

---

## 七、TypeScript

### 114. React如何结合TypeScript？

**详细答案**

- 文件后缀改为 `.tsx`（含 JSX 的 TS 文件）。
- 给组件的 props、state 定义类型（interface/type），函数组件可用 `React.FC<Props>`​（但社区现在更推荐直接写 `function Comp(props: Props)`，因为 FC 隐式包含 children 且对泛型支持不够灵活）。
- 事件类型、Hooks 的泛型（`useState<number>()`）等都能获得类型推导和检查。

**速记**

```tsx
interface Props { name: string; }
function Hello({name}: Props){ return <div>{name}</div>; }
```

### 115. React中如何定义Props类型？

**详细答案**

```tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;      // 可选属性
  children?: React.ReactNode; // 子元素
}
function Button({text, onClick, children}: ButtonProps) { ... }
```

- 用 `interface`​ 或 `type`​ 均可；可选属性加 `?`​；子元素类型用 `React.ReactNode`。

**速记**

- 口诀：  **"interface定形状，? 表示可选，children用ReactNode"**

### 116. React中如何定义State类型？

**详细答案**

- 函数组件：`useState<Type>(initialValue)`，简单类型通常可自动推导，复杂/联合类型建议显式指定。
- 类组件：`class Comp extends React.Component<Props, State>`，State 作为第二个泛型参数。

**速记**

```tsx
const [user, setUser] = useState<User | null>(null);
class Comp extends React.Component<Props, {count: number}> { ... }
```

---

## 八、SSR

### 117. React如何实现服务端渲染？

**详细答案**

- 原生方式：Node 服务端用 `ReactDOMServer.renderToString(<App/>)`​ 生成 HTML 字符串发给浏览器，浏览器再用 `hydrateRoot`​（React 18）/`ReactDOM.hydrate`（旧版）"激活"（hydration）已有 DOM，绑定事件，使其变为可交互的 React 应用。
- 工程化方案：直接用 ​**Next.js**（最主流），内置路由、SSR/SSG/ISR、数据获取等能力，避免手写 SSR 基建。

**速记**

- 流程：**服务端renderToString生成HTML → 浏览器hydrate激活 → 可交互**

### 118. React SSR有什么优缺点？（了解）

**详细答案**

- 优点：首屏更快（用户直接看到已渲染内容，不用等 JS 下载执行）、利于 SEO（爬虫能直接抓到内容）。
- 缺点：服务端压力增大（需要 Node 服务器渲染）、实现复杂度高（同构代码、数据预取、hydration 不匹配问题）、TTI（可交互时间）可能因为要等 hydration 完成而并不比 CSR 快很多。

**速记**

- 口诀：  **"SSR首屏快、利SEO，但服务器压力大、实现复杂"**

---

## 九、测试

### 119. React如何进行单元测试？

**详细答案**

- 主流工具：​**Jest**​（测试运行器+断言库）+ ​**React Testing Library**（RTL，推荐"像用户一样测试"，通过查询渲染出的 DOM 内容、模拟用户交互来断言，而不是测试组件内部实现细节）。
- 也可用 Enzyme（较老，偏向测试组件内部状态/实例，社区已逐渐转向 RTL）。
- 典型流程：`render(<Comp/>)`​ → `screen.getByText/getByRole`​ 查找元素 → `fireEvent`​/`userEvent`​ 模拟交互 → `expect(...).toBeInTheDocument()` 断言。

**速记**

```jsx
test('渲染文本', () => {
  render(<Hello name="Tom"/>);
  expect(screen.getByText('Tom')).toBeInTheDocument();
});
```

---

## 十、UI库

### 120. React中使用Ant Design有什么优缺点？

**详细答案**

- 优点：组件丰富、企业中后台场景开箱即用、设计规范统一、生态成熟（含表单、表格等复杂组件）、文档完善。
- 缺点：样式定制/深度主题定制相对繁琐（虽然新版基于 CSS-in-JS 的 Token 系统已改善）；整体偏"中台风"，不适合强调独特品牌视觉的 C 端产品；包体积较大，需按需引入优化。

**速记**

- 口诀：  **"中台首选很好用，C端个性化要费功夫"**

### 121. React常见UI库有哪些？（了解）

**详细答案**

- **Ant Design**：企业中后台首选。
- **Material UI (MUI)**  ：遵循 Google Material Design 规范。
- **Chakra UI**：轻量、可组合、易定制，开发体验好。
- **Semi Design**：字节跳动出品。
- **shadcn/ui**：基于 Radix+Tailwind，代码直接拷贝进项目而非作为依赖安装，高度可控。

**速记**

- 口诀：  **"中台Antd、谷歌风MUI、灵活Chakra、字节Semi"**

---

## 十一、表单库

### 122. Formik是什么？（了解）

**详细答案**

- 一个 React 表单管理库，封装了表单状态（值、错误、touched）、校验（可配合 Yup）、提交流程，减少手写受控表单的样板代码。

**速记**

- 一句话：**Formik **​ **=**​ ** 表单state+校验+提交的一站式封装**

### 123. React常见表单库有哪些？（了解）

**详细答案**

- **Formik**：较早、生态成熟。
- **React Hook Form**：性能更好（基于非受控+ref，减少重渲染），目前更主流的选择。
- 校验库常搭配 **Yup** 或 ​**Zod**。

**速记**

- 口诀：  **"重性能选React Hook Form，配合Yup/Zod做校验"**

---

## 十二、国际化

### 124. React Intl是什么？（了解）

**详细答案**

- FormatJS 生态下的 React 国际化库，提供 `<FormattedMessage>`​、`useIntl()` 等 API，处理多语言文案、日期/数字/货币格式化等。

**速记**

- 一句话：**React Intl **​ **=**​ ** 多语言文案 + 格式化工具集**

### 125. React如何实现国际化？

**详细答案**

- 常用库：`react-intl`​、`react-i18next`（i18next 生态）。
- 基本思路：维护多语言 key-value 文案文件（如 `zh.json`​/`en.json`​），通过 Context 提供当前语言环境，组件用 `t('key')`​ 或 `<FormattedMessage id="key"/>` 取文案，切换语言时更新 Context 触发重渲染。

**速记**

```js
// react-i18next
const { t } = useTranslation();
<div>{t('welcome')}</div>
```

---

## 十三、Immutable

### 126. Immutable是什么？

**详细答案**

- 不可变数据：一旦创建就不能被修改，任何"修改"操作都会返回一个**新的**对象/数组，原数据保持不变。
- React 生态中常用 `Immutable.js`​ 库，或直接用展开运算符/`Object.freeze`/Immer 库实现"事实上的不可变"。
- 好处：配合 `PureComponent`​/`React.memo`​ 的浅比较，能通过**引用是否变化**快速判断数据是否真的变了，提升性能判断的准确性和效率。

**速记**

- 口诀：  **"要改就换新的，不改原来的"**

### 127. Immutable原理是什么？（了解）

**详细答案**

- `Immutable.js`​ 内部采用​**持久化数据结构（Persistent Data Structure）**  ​，基于​**结构共享（Structural Sharing）**  ：修改数据时只创建被改动路径上的新节点，其余未变化的部分节点仍然共享引用，而不是整体深拷贝，兼顾了不可变语义和内存/性能效率（类似 Git 的版本树思想）。

**速记**

- 类比：像 Git 的树结构——改一个文件，只有那条路径的节点是新的，其余分支共享旧引用。

---

## 十四、长列表 / 虚拟化

### 128. React Windowing是什么？

**详细答案**

- "窗口化"技术，即​**虚拟列表**：只渲染当前视口（viewport）内可见的少量 DOM 节点，滚动时动态计算并替换渲染内容，而不是一次性渲染全部数据，从而大幅降低长列表场景下的 DOM 节点数量和渲染开销。
- 代表库：`react-window`​（轻量）、`react-virtualized`​（功能更全但更重）、`@tanstack/react-virtual`。

**速记**

- 一句话：**Windowing **​ **=**​ ** 只渲染"看得见"的那一小段列表**

### 129. React如何提高长列表性能？

**详细答案**

- **虚拟列表**（核心手段）：如上题，只渲染可视区域及少量缓冲项。
- 合理使用 `key`，避免 index 导致的重复渲染问题。
- 列表项组件用 `React.memo` 包裹，避免父组件重渲染引起所有列表项重渲染。
- 分页/懒加载/无限滚动，减少一次性数据量。
- 避免在列表项内做昂贵计算，必要时用 `useMemo` 缓存。

**速记**

- 口诀：  **"虚拟化是根本，memo防连坐，分页减总量"**
