---
title:  Webpack + React
description: 手动搭建 react 脚手架
tag:
  - Webpack
  - 前端
---
<div align="center">
    <img width="200px" height="200px" src="https://www.z4a.net/images/2023/09/12/logo.png" />
    <h1>
		<a href="https://github.com/NightSquirrl/manual-react-webpack" target="_blank"> Webpack + React</a>
	</h1>
    <p>代码相关说明</p>
</div>

<br />
<br />

# 基础配置
## 一、五大核心概念
### 1、Entry
> 入口起点，告诉 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。默认值是 ./src/index.js，但也可以通过在 “webpack.config.js” 文件中的 entry 属性来配置，可以指定一个（或多个）不同的入口起点，

```javascript
// 单文件入口简写
module.exports = {
  entry: './src/index.js',
};
 
 
// 单文件入口完整写法
module.exports = {
  entry: {
    main: './src/index.js',
  },
};
 
// 多文件入口写法
module.exports = {
  entry: ['./src/index.js', './src/index_2.js'],
};

```
有关 Entry 更多的信息[参考官网](https://webpack.docschina.org/concepts/entry-points)

### 2、Output
> output 告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。也可通过在 “webpack.config.js” 文件中的 output 属性来配置
```javascript
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
 
 
// 多入口的配置
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  // 写入到：./dist/app.js, ./dist/search.js
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

```
有关 Output 更多的信息[参考官网](https://webpack.docschina.org/concepts/output)

### 3、Loader
> webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。loader的基本属性就两个:
* test：识别出哪些文件会被转换
* use：定义出在进行转换时，应该使用哪个 loader
```javascript
// 示例
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 最后执行 style-loader
          { loader: 'style-loader' },
          // 其次执行 css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          //  首先执行 sass-loader
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};

```
在这里需要注意的是：module.rules 允许你在 webpack 配置中指定多个 loader。还有 loader 的执行顺序需要注意一下，<span style="color:red">他是从下到上依次执行的</span>，配置过程中不要写错了。在上面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

有关 Loader 更多的信息[参考官网](https://webpack.docschina.org/concepts/loaders)

### 4、Plugins
> loader 用于转换某些类型的模块，而plugins（插件）则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。插件的使用需要用 require() 引入，然后通过 new 操作符来创建一个实例 最后添加到 plugins 数组中。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html的插件
 
module.exports = {
  module: {
    rules: [{ test: /\.css$/, use: 'css-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

```
上述示例中 html-webpack-plugin 会为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。

有关 Plugins 更多的信息[参考官网](https://webpack.docschina.org/api/plugins)

### 5、Mode
> 模式，有生产模式（production）和开发模式（development）或 none。设置 mode 参数，可以启用 webpack 内置在相应环境下的优化
```javascript
// 其默认值为 production
module.exports = {
  mode: 'production',
};

```
有关 Mode 更多的信息[参考官网](https://webpack.docschina.org/api/plugins)
## 安装及简单的配置
### 1、安装
webpack的安装需要注意的一点就是需要在全局和项目中都同时安装 webpack 和 webpack-cli
```javascript
npm i webpack webpack-cli -g
npm i webpack webpack-cli -D
```
### 2、初始化项目
```javascript
npm init
```
### 3、编译打包
简单的创建一个项目，然后加入各种类型的文件，应用上面说的五大核心打包一个应用。
#### 首先加入webpack支持的js和json文件
* 创建了一个webpack文件夹
* 在他的基础上初始化了项目：npm init 
* 创建 src 文件夹，并在他下面创建 入口文件（index.js）和一些模块（module1.js、module2.js、module3.js ......）
* 创建 json 文件夹，并在他下面创建 json 文件（index.json）
* 创建 index.html 文件，以备之后引入webpack 构建后的文件
* 创建 webpack.config.js 文件，用于配置 webpack 的配置。
#### 其次配置默认支持的js和json文件
```javascript
// webpack.config.js

const path = require('path');
module.exports = {
    // 入口文件配置
    entry: './src/js/index.js',
    // 出口文件配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    // 模式选择（默认）
    mode: 'production',
};

```
简单说一下，上面的配置文件主要做两件事。1、配置了入口文件地址为：'./src/js/index.js'  2、配置了出口文件的导出为：'dist/main.js'

配置完以后，执行命令：webpack

这样一来我们就把webpack支持的js和json文件做了一个配置，同时用到了五大核心中的三大核心：entry、output、mode。

#### loader 使用案例

##### less-loader

首先添加一个 .less 文件
然后在入口文件中引入
配置 loader 可以[参考官网](https://webpack.docschina.org/loaders/less-loader/)

```javascript
npm install less less-loader style-loader css-loader -D
```
这里为什么需要安装'style-loader'和'css-loader',请看注释
```javascript
// 构建 less 文件 说明
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i, // 匹配 .less 文件
        // 注意之前说过的，loader是从下到上的一个执行顺序
        use: [ // 还有官方的示例 这里是loader 咱们需要改成use
          'style-loader', // 创建style标签，并将js中的css代码添加到style标签中
          'css-loader', // 将css文件以common.js的方式整合到js文件中
          'less-loader', // 将less文件解析成css文件
        ],
      },
    ],
  },
};

```
##### ts-loader
```javascript
npm install -D ts-loader typescript babel-loader @babel/core @babel/preset-env webpack
```
ts想要被 webpack 识别，不仅需要借助ts-loader，还需要借助babel-loader，这里直接看根据官网文档来

但这里需要注意的是，在构建过程中，如果需要支持IE浏览器，需要额外配置：core-js

具体配置
```javascript
// 构建 ts 文件 说明
const path = require('path');
module.exports = {
  // 入口文件配置
  entry: './src/js/index.js',
  // 出口文件配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  // 模式选择（默认）
  mode: 'production',
  // loader的配置
  module: {
    rules: [
      // less-loader
      {
        test: /\.less$/, // 匹配 .less 文件
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      // ts-loader
      {
        test:/\.ts$/,
        exclude: /node-modules/,
        use: [
          // babel配置
          {
            // 加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 预定义的环境设置
              presets:[
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11",
                    },
                    // 指定core.js的版本
                    "corejs": "3",
                    // 使用corejs的方式 “usage” 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ],
              // 开启babel缓存
              cacheDirectory: true
            }
          },
          'ts-loader'
        ],
      }
    ],
  },
};

```
##### 图片构建
在图片的构建中，以前的webpack4需要用到url-loader 和 file-loader，但在webpack5中确不需要了。

为什么webpack5不用这么配置了呢？这里简单说一下：

webpack5 新增 资源模块（Asset Modules ）。资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
在 webpack5 之前，通常用 raw-loader 将文件导入为字符串、用 url-loader 将文件作为 data URI 内联到 bundle 中、用 file-loader 将文件发送到输出目录。但现在新增了资源模块后，资源模块通过添加 4 种新的模块类型，来替换所有这些 loader：

* asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
* asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
* asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
* asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

看一下webpack4 和 webpack5 的代码的区别：
```javascript
// webpack4 的使用
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/i,
        use: 'file-loader'
      },
      {
        test: /\.ico$/i,
        use: 'url-loader'
      },
      {
        test: /\.text$/i,
        use: 'raw-loader'
      },
    ],
  },
};

