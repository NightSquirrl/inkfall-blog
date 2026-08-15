---
title: React 面试题
tags:
  - React
  - 面试
---

## 1. Hook

### State Hook

```js
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
```



### Context Hook

全局封装

新建文件GlobalContext.jsx

```js
import { createContext, useEffect, useState } from "react";

// 创建 Context 对象
const GlobalContext = createContext();

// Mian
function GlobalContextProvider({children}) {
    const [test,useTest] = useState(false);
    const globalState = {
         test
    }
      return (
    <>
     <GlobalContext.Provider value={globalState}>{children}</GlobalContext.Provider>
    </>
}

export { GlobalContext, GlobalContextProvider };
```

在入口文件添加

```js
// 入口文件
import ReactDOM from "react-dom";
// 全局状态管理, GlobalContextProvider全局状态发布组件
import { GlobalContextProvider } from "**/store/GlobalContext";

// 全局路由
import Router from "xx/route";
// 全局主题组件
import GlobalTheme from "xx/theme/globalTheme";


// MAIN
ReactDOM.render(
  <GlobalContextProvider>
    <GlobalTheme>
      <Router />
    </GlobalTheme>
  </GlobalContextProvider>,
  document.getElementById("root"),
);

```

使用数据

```jsx
import { GlobalContext } from "**/store/globalContext";


export default function TestUseContext() {
  let {test,useTest } = useContext(GlobalContext);
}
```



### Ref Hook

> ref 允许组件保存一些不用于渲染的信息，比如 DOM 节点或 timeout ID。与状态不同，更新 ref ==不会重新渲染组件==。ref 是从 React 范例中的“脱围机制”。当需要与非 React 系统如浏览器内置 API 一同工作时，ref 将会非常有用。

### Effect Hook

> Demo React 18

```js
import { useEffect, useState } from "react";

function Son1() {
  useEffect(() => {
    console.log("[ son1 ] >");
    return () => {
      console.log("[ son1 no] >");
    };
  },[]);
  return <div>Son1</div>;
}

export default function App() {
  const [ctrSon, setCtrSon] = useState(true);

  useEffect(() => {
    console.log("[ Main ] >");
    return () => {
      console.log("[ Main no] >");
    };
  },[]);
  return (
    <div>
      App
      <button
        onClick={() => {
          setCtrSon(!ctrSon);
        }}
      >
        hidden son
      </button>
      {ctrSon && <Son1 />}
    </div>
  );
}

```

> 结果:
>
> 首次运行：
>
> Son1
>
> Main
>
> Son1 no
>
> Main no
>
> -
>
> 隐藏son
>
> son1 no
>
> 显示son
>
> son1

useLayoutEffect

执行时机是在React的提交阶段之后，但在浏览器实际绘制屏幕之前。这使得你可以同步地读取或更改DOM，然后让浏览器在下一次绘制时立即体现这些更改，从而避免不必要的闪烁或布局跳动。

### 性能 Hook

#### useMemo

1. 需要执行的一些计算处理工作，包裹在一个函数中
2. 一个依赖数组

```js
const allPrimes = React.useMemo(() => {
  const result = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      result.push(counter);
    }
  }
  return result;
}, [selectedNum]);

```

当这个组件第一次被渲染时，React 都会调用这个函数来执行这段计算逻辑，计算所有的质数。无论我们从这个函数中返回什么值，都会分配给 `allPrimes` 变量。

>React 会判断你传入的依赖数组，这个数组中的每个变量是否在两次渲染间 **值是否改变了** ，如果发生了改变，就重新执行计算的逻辑去获取一个新的值，否则不重新计算，直接返回上一次计算的值。
>
>**`useMemo` 本质上就像一个小的缓存，而依赖数组就是缓存的失效策略。**

#### **React.memo**

包裹着组件保护它不受到无关状态更新的影响

只会在收到新数据或内部状态发生变化时重新渲染

```js
const TestMemo = React.memo(Test);
```

#### useCallback

`useMemo` 和 `useCallback` 是一个东西，只是将返回值从 **数组/对象** 替换为了 **函数**。

```js
React.useCallback(function helloWorld(){}, []);

// ...功能相当于:
React.useMemo(() => function helloWorld(){}, []);
```

## 2. 非受控组件

> 可以简单的理解为没有使用react 进行数据的管理，而是直接操作DOM实现数据的更新。

## 3. 生命周期

- **组件挂载阶段**：
  - `constructor` 方法在组件创建时只调用一次，用于设置初始状态。
  - 然后是 `getDerivedStateFromProps`，它用于根据当前属性（props）派生出新的 state。
  - 接下来是 `render` 方法，它负责输出组件的虚拟DOM结构。
  - 最后，`componentDidMount` 方法在组件被插入到DOM后立即调用，这是发起网络请求等操作的理想时机。
- **组件更新阶段**：
  - 当组件的props或state发生改变时进入更新阶段。`getDerivedStateFromProps` 再次被调用，如果返回一个新的state，那么将触发更新。
  - `shouldComponentUpdate` 可以用来阻止不必要的渲染，通过比较新旧props和state来决定是否需要更新。
  - `render` 方法再次运行生成新的虚拟DOM，之后 `getSnapshotBeforeUpdate` 可以在DOM更新前获取一些信息。
  - 最后，`componentDidUpdate` 在组件完成更新后被调用，通常在这里进行DOM操作或者响应用户交互。
- **组件卸载阶段**：
- 当组件从DOM中移除时，会触发 `componentWillUnmount` 方法，这是执行必要的清理工作，如取消网络请求、清除定时器等操作的最佳时机。

## 4. Redux

> store
>
> ​	store.getState();
>
> state
>
> action
>
> dispatch
>
> reducer

storage

```js
import {createStore} from "redux";

const initialState = [];

const reducer = function(state = initialState,action) {
    switch(action.type) {
        case 1:
            return []
            break;
        default: // 很重要
            return [
                ...state
            ]
            break;
    }
}

const store = createStore(reducer)
export default sotre;
```

use

```js
import store from "xxx"

const action = {
    type:"",
    info:{
        
    }
}

store.dispatch(action)
```



















