---
title: 🤔 最大程度的实现 JS 的兼容性
description: ES6语法在一定程度上丰富了JavaScript的语法，但是它所带来的兼容性问题也是之前程序员去思考和烦恼的事情。对于一些低版本、旧版本的浏览器是不支持类似ES6等的高级语法。就会造成当用户使用不支持该语法的浏览器的时候，项目的运行会产生各类的错误：程序卡死、项目无法打开，功能的丢失等。
  目的：使js代码兼容ie8浏览器
tag:
  - 优化
  - babel
  - 前端
  - Webpack
---

# Universal Js

## 目录

*   [拟解决的问题](#拟解决的问题)

[解决的方式](#解决的方式)

[webpack](#webpack)\
[babel](#babel)

[项目目录](#项目目录)

[项目运行](#项目运行)

[核心依赖](#核心依赖)

[具体配置](#具体配置)

[webpack.config.js](#webpackconfigjs)

[babel.config.js](#babelconfigjs)

[@babel/polyfill](#babelpolyfill)

[使用](#使用)

[结果](#结果)

## 拟解决的问题

ES6语法在一定程度上丰富了JavaScript的语法，但是它所带来的兼容性问题也是之前程序员去思考和烦恼的事情。对于一些低版本、旧版本的浏览器是不支持类似ES6等的高级语法。就会造成当用户使用不支持该语法的浏览器的时候，项目的运行会产生各类的错误：程序卡死、项目无法打开，功能的丢失等。
目的：使js代码兼容ie8浏览器

## 解决的方式

### webpack

webpack 是前端项目工程化的解决方案

它提供了前端模块化开发支持，以及代码压缩混淆、处理浏览器端 JavaScript 的兼容性、性能优化等功能

它让程序员把工作重心放在具体功能实现上，提高开发效率和项目可维护性

### babel

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

## 项目目录

```javascript
.
├── ./babel.config.js  //babel的配置文件夹
├── ./dist //打包后的生成目录
│   ├── ./dist/index.html
│   └── ./dist/index.js
├── ./index.html  //前端引入js
├── ./index.js    //打包的入口文件
├── ./package-lock.json
├── ./package.json
└── ./webpack.config.js  //webpack的配置文件
```

## 项目运行

```javascript
1.npm i 安装依赖
2.webpack自动打包
```

## 核心依赖

| 依赖包名                                 | 作用                            |
| ---------------------------------------- | ------------------------------- |
| webpack                                  | webpack核心库                   |
| webpack-cli                              | webpack工具                     |
| uglifyjs-webpack-plugin                  | 解决ie下的关键字default的问题   |
| babel-loader                             | babel加载依赖                   |
| @babel/preset-env                        | 智能预设                        |
| @babel/polyfill                          | 补充实现api的转换               |
| @babel/plugin-transform-modules-commonjs | 将 ECMAScript 模块转换为CommonJ |
| @babel/core                              | 在编译代码过程中核心的库        |

## 具体配置

### webpack.config.js

```javascript
const path = require("path");
//引入html-webpack-plugin"插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入uglifyjs-webpack-plugin插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production", // "production" | "development" | "none"  
  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        exclude: /node_modules/,
        uglifyOptions: {
          ie8: true, // 解决ie下的关键字default的问题
        },
      }),
    ],
  },
    // webpack 开始打包
  entry: "./index.js", // string | object | array  // 这里应用程序开始执行

  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "index.js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  },
  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.js?$/,
        //排除node_modoules
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // 相对于此目录解析
  target: "web", // 枚举  // 包(bundle)应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)
  plugins: [new HtmlWebpackPlugin(
   {
      // 复制一个模板 html 文件， 并且自动引入打包输出的所有资源
      template: './index.html',
      /*
      压缩html代码 production环境使用
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComment: true
      }*      
/
    }
  )],
};

```

### babel.config.js

```javascript
module.exports = {
 
  presets: [
    [
    //@babel/preset-env是一个智能预设，它可以将我们的高版本JavaScript代码进行转译根据内置的规则转译
    //成为低版本的javascript代码。preset-env内部集成了绝大多数plugin（State > 3）的转译插件，
    //它会根据对应的参数进行代码转译。
      "@babel/preset-env",
    ],
  ],
  //加载babel的插件
  plugins: [
    ["@babel/plugin-transform-modules-commonjs"],
  ],
};


```

> @babel/preset-env不会包含任何低于 Stage 3 的 JavaScript 语法提案。如果需要兼容低于Stage 3阶段的语法则需要额外引入对应的Plugin进行兼容。
> 需要额外注意的是babel-preset-env仅仅针对语法阶段的转译，比如转译箭头函数，const/let语法。针对一些Api或者Es 6内置模块的polyfill，preset-env是无法进行转译的。

### @babel/polyfill

> `babel-prest-env`仅仅只会转化最新的`es`语法，并不会转化对应的`Api`和实例方法,比如说`ES 6`中的`Array.from`静态方法。`babel`是不会转译这个方法的，如果想在低版本浏览器中识别并且运行`Array.from`方法达到我们的预期就需要额外引入`polyfill`进行在`Array`上添加实现这个方法。
> &#x20;语法层面的转化*******完全可以胜任。但是一些内置方法模块，仅仅通过*** \ *的语法转化是无法进行识别转化的，所以就需要一系列类似”垫片“的工具进行补充实现这部分内容的低版本代码实现。这就是所谓的* \ **的作用**

#### 使用

index.js的入口文件中引入` import "@babel/polyfill";`

## 结果

运行`webpack`命令

在dist文件夹中就可以看到转换完成之后的代码
