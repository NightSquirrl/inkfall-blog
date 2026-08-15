---
title: redux
tag:
  - React
  - 前端
  - redux
---
## 老版本

> 1. 安装必要的包：redux、react-redux。
> 2. 创建action types和action creators。
> 3. 编写reducer函数来处理状态变化。
> 4. 创建store，将reducer传入。
> 5. 在React应用的顶层组件中使用Provider，并传入store。
> 6. 在子组件中连接Redux，读取状态和派发action。

### 依赖

```javascript
redux react-redux
```

### 案例

#### 1. 定义 Action Types 和 Action Creators

文件位置:`src/actions/index.ts`​

```javascript
// 定义操作类型
// 只是一种规范性的常量定义,代表本次操作事件的类型也就是 action type 与下方的 type 一一对应
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADDTWO = "ADDTWO";

// Action 创建函数
// 用来实现功能的配置函数
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const addTwo = () => ({ type: ADDTWO,value:2 });
```

#### 2. 编写 Reducer

文件位置:`reducers/index.ts`​

```javascript
import { INCREMENT, DECREMENT, ADDTWO } from "../actions";

// 初始状态
const initialState = {
  count: 0,
};

// Reducer 处理状态变化
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case ADDTWO:
      return { ...state, count: state.count + action.value };
    default:
      return state;
  }
};

export default counterReducer;
```

#### 3. 创建 Redux Store

```javascript
import { createStore } from "redux";
import counterReducer from "./reducers";

// 创建 Store
const store = createStore(counterReducer);

export default store;
```

##### 4. Provider

配置`main.ts`​

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// 用 Provider 包裹根组件
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

##### 5. App.vue 主组件

```javascript
import React from "react";
import Counter from "./components/Counter";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
```

#### 6. 计数器 DEMO 组件

文件位置:`components/Counter.js`​

```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../actions";

function Counter() {
  // 从 Redux Store 获取状态
  const count = useSelector((state) => state.count);
  // 获取 dispatch 函数
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Counter;
```

### 详细解释

1. **Redux 三大核心**：

    * **Store**: 全局状态容器，通过 `createStore`​ 创建。
    * **Actions**: 描述状态变化的普通对象，必须包含 `type`​ 字段。
    * **Reducers**: 纯函数，接收当前状态和 action，返回新状态。
2. **React-Redux 关键 API**：

    * ​`<Provider>`​: 包裹根组件，将 store 传递给所有子组件。
    * ​`useSelector`​: 从 store 中选择需要的状态。
    * ​`useDispatch`​: 获取 `dispatch`​ 函数，用于触发 action。
3. **工作流程**：

    1. 用户点击按钮，触发 `dispatch(increment())`​。
    2. Redux Store 将 action 发送给 reducer。
    3. Reducer 根据 action 类型更新状态。
    4. 组件通过 `useSelector`​ 检测到状态变化，自动重新渲染。

### 扩展建议

* **异步操作**: 使用 `redux-thunk`​ 或 `redux-saga`​ 处理 API 请求。
* **多个 Reducer**: 通过 `combineReducers`​ 合并多个 reducer。
* **Redux DevTools**: 安装浏览器插件，监控状态变化。
* ```javascript
  // 启用 Redux DevTools
  const store = createStore(
    counterReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  ```

‍

## 新版本:`@reduxjs/toolkit`​

### 依赖

```javascript
@reduxjs/toolkit react-redux
```

### 案例

#### 创建 Slice（核心单元)

文件位置:`src/store/counter/slice.ts`​

```javascript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // 自动生成 action：counter/increment
    increment: (state) => {
      state.value += 1; // 使用 Immer 直接修改！
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // 带 payload 的 action
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 自动生成 action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出 reducer
export default counterSlice.reducer;
```

#### 配置 `store`​ 文件

文件位置`src/store/index.ts`​

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 添加更多 reducer...
  },
  // 自动包含这些中间件：
  // 1. redux-thunk
  // 2. 开发环境下的 DevTools
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// 导出类型安全的 Hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### `Provider`​根组件配置

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* 用 Provider 包裹整个应用 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// Provider 是正确的使用的方式
// 错误的如下

// ❌ 错误示例：忘记包裹 Provider
root.render(<App />); //

// ❌ 错误示例：store 导入错误
import wrongStore from './wrong/path'; 
<Provider store={wrongStore}>

// ✅ 正确做法：确保从正确路径导入 store
import { store } from './app/store';


```

‍

#### 使用 `store`​

```js
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment } from '@/store/counter/slice';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
```

#### 高级功能：异步处理

下方是一个异步的 `slice`​ 与上方的 `slice`​ 基本一致,只是多了一个异步方法的专门定义的方式

```js
// features/user/slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface UserState {
  data: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      return await response.json();
    } catch (err) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
```

##### 调用异步的方法

简单的理解就是,在 `redux`​中想要触发方法久一定要使用`dispatch`​触发

```js
dispatch(fetchUser());
```
