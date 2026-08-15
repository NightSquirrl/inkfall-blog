---
title: 09. 1-harmony 项目工程结构
icon: token-branded:harmony
tag:
  - harmony
star: true
---

## Stage 模型下的工程结构

### 宏观

```bash
├── AppScope
│   ├── app.json5  # 应用的全局配置信息
│   └── resources # 全局的配置的资源
│       └── base
│           ├── element
│           │   └── string.json
│           └── media
│               └── app_icon.png
├── build-profile.json5 # 应用级配置信息 包括签名 产品配置
├── entry # 应用/服务模块 编译构建生成一个HAP
│   ├── build-profile.json5 # 当前的模版信息 编译信息配置项
│   ├── hvigorfile.ts # 模块编译构建任务脚本
│   ├── oh-package.json5
│   └── src
│       ├── main
│       │   ├── ets # 存放 ARTS 源码
│       │   │   ├── entryability
│       │   │   │   └── EntryAbility.ts # 应用服务的入口
│       │   │   └── pages
│       │   │       └── Index.ets # 应用服务包含页面
│       │   ├── module.json5 # Stage 模型模块配置模块
│       │   └── resources # 用于存放应用服务资源
│       │       ├── base
│       │       │   ├── element
│       │       │   │   ├── color.json
│       │       │   │   └── string.json
│       │       │   ├── media
│       │       │   │   └── icon.png
│       │       │   └── profile
│       │       │       └── main_pages.json
│       │       ├── en_US
│       │       │   └── element
│       │       │       └── string.json
│       │       ├── rawfile
│       │       └── zh_CN
│       │           └── element
│       │               └── string.json
│       └── ohosTest
│           ├── ets
│           │   ├── test
│           │   │   ├── Ability.test.ets
│           │   │   └── List.test.ets
│           │   ├── testability
│           │   │   ├── TestAbility.ets
│           │   │   └── pages
│           │   │       └── Index.ets
│           │   └── testrunner
│           │       └── OpenHarmonyTestRunner.ts
│           ├── module.json5
│           └── resources
│               └── base
│                   ├── element
│                   │   ├── color.json
│                   │   └── string.json
│                   ├── media
│                   │   └── icon.png
│                   └── profile
│                       └── test_pages.json
├── hvigor
│   ├── hvigor-config.json5
│   └── hvigor-wrapper.js
├── hvigorfile.ts # 应用级编译构建脚本
├── hvigorw
├── hvigorw.bat
├── local.properties
├── oh-package-lock.json5
├── oh-package.json5
└── oh_modules # 第三方依赖模块
    └── @ohos
        └── hypium -> ../.ohpm/@ohos+hypium@1.0.6/oh_modules/@ohos/hypium

37 directories, 34 files
```

### 微观

#### **AppScope**

> 全局的共有资源存放目录。

```markdo
resources：用于存放应用/服务所用到的资源文件，如图形、多媒体、字符串、布局文件等。

    base>element：包括字符串、整型数、颜色、样式等资源的json文件。每个资源均由json格式进行定义

                boolean.json：布尔型

                color.json：颜色

                float.json：浮点型

                intarray.json：整型数组

                integer.json：整型

                pattern.json：样式

                plural.json：复数形式

                strarray.json：字符串数组

                string.json：字符串值

    base>media：多媒体文件，如图形、视频、音频等文件，支持的文件格式包括：.png、.gif、.mp3、.mp4等。

    rawfile ：用于存储任意格式的原始资源文件。rawfile不会根据设备的状态去匹配不同的资源，需要指定文件路径和文件名进行引用。

app.json5：应用的全局配置信息。

```

#### **entry**

HarmonyOS工程模块，编译构建生成一个HAP包。

```markdown
src > main > ets：用于存放ArkTS源码。

        entryability：应用/服务的入口。

        pages：应用/服务包含的页面。

src > main > resources：用于存放应用/服务所用到的资源文件，如图形、多媒体、字符串、布局文件等，和上面的共享目录是一致的。

src > main > module.json5：Stage模型模块配置文件。主要包含HAP包的配置信息、应用/服务在具体设备上的配置信息以及应用/服务的全局配置信息。

build-profile.json5：当前的模块信息、编译信息配置项，包括buildOption、targets配置等。其中targets中可配置当前运行环境，默认为HarmonyOS。

hvigorfile.ts：模块级编译构建任务脚本，开发者可以自定义相关任务和代码实现。

```

#### **hvigor**

构建配置文件信息，是一款全新基于TS实现的前端构建任务编排工具，结合npm包管理机制，主要提供任务管理机制，任务注册编排、工程模型管理、配置管理等关键能力，更符合ArkTS/JS开发者的开发习惯。

#### **oh_modules**

用于存放三方库依赖信息。

#### **gitignore**

git过滤配置。

#### **build-profile.json5**

应用级配置信息，包括签名、产品配置等。

#### **hvigorfile.ts**

应用级编译构建任务脚本。

#### **hvigorw和hvigorw.bat**

ohpm编译构建工具。

#### **local.properties**

存储本地属性的文件。

#### **oh-package.json5**

依赖配置，可以设置三方包依赖。