```
```javascript
// webpack5 的使用
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/i,
        use: 'asset/resource'
      },
      {
        test: /\.ico$/i,
        use: 'asset/inline'
      },
      {
        test: /\.text$/i,
        use: 'asset/source'
      },
    ],
  },
};

```
#### 接下来看一下plugins
**1、mini-css-extract-plugin**
插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

简单贴一下代码
```javascript
// 安装
npm install --save-dev mini-css-extract-plugin
 
// 使用
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};

```
需要注意的是，插件基于 webpack5 的新特性构建，需要 webpack5 才能正常工作。

**2、html-webpack-plugin**
插件会生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。

简单贴一下代码
```javascript
// 安装
npm install --save-dev html-webpack-plugin
 
 
// 使用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};

```
需要注意的是 如果你有多个 webpack 入口，也会在已生成 HTML 文件中的 script 标签内引入

如果在 webpack 的输出中有任何 CSS 资源（例如，使用 mini-css-extract-plugin 提取的 CSS），那么这些资源也会在 HTML 文件 head 元素中的 link 标签内引入

#### 最后来看一下代码规范
代码规范的工具有很多，但怎么选择是个问题，一般我觉得跟着主流的框架走总不会错，就目前vue3和react17用的都是Eslint，所以咱们就以Eslint为例，简单说一下。
```javascript
// webpack5 弃用了eslint-loader 支持了eslint-webpack-plugin
yarn add -D eslint-webpack-plugin

// eslint 和 prettier 结合校验
yarn add -D eslint prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier

