---
title: Gulp 代码压缩
tags: ["优化", "前端", "Gulp"]
draft: false
description: "将使用例如 handlebars 模版等没有使用构建工具的项目,进行手动压缩"
category: optimize
publishedAt: "2026-08-15"
---

# gulp

## 目录

- [初始化](#初始化)

[gulp中提供的方法](#gulp中提供的方法)

[配置](#配置)

[task参数解释](#task参数解释)

[html文件压缩](#html文件压缩)

[插件安装](#插件安装)

[文件抽离](#文件抽离)

[预先操作](#预先操作)
[插件安装](#插件安装-1)

[CSS文件压缩](#css文件压缩)

[插件安装](#插件安装-2)

[JS压缩](#js压缩)

[插件安装](#插件安装-3)

[无需压缩的文件处理](#无需压缩的文件处理)

[程序执行](#程序执行)

[单任务执行](#单任务执行)

[多任务](#多任务)

[配置](#配置-1)

[Am5具体方案](#am5具体方案)

[依赖包](#依赖包)
[gulpfile.js配置](#gulpfilejs配置)
[beetl语法修改](#beetl语法修改)

# 初始化

1. 初始化包管理工具

   ```javascript
   npm init -y

   ```
2. 下载gulp库文件

   ```javascript
   npm i gulp -D
   ```
3. 在项目根目录新建gulpfile.js文件，进行任务的编写
4. 在命令行使用gulp命令执行任务
5. 安装gulp命令行工具

   ```javascript
   npm i gulp-cli -g
   ```

   > 建议进行全局安装，方便在其他项目中直接运行
   >
6. 运行命令

   ```javascript
   gupl 任务名称
   ```

# gulp中提供的方法

```javascript
gulp.task(); //建立gulp任务
gulp.src(); //获取任务要处理的文件
gulp.dest(); //任务结束后要输出的文件位置
gulp.watch(); //监听文件的变化
```

# 配置

## task参数解释

```javascript
//htmlmin为任务名，在执行命令行压缩的时候会用到
//后面的函数为执行任务的回调函数
gulp.task("htmlmin", () => {
  //处理文件的路径
  gulp
    .src("./templates/index.html")
    //使用html压缩插件的使用
    .pipe(htmlmin({ collapseWhitespace: true }))
    //文件结果输出位置
    .pipe(gulp.dest("dist/templates"));
});
```

## html文件压缩

### 插件安装

```javascript
npm i gulp-htmlmin -D
//在gulpfile.js的文件中进行配置
// 引入gulp模块
const gulp = require("gulp");
//引入html压缩模块
const htmlmin = require("gulp-htmlmin");

gulp.task("htmlmin", () => {
  //处理文件的路径
  gulp
    .src("./templates/index.html")
    //使用html压缩插件的使用
    .pipe(htmlmin({ collapseWhitespace: true }))
    //文件结果输出位置
    .pipe(gulp.dest("dist/templates"));
});
```

## 文件抽离

### 预先操作

一般使用

```
比如所有的html页面都会有header的头部导航，输入重复的代码，可以新建一个common 的文件夹，然后新建header.html将所有页面的header代码复制到此处，并删除其他文件夹中的header导航，替换成@@include('./文件/header.html')*
```

升级版本

```
因为am5中的js是写在html文件中的，但是在html压缩的时候并不会压缩js代码，所以首先将html内部的代码全部抽离到commonJs的文件夹中，并命名不同的js文件，接着在gulpfile.js的文件中进行配置，先对js进行babel的编译，然后将编译之后的js进行压缩并存储在一个文件夹中，然后将每一个html中原本是js代码的位置全部使用@@include('./temp/转换后的js.js')，然后在执行html压缩的任务，就会将压缩之后的js代码，放入压缩后的html文件中。
```

### 插件安装

```javascript
npm i gulp-file-include -D
//在gulpfile.js的文件中进行配置
// 引入gulp模块
const gulp = require("gulp");
//引入html压缩模块
const htmlmin = require("gulp-htmlmin");
//引入公共文件抽离模块
const fileinclude = require("gulp-file-include");

gulp.task("htmlmin", () => {
  //处理文件的路径
  gulp
    .src("./templates/index.html")
    //将抽离的代码放入
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/templates"));
});
```

## CSS文件压缩

### 插件安装

```javascript
npm i gulp-csso -D
//在gulpfile.js的文件中进行配置
// 引入gulp模块
const gulp = require("gulp");

//引入css压缩模块
const csso = require("gulp-csso");

gulp.task("cssmin", () => {
  //*.css匹配所有的css文件
  gulp.src("./static/css/ *.css").pipe(csso()).pipe(gulp.dest("./dist/static/css"));
});
```

## JS压缩

### 插件安装

```javascript
//安装语法转换babel
npm i gulp-babel @babel/core @babel/preset-env -D
//安装js压缩模块
npm i gulp-uglify -D
//在gulpfile.js的文件中进行配置
// 引入gulp模块
const gulp = require("gulp");
//引入babel编译模块
const babel = require("gulp-babel");
//引入js混淆压缩模块
const uglify = require("gulp-uglify");

gulp.task("jsmin", () => {
  gulp
    .src("./templates/common/index.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest("./templates/temp"));
});
```

# 无需压缩的文件处理

```javascript
//例如图片的资源无需压缩，则将文件拷贝到dist目录即可
gulp.task("copy", () => {
  gulp.src("./static/images/*").pipe(gulp.dest("./dist/static/images"));
});
```

# 程序执行

## 单任务执行

```javascript
gulp htmlmin
```

## 多任务

### 配置

```javascript
gulp.task("default", ["jsmin", "cssmin", "htmlmin", "copy"]);
执行gulp default 或者gulp
```

# Am5具体方案

## 依赖包

```javascript
    "@babel/core": "^7.18.5",
    "@babel/preset-env": "^7.18.2",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-csso": "^4.0.1",
    "gulp-file-include": "^2.3.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-uglify": "^3.0.2"
```

## gulpfile.js配置

```javascript
//在gulpfile.js的文件中进行配置
// 引入gulp模块
const gulp = require("gulp");
//引入html压缩模块
const htmlmin = require("gulp-htmlmin");
//引入公共文件抽离模块
const fileinclude = require("gulp-file-include");
//引入css压缩模块
const csso = require("gulp-csso");
//引入babel编译模块
const babel = require("gulp-babel");
//引入js混淆压缩模块
const uglify = require("gulp-uglify");

//首先将js文件从html中抽离出来，并且使用@@include（‘js转换之后的位置’）占位
gulp.task("jsmin", () => {
  gulp
    .src("./templates/common/index.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest("./templates/temp"));
});

gulp.task("cssmin", () => {
  gulp.src("./static/css/ *.css").pipe(csso()).pipe(gulp.dest("./dist/static/css"));
});

gulp.task("htmlmin", () => {
  gulp
    .src("./templates/index.html")
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/templates"));
});

gulp.task("copy", () => {
  gulp.src("./static/images/*").pipe(gulp.dest("./dist/static/images"));
  gulp.src("./static/swiper/ *").pipe(gulp.dest("./dist/static/swiper"));
  gulp.src("./static/test/*").pipe(gulp.dest("./dist/static/test"));
});

gulp.task("default", ["jsmin", "cssmin", "htmlmin", "copy"]);
```

> 一定要先执行gulp jsmin或者要有最后的default配置

## beetl语法修改

gulp对html的压缩无法识别beelt在html标签中的js语句

例如：

```javascript
  div class="ad-box-mobile-1" ${(isNotEmpty(isShowAd)&&isShowAd)?''
  :'style="display:none;"'}>
        Advertisements
        <div class="ad-mobile-1">

        </div>
      </div>
```

将其转换为if else的语句

```javascript
<%
  if(isNotEmpty(isShowAd)&&isShowAd) {
    %>
    <div class="ad-box-mobile-1">
        Advertisements
        <div class="ad-mobile-1">

        </div>
      </div>
      <% } else { %>
        <div></div>
        <% } %>
```
