---
title: 4. Vue3 使用 jsx

star: true
---

## 创建项目
```bash
npm init vite # 选择 vite 构建 选择 vue javascript

pnpm i

pnpm i @vitejs/plugin-vue-jsx

```
> 编辑 vite.config.ts 文件

```js
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineConfig({
  plugins: [
    vueJsx(),
  ]
})
```

接下来的语法使用 jsx 的标准语法糖一样,类似于 React

## 例子

```jsx
import {defineComponent,ref} from 'vue'

export default defineComponent({
    props:{
        msg:string;
    },
    
    setup(props) {
        const count = ref(0)

        return () => (
            <div>
                <h1>Hello World JSX {count.value}</h1>
                <h2>{props.msg}</h2>
            </div>
        )
    }
})
```