// 一个可扩展的共享配置
yarn add -D eslint-config-airbnb-base

// 用于react的eslint规则
yarn add -D eslint-plugin-react

// typescript相关规则 详细说明：https://www.npmjs.com/package/@typescript-eslint/parser
yarn add -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin

// 添加一些.eslintrc文件的扩展特性
yarn add -D standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard eslint-config-standard
```
安装完以后配置如下
```javascript

// 合并规则
const { merge } = require("webpack-merge");
// 错误提示插件
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// eslint插件
const ESLintPlugin = require("eslint-webpack-plugin");
// 导入基础配置
const { baseConfig } = require("./webpack.config.base");
module.exports = merge(baseConfig, {
  // 环境设置：开发环境
  mode: "development",
  // 便于开发调试 这里开启source-map模式
  devtool:  'source-map',
  // webpack-dev-server 的一下配置，webpack-dev-server 会提供一个本地服务(serve)
  devServer: {
    // host
    host: '127.0.0.1',
    // 端口
    port: 8000,
    // 热更新
    hot: true,
    // 启动时打开浏览器
    open: true,
  },
  // 插件配置
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
      extensions: ["js", "ts", "tsx", "json"],
      exclude: "/node_modules/",
    })
  ],
});

```
.eslintrc.js文件 的配置如下
```javascript
// 增加.eslintrc.js文件
 
 
module.exports = {
  // eslint的配置主要走的是：typescript-eslint
  // 详细内容请参阅：https://typescript-eslint.io/
  parser: "@typescript-eslint/parser",
  // 可共享的配置 是一个npm包，输出的是一个配置对象。
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  // 指定脚本的运行环境。每种环境都有一组特定的预约义全局变量。
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  // 输出的规则
  plugins: ["react", "prettier", "@typescript-eslint"],
  // 为特定类型的文件（ts、tsx）指定处理器。
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": [1, { args: "none" }],
      },
    },
  ],
  // 规则集，会覆盖extends中的规则
  rules: {
    // 语句强制分号结尾
    semi: [2, "always"],
    // 布尔值类型的 propTypes 的 name 必须为 is 或 has 开头 （off 不强制要求写 propTypes）
    "react/boolean-prop-naming": "off",
    // 一个 defaultProps 必须有对应的 propTypes （）
    "react/default-props-match-prop-types": "off",
    // 组件必须有 displayName 属性 （off 不强制要求写 displayName）
    "react/display-name": "off",
    // 禁止在自定义组件中使用一些指定的 props （off 没必要限制）
    "react/forbid-component-props": "off",
    // 禁止使用一些指定的 elements （off 没必要限制）
    "react/forbid-elements": "off",
    // 禁止使用一些指定的 propTypes （off 不强制要求写 propTypes）
    "react/forbid-prop-types": "off",
    // 禁止直接使用别的组建的 propTypes （off 不强制要求写 propTypes）
    "react/forbid-foreign-prop-types": "off",
    // 禁止使用数组的 index 作为 key （off 不强制要求 太严格了！）
    "react/no-array-index-key": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/no-var-requires": 0,
    // 禁止使用 children 做 props
    "react/no-children-prop": "error",
    // 禁止使用 dangerouslySetInnerHTML （off 没必要限制）
    "react/no-danger": "off",
    // 禁止在使用了 dangerouslySetInnerHTML 的组建内添加 children
    "react/no-danger-with-children": "error",
    // 禁止使用已废弃的 api
    "react/no-deprecated": "error",
    // 禁止在 componentDidMount 里面使用 setState （off 同构应用需要在 didMount 里写 setState）
    "react/no-did-mount-set-state": "off",
    // 禁止在 componentDidUpdate 里面使用 setState
    "react/no-did-update-set-state": "error",
    // 禁止直接修改 this.state
    "react/no-direct-mutation-state": "error",
    // 禁止使用 findDOMNode
    "react/no-find-dom-node": "error",
    // 禁止使用 isMounted
    "react/no-is-mounted": "error",
    // 禁止在一个文件创建两个组件
    "react/no-multi-comp": "off",
    // 禁止在 PureComponent 中使用 shouldComponentUpdate
    "react/no-redundant-should-component-update": "error",
    // 禁止使用 ReactDOM.render 的返回值
    "react/no-render-return-value": "error",
    // 禁止使用 setState
    "react/no-set-state": "off",
    // 禁止拼写错误
    "react/no-typos": "error",
    // 禁止使用字符串 ref
    "react/no-string-refs": "error",
    // 禁止在组件的内部存在未转义的 >, ", ' 或 }
    "react/no-unescaped-entities": "error",
    // @fixable 禁止出现 HTML 中的属性，如 class
    "react/no-unknown-property": "error",
    // 禁止出现未使用的 propTypes
    "react/no-unused-prop-types": "off",
    // 定义过的 state 必须使用
    "react/no-unused-state": "off",
    // 禁止在 componentWillUpdate 中使用 setState
    "react/no-will-update-set-state": "error",
    // 必须使用 Class 的形式创建组件
    "react/prefer-es6-class": ["error", "always"],
    // 必须使用 pure function
    "react/prefer-stateless-function": "off",
    // 组件必须写 propTypes
    "react/prop-types": "off",
    // 出现 jsx 的地方必须 import React
    "react/react-in-jsx-scope": "off",
    // 非 required 的 prop 必须有 defaultProps
    "react/require-default-props": "off",
    // 组件必须有 shouldComponentUpdate
    "react/require-optimization": "off",
    // render 方法中必须有返回值
    "react/require-render-return": "error",
    // @fixable 组件内没有 children 时，必须使用自闭和写法
    "react/self-closing-comp": "off",
    // @fixable 组件内方法必须按照一定规则排序
    "react/sort-comp": "off",
    // propTypes 的熟悉必须按照字母排序
    "react/sort-prop-types": "off",
    // HTML 中的自闭和标签禁止有 children
    "react/void-dom-elements-no-children": "error",
    // @fixable 布尔值的属性必须显式的写 someprop={true}
    "react/jsx-boolean-value": "off",
    // @fixable 自闭和标签的反尖括号必须与尖括号的那一行对齐
    "react/jsx-closing-bracket-location": [
      "error",
      {
        nonEmpty: false,
        selfClosing: "line-aligned",
      },
    ],
    // @fixable 结束标签必须与开始标签的那一行对齐
    "react/jsx-closing-tag-location": "off",
    // @fixable 大括号内前后禁止有空格
    "react/jsx-curly-spacing": [
      "error",
      {
        when: "never",
        attributes: {
          allowMultiline: true,
        },
        children: true,
        spacing: {
          objectLiterals: "never",
        },
      },
    ],
    // @fixable props 与 value 之间的等号前后禁止有空格
    "react/jsx-equals-spacing": ["error", "never"],
    // 限制文件后缀
    "react/jsx-filename-extension": "off",
    // @fixable 第一个 prop 必须得换行
    "react/jsx-first-prop-new-line": "off",
    // handler 的名称必须是 onXXX 或 handleXXX
    "react/jsx-handler-names": "off",
    // 数组中的 jsx 必须有 key
    "react/jsx-key": "error",
    // @fixable 限制每行的 props 数量
    "react/jsx-max-props-per-line": "off",
    // jsx 中禁止使用 bind
    "react/jsx-no-bind": "off",
    // 禁止在 jsx 中使用像注释的字符串
    "react/jsx-no-comment-textnodes": "error",
    // 禁止出现重复的 props
    "react/jsx-no-duplicate-props": "error",
    // 禁止在 jsx 中出现字符串
    "react/jsx-no-literals": "off",
    // 禁止使用 target="_blank"
    "react/jsx-no-target-blank": "off",
    // 禁止使用未定义的 jsx elemet
    "react/jsx-no-undef": "error",
    // 禁止使用 pascal 写法的 jsx，比如 <TEST_COMPONENT>
    "react/jsx-pascal-case": "error",
    // @fixable props 必须排好序
    "react/jsx-sort-props": "off",
    // @fixable jsx 的开始和闭合处禁止有空格
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
      },
    ],
    // jsx 文件必须 import React
    "react/jsx-uses-react": "error",
    // 定义了的 jsx element 必须使用
    "react/jsx-uses-vars": "error",
    // @fixable 多行的 jsx 必须有括号包起来
    "react/jsx-wrap-multilines": "off",
    // 消除未使用的变量，函数和函数的参数。
    "no-unused-vars": "off",
    // jsdoc语法检查
    "valid-jsdoc": [
      "error",
      {
        requireReturn: false,
      },
    ],
  },
  // 添加共享设置
  settings: {
    react: {
      version: "detect",
    },
    polyfills: ["fetch", "promises", "url"],
  },
};

```
