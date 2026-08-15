---
title: 01. 二维码美化项目
icon: f7:qrcode-viewfinder
tag:
  - QrCode
  - React
  - 前端
---

# QRcode→前端

## &#x20;版本纪录

## 开发工具与环境

1.  [vscode 编辑器](https://code.visualstudio.com/ "vscode 编辑器")

2.  node 版本 >= 14.0.0

3.  npm 版本 >= 5.6

4.  前端框架采用 [React 17](https://reactjs.org/ "React 17")

5.  UI 组件采用 [MUI](https://mui.com/ "MUI")

## 项目运行

1.  安装项目依赖 npm install

2.  开发环境运行 npm start

3.  正式环境打包 npm run build

## 项目核心依赖包

| 依赖包名                        | 作用                      |
| ------------------------------- | ------------------------- |
| axios                           | 网络请求框架              |
| ahooks                          | useResponsive界面相响应式 |
| react-qrbtf                     | 二维码生成库              |
| react-router-dom                | React路由跳转             |
| react-color                     | 颜色拾取库                |
| @emotion/react、@emotion/styled | MUI样式                   |
| @mui/icons-material             | MUI图标库                 |

## 项目规范

### 命名的规则

```
1. 变量名 小驼峰 例子：qrCodeEmail

2. 方法名 小驼峰 例子：qrCodeEmailRequireData

3. 组件名 大驼峰 例子：History

4. 命名要求尽可能见名知意,可以多个单词拼接组成,命名不用在意长度.
```

### 项目的结构

```javascript
.
├── ./README-frontend.md  //前端项目文档
├── ./README-project.md  //二维码工程文档
├── ./README-version-todo.md 
├── ./package-lock.json
├── ./package.json  //依赖配置包
├── ./public //项目静态资源存储路径
│   ├── ./public/images
│   │   ├── ./public/images/icon  //svg图片存放
│   │   └── ./public/images/style
│   │       ├── ./public/images/style/edge  //二维码边缘信息svg
│   │       └── ./public/images/style/inform  //二维码信息点样式svg
│   ├── ./public/index.html
└── ./src
    ├── ./src/index.js  //项目入口文件
    ├── ./src/page  //存放页面
    │   ├── ./src/page/History.jsx  //历史页面入口文件
    │   ├── ./src/page/Home.jsx     //主页入口文件
    │   ├── ./src/page/Profile      //用户信息入口文件
    │   │   ├── ./src/page/Profile/Profile.jsx
    │   │   ├── ./src/page/Profile/ProfilePassword.jsx
    │   │   ├── ./src/page/Profile/ProfilePlan.jsx
    │   │   ├── ./src/page/Profile/RenewSubscription.jsx
    │   │   └── ./src/page/Profile/TryDaysFreeDrawer.jsx
    │   ├── ./src/page/Subscribe.jsx //订阅入口文件
    │   ├── ./src/page/TypeOfTab  //主页tab标签的封装组件
    │   │   ├── ./src/page/TypeOfTab/AppStoreComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/EmailComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/ImagesComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/MusicComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/PdfComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/SMSComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/TextComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/VcardComponent.jsx
    │   │   ├── ./src/page/TypeOfTab/WebsiteComponent.jsx
    │   │   └── ./src/page/TypeOfTab/WifiComponent.jsx
    │   ├── ./src/page/component  //各页面组件
    │   │   ├── ./src/page/component/BeautifyTab.jsx
    │   │   ├── ./src/page/component/Footer.jsx
    │   │   ├── ./src/page/component/ForgetPasswordWeb.jsx
    │   │   ├── ./src/page/component/HistoryBeautifyFrame.jsx
    │   │   ├── ./src/page/component/HistoryBeautifyLogo.jsx
    │   │   ├── ./src/page/component/HistoryBeautifyStyle.jsx
    │   │   ├── ./src/page/component/HistoryDialogs.jsx
    │   │   ├── ./src/page/component/HistoryItem.jsx
    │   │   ├── ./src/page/component/HistoryQrCode.jsx
    │   │   ├── ./src/page/component/Login.jsx
    │   │   ├── ./src/page/component/MyDrawer.jsx
    │   │   ├── ./src/page/component/NavBar.jsx
    │   │   ├── ./src/page/component/Pricing.jsx
    │   │   ├── ./src/page/component/QrCodeGenerationComponent.jsx
    │   │   ├── ./src/page/component/Register.jsx
    │   │   ├── ./src/page/component/SubscribeDialogs.jsx
    │   │   ├── ./src/page/component/SubscribeSelect.jsx
    │   │   ├── ./src/page/component/TabSwitch.jsx
    │   │   ├── ./src/page/component/TabSwitchPad.jsx
    │   │   ├── ./src/page/component/TabSwitchPhone.jsx
    │   │   ├── ./src/page/component/UserHome.jsx
    │   │   ├── ./src/page/component/historyList.jsx
    │   │   └── ./src/page/component/userAction.jsx
    │   └── ./src/page/scanResultPage  //扫码结果页
    │       └── ./src/page/scanResultPage/ScanResultPage.jsx
    ├── ./src/router  //路由表
    │   └── ./src/router/Router.jsx
    ├── ./src/theme   //MUI主题定制
    │   └── ./src/theme/GlobalTheme.jsx
    ├── ./src/tool    //生成二维码的组件封装
    │   ├── ./src/tool/BuiltinDrawIcon.jsx
    │   ├── ./src/tool/CodeGenerationInterface.jsx
    │   ├── ./src/tool/CodeListPoints.jsx
    │   ├── ./src/tool/CodeListPointsCircle.jsx
    │   ├── ./src/tool/CodeListPointsDSJ.jsx
    │   ├── ./src/tool/CodeListPointsDisturb.jsx
    │   ├── ./src/tool/CodeListPointsImages.jsx
    │   ├── ./src/tool/FrameStyle.jsx
    │   ├── ./src/tool/QRRound.jsx
    │   └── ./src/tool/presetLogo.jsx
    └── ./src/utils   //工具文件
        ├── ./src/utils/FileUploadImages.jsx
        ├── ./src/utils/FileUploadMP3.jsx
        ├── ./src/utils/FileUploadPDF.jsx
        ├── ./src/utils/GlobalContext.jsx
        ├── ./src/utils/QrCodeData.jsx
        ├── ./src/utils/QrCodeMethod.jsx
        ├── ./src/utils/RequireUrl.jsx
        ├── ./src/utils/SketchColor.jsx
        ├── ./src/utils/SketchColorAnchor.jsx
        ├── ./src/utils/dateFormat.jsx
        ├── ./src/utils/subFromPayPal.jsx
        └── ./src/utils/verifyFormat.jsx
```

### 工程文件书写格式

```javascript
// 文件名
// 引入组件
import
// 页面公共属性
const publicValue=...
// 页面组件
function ComponentName(props){...}
// 页面主体
export default function PageName(props){
    //定义常量
    const value=... //一般用于保存引入的方法
    //定义变量,一般使用useState
    const [stateName,setStateName]=React.useState(defaultValue)
    //定义方法
    const method = (argment)=>{...}
    // 页面初始化
    React.useEffect(()=>{...},[])
    // 监听状态值变化
    React.useEffect(()=>{...},[listenValue])
    // 渲染页面
    return <JSX/>
```

## 项目核心库的介绍

### 二维码生成库 react-qrbtf

#### 直接调用提供的 API

组件类别

1.1 QRNormal

| 参数名称   | 参数类型 | 参数功能                                                     | 默认值                                                       |
| ---------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| value      | String   | 二维码原始数据                                               | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode     | QRCode   | 计算好的二维码点阵信息对象                                   |                                                              |
| level      | String   | 二维码的纠错级别                                             | "M"                                                          |
| className  | String   | 最外层 Svg 的 Class name                                     | ""                                                           |
| styles     | Object   | 组件内部可能用到的所有样式对象                               | { svg: {} }                                                  |
| type       | String   | 信息点显示类型(`"rect", "round", "rand"`)                    | "rect"                                                       |
| size       | Number   | 信息点的大小(缩放)                                           | 100                                                          |
| opacity    | Number   | 信息点的不透明度                                             | 100                                                          |
| posType    | String   | 3 个定位点的显示类型 (`"rect", "round", "planet", "roundRect"`) | "rect"                                                       |
| otherColor | String   | 信息点的颜色                                                 | "#000000“                                                    |
| posColor   | String   | 3 个定位点的颜色                                             | "#000000"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image__qRBwY469_.jpg)

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image__r7jx8HDw8.jpg)

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_WUgSUIs15l.jpg)

1.2 QRRandRect

| 参数名称  | 参数类型 | 参数功能                       | 默认值                                                       |
| --------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| value     | String   | 二维码原始数据                 | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode    | QRCode   | 计算好的二维码点阵信息对象     |                                                              |
| level     | String   | 二维码的纠错级别               | "M"                                                          |
| className | String   | 最外层 Svg 的 Class name       | ""                                                           |
| styles    | Object   | 组件内部可能用到的所有样式对象 | { svg: {} }                                                  |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_7VS0MvNeh0.jpg)

1.3 QRDsj

| 参数名称   | 参数类型 | 参数功能                               | 默认值                                                       |
| ---------- | -------- | -------------------------------------- | ------------------------------------------------------------ |
| value      | String   | 二维码原始数据                         | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode     | QRCode   | 计算好的二维码点阵信息对象             |                                                              |
| level      | String   | 二维码的纠错级别                       | "M"                                                          |
| className  | String   | 最外层 Svg 的 Class name               | ""                                                           |
| styles     | Object   | 组件内部可能用到的所有样式对象         | { svg: {} }                                                  |
| scale      | Number   | 信息点的大小(缩放)                     | 70                                                           |
| crossWidth | Number   | 叉点的宽度                             | 70                                                           |
| posWidh    | Number   | 定位点的宽度                           | 90                                                           |
| posType    | String   | 3 个定位点的显示类型 (`"rect", "dsj"`) | "dsj"                                                        |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_lfHHa23pd7.jpg)

1.4 QR25D

| 参数名称   | 参数类型 | 参数功能                       | 默认值                                                       |
| ---------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| value      | String   | 二维码原始数据                 | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode     | QRCode   | 计算好的二维码点阵信息对象     |                                                              |
| level      | String   | 二维码的纠错级别               | "M"                                                          |
| className  | String   | 最外层 Svg 的 Class name       | ""                                                           |
| styles     | Object   | 组件内部可能用到的所有样式对象 | { svg: {} }                                                  |
| height     | Number   | 信息点柱体高度                 | 0.5                                                          |
| posHeight  | Number   | 定位点柱体高度                 | 0.5                                                          |
| topColor   | String   | 顶部颜色                       | "#FF7F89"                                                    |
| leftColor  | String   | 左侧颜色                       | "#FFD7D9"                                                    |
| rightColor | String   | 右侧颜色                       | "#FFEBF3"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_04dlIJvqxk.jpg)

1.5 QRImage

| 参数名称   | 参数类型 | 参数功能                                           | 默认值                                                       |
| ---------- | -------- | -------------------------------------------------- | ------------------------------------------------------------ |
| value      | String   | 二维码原始数据                                     | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode     | QRCode   | 计算好的二维码点阵信息对象                         |                                                              |
| level      | String   | 二维码的纠错级别                                   | "M"                                                          |
| className  | String   | 最外层 Svg 的 Class name                           | ""                                                           |
| styles     | Object   | 组件内部可能用到的所有样式对象                     | { svg: {} }                                                  |
| type       | String   | 信息点显示类型(`"rect", "round", "rand"`)          | "rect"                                                       |
| size       | Number   | 信息点的大小(缩放)                                 | 100                                                          |
| opacity    | Number   | 信息点的不透明度                                   | 100                                                          |
| image      | String   | 图片的路径或者 base64                              |                                                              |
| darkColor  | String   | 深色信息点的颜色                                   | "#000000"                                                    |
| lightColor | String   | 浅色信息点的颜色                                   | "#FFFFFF"                                                    |
| posType    | String   | 3 个定位点的显示类型 (`"rect", "round", "planet"`) | "rect"                                                       |
| posColor   | String   | 3 个定位点的颜色                                   | "#000000"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_Kb_TxECb3_.jpg)

1.6 QRResImage

| 参数名称   | 参数类型 | 参数功能                                | 默认值                                                       |
| ---------- | -------- | --------------------------------------- | ------------------------------------------------------------ |
| value      | String   | 二维码原始数据                          | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode     | QRCode   | 计算好的二维码点阵信息对象              |                                                              |
| level      | String   | 二维码的纠错级别                        | "M"                                                          |
| className  | String   | 最外层 Svg 的 Class name                | ""                                                           |
| styles     | Object   | 组件内部可能用到的所有样式对象          | { svg: {} }                                                  |
| image      | String   | 图片的路径或者 base64                   |                                                              |
| contrast   | Number   | 图片对比度调整                          | 0                                                            |
| exposure   | Number   | 图片曝光度调整                          | 0                                                            |
| alignType  | String   | 小定位点的类型(`"none", "white", "bw"`) | "none"                                                       |
| timingType | String   | 对齐线的类型(`"none", "white", "bw"`)   | "none"                                                       |
| otherColor | String   | 信息点的颜色                            | "#000000“                                                    |
| posColor   | String   | 3 个定位点的颜色                        | "#000000"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_GXNlAKfTj3.jpg)

1.7QRBubble

| 参数名称    | 参数类型 | 参数功能                       | 默认值                                                       |
| ----------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| value       | String   | 二维码原始数据                 | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode      | QRCode   | 计算好的二维码点阵信息对象     |                                                              |
| level       | String   | 二维码的纠错级别               | "M"                                                          |
| className   | String   | 最外层 Svg 的 Class name       | ""                                                           |
| styles      | Object   | 组件内部可能用到的所有样式对象 | { svg: {} }                                                  |
| circleColor | String   | 圆圈颜色                       | "#8ED1FC"                                                    |
| posColor    | String   | 3 个定位点的颜色               | "#0693E3"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_FPVgDuRh4i.jpg)

1.8 QRFunc

| 参数名称    | 参数类型 | 参数功能                                                     | 默认值                                                       |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| value       | String   | 二维码原始数据                                               | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode      | QRCode   | 计算好的二维码点阵信息对象                                   |                                                              |
| level       | String   | 二维码的纠错级别                                             | "M"                                                          |
| className   | String   | 最外层 Svg 的 Class name                                     | ""                                                           |
| styles      | Object   | 组件内部可能用到的所有样式对象                               | { svg: {} }                                                  |
| funcType    | String   | 干扰函数类型(`"A", "B"`)                                     | "A"                                                          |
| type        | String   | 信息点显示类型(`"rect", "round"`)                            | "rect"                                                       |
| posType     | String   | 3 个定位点的显示类型 (`"rect", "round", "planet", "roundRect"`) | "rect"                                                       |
| otherColor1 | String   | 信息点的颜色                                                 | "#000000"                                                    |
| otherColor2 | String   | 干扰点的颜色                                                 | "#000000"                                                    |
| posColor    | String   | 3 个定位点的颜色                                             | "#000000"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_5V23WTDEp2.jpg)

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_315OD6s4N3.jpg)

1.9 QRLine

| 参数名称    | 参数类型 | 参数功能                                                     | 默认值                                                       |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| value       | String   | 二维码原始数据                                               | "[](https://qrbtf.com/)[https://qrbtf.com](https://qrbtf.com/ "https://qrbtf.com")" |
| qrcode      | QRCode   | 计算好的二维码点阵信息对象                                   |                                                              |
| level       | String   | 二维码的纠错级别                                             | "M"                                                          |
| className   | String   | 最外层 Svg 的 Class name                                     | ""                                                           |
| styles      | Object   | 组件内部可能用到的所有样式对象                               | { svg: {} }                                                  |
| funcType    | String   | 干扰函数类型(`"A", "B"`)                                     | "A"                                                          |
| posType     | String   | 3 个定位点的显示类型 (`"rect", "round", "planet", "roundRect"`) | "rect"                                                       |
| posColor    | String   | 3 个定位点的颜色                                             | "#000000"                                                    |
| direction   | String   | 连线方向(`"left-right", "up-down", "h-v", "loop", "topLeft-bottomRIght", "topRight-bottomLeft", "cross"`) | "left-right"                                                 |
| lineWidth   | Number   | 连线宽度                                                     | 50                                                           |
| lineOpacity | Number   | 连线不透明度                                                 | 100                                                          |
| lineColor   | String   | 连线颜色                                                     | "#000000"                                                    |

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_upXoJSSEf8.jpg)

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_XnbkMn4UWD.jpg)

使用范例

```javascript
import React from 'react'
import { QRNormal } from 'react-qrbtf'

class Component extends React.Component {
  render() {
    return <QRNormal value="https://8vs.com" />
  }
}
```

#### 自定义样式

新建 QRRound.js 文件

```javascript
import React from 'react'
import {
  defaultViewBox,
  getTypeTable,
  QRPointType,
  RendererWrapper
} from 'react-qrbtf'

const QRRound = (props) => {
  const { qrcode, className, styles } = props
  return (
    <svg
      className={className}
      style={styles.svg}
      width="100%"
      height="100%"
      viewBox={defaultViewBox(qrcode)}
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {listPoints(props)}
    </svg>
  )
}

function listPoints({ qrcode, size, dataColor }) {
  size = size / 100

  let id = 0
  //行数列数
  const nCount = qrcode.getModuleCount()
  //各个点位信息
  const typeTable = getTypeTable(qrcode)
  //存储最后的结果 svg
  const pointList = []
  for (let x = 0; x < nCount; x++) {
    for (let y = 0; y < nCount; y++) {
      // 填充的点位信息
      if (qrcode.isDark(x, y) == false) continue
      // 等于1
      if (typeTable[x][y] == QRPointType.POS_CENTER) {
        // 在3个定位点的中心生成同心的圆和环
        pointList.push(
          <circle key={id++} fill="#000000" cx={x + 0.5} cy={y + 0.5} r={1.5} />
        )
        pointList.push(
          <circle
            key={id++}
            fill="none"
            strokeWidth="1"
            stroke="#000000"
            cx={x + 0.5}
            cy={y + 0.5}
            r={3}
          />
        )
        // 等于3  4  5
      } else if (
        typeTable[x][y] == QRPointType.ALIGN_CENTER ||
        typeTable[x][y] == QRPointType.ALIGN_OTHER ||
        typeTable[x][y] == QRPointType.TIMING
      ) {
        // 特殊点使用黑色的圆点
        pointList.push(
          <circle
            opacity={1.0}
            r={size / 2}
            key={id++}
            fill="#000000"
            cx={x + 0.5}
            cy={y + 0.5}
          />
        )
        // 等于2
      } else if (typeTable[x][y] != QRPointType.POS_OTHER) {
        // 其他的信息点使用dataColor色的圆点
        pointList.push(
          <circle
            opacity={1.0}
            r={size / 2}
            key={id++}
            fill={dataColor}
            cx={x + 0.5}
            cy={y + 0.5}
          />
        )
      }
    }
  }

  return pointList
}
export default RendererWrapper(QRRound)
```

调用

```javascript
<QRRound value={'http://www.8vs.com/'} size={80} dataColor="#c95eb7" />
```

参数详解

```javascript
二维码中间图标参数
  icon: 图标地址，支持 jpg/png/svg等，gif动态图没测试过
  iconScale: 图标大小比例，不超过 0.33(默认)
  title: 显示的文字
  titleSize: 文字大小, 默认 12px
  titleColor: 文字颜色, 默认 黑色
  titleAlign: 文字位置, 支持 middel|bottom

  defaultViewBox: react-qrbtf默认对所有生成的二维码的四边有留白，如果您不喜欢，可以自行调整
  RendererWrapper: react-qrbtf提供的高阶组件(HOC)，
  封装了根据value计算qrcode，styles与defaultCSS的合并等等
  listPoints: 实际上只是为了代码的结构性而独立设置出来的函数，
  他根据传入的props来计算并返回一个包含<svg>相关标签的数组用于显示

  const nCount = qrcode.getModuleCount();//nCount就是计算出来的二维码的模块大小
  //getTypeTable对二维码进行逐点分类，返回一个记录了每一点类型的二维数组，
  const typeTable = getTypeTable(qrcode);

  //QRPointType是一个对不同点类型的枚举类型(Enum)，
  //类型名称可以对应上图 (CENTER后缀代表中心，OTHER后缀代表中心以外四周的点)

  typeTable.DATA[x][y] // 信息点
  typeTable.POS_CENTER[x][y] // 定位中心
  typeTable.POS_OTHER[x][y] // 定位点
  typeTable.ALIGN_CENTER[x][y] // 对齐中心
  typeTable.ALIGN_OTHER[x][y] // 对齐点
  typeTable.FORMAT[x][y] // 格式信息点
  typeTable.VERSION[x][y] // 版本信息点
  typeTable.TIMING[x][y] // 时钟
```

#### QE 码符号的结构

![](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_85Ewfb345Q.jpg)

## 项目核心模块的介绍

### 全局 Theme 设置

#### 调色板设置

![image\_U1nqIqml4m](https://cdn.jsdelivr.net/gh/NightSquirrl/cloudImages@master/20220516/image_U1nqIqml4m.webp "image_U1nqIqml4m")

```javascript
  palette: {
    // 默认主题颜色(按钮)
    primary: {
      main: "rgba(6, 161, 58, 1)",
    },
    // 次要主题颜色(输入框)
    secondary: {
      main: "#85bd8d",
    },
  },
```

#### 媒体查询断点设置

```javascript
  // 媒体查询断点
  breakpoints: {
    // 断点值(屏幕宽度)
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
```

#### 全局 Font 设置

```javascript
// 文字铸排
  typography: {
    // 文字变体(variant)
    // 全局默认字体大小16px(1rem=16px)
    // 标题
    h1: {
      // 默认字体大小
      fontSize: "5.125rem", //82px
      // 默认行高
      lineHeight: "6.4375rem",
      // 默认字重
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.875rem", lineHeight: "3.625rem", fontWeight: 700, 
      fontFamily: "Quicksand-Bold, Quicksand",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
      },
    }, //46px  24 pxpricing 标题
    h3: {
      fontFamily: "Quicksand-Bold, Quicksand",
      fontSize: "1.5rem",
      lineHeight: "3.625rem",
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "1.875rem",
      },
    }, //登录，注册标题  24px
    h4: { fontSize: "1.125rem", lineHeight: "1.5rem", fontWeight: 700, 
    fontFamily: "Quicksand-Bold, Quicksand", color: "#2A2A2A" }, //18px Narbar导航标签
    h5: { fontSize: "1rem", lineHeight: "1.25rem", fontWeight: 700, 
    fontFamily: "Quicksand-Bold, Quicksand", color: "#2A2A2A" },
     //16px 页脚顶部字体样式 solution
    h6: {
      fontSize: "1rem", lineHeight: "1.25rem", fontWeight: 500, 
      fontFamily: "Quicksand-Medium, Quicksand", color: "#2A2A2A",
      "@media (max-width:600px)": {
        fontSize: "0.75rem",
      },
    }, //16px 页脚顶部其他字体样式
```

#### 修改MUI组件的默认样式

```javascript
  components: {
    // 组件名称 修改MUI Input输入框的样式
    MuiInput: {
      styleOverrides: {
        // 插槽名称
        root: {
          fontSize: "1rem",
        },
      },
    },
    //修改MUI单选按钮的样式，按钮的大小
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "0.875rem",
          lineHeight: "1.125rem",
        },
      },
    },
    //修改Input输入框label的样式
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    }
  },
});
```

#### 全局 Context 的使用

```javascript
//引入createContext，以及useState

import React, { createContext, useState } from 'react'

// 创建Context对象

const GlobalContext = createContext()

//定义provide函数

function GlobalContextProvider({ children }) {

//将所有要共享的状态保存至

// 保存全局状态

const globalState ={

}
// 发布全局状态
return (
<React.Fragment>
<GlobalContext.Provider value={globalState}>
{children}
</GlobalContext.Provider>
</React.Fragment>
)
}
//将provide以及全局状态暴露出去
export { GlobalContext, GlobalContextProvider }

```

#### useLocalStorage

```javascript
//对localStorage的封装
// LocalStorage状态管理方法
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue]
}

```

#### 将状态存储至本地存储中

```javascript
  const [xxx, setXxx] = useLocalStorage("本地存储的名称", 对应的值);
  //该方法除了全局可以取到，并且会将对应的值保存至本地存储中
  //本地存储 关闭当前tab甚至于在关闭浏览器时候数据依旧会保存
```

#### 将状态使用useState存储

```javascript
const [xxx, setXxx] = useLocalStorage(对应的初试值);

```

#### 取出想要使用的全局状态

```javascript
//引入全局的状态
import { GlobalContext } from '../../utils/GlobalContext';
  const {
  //取出想要使用的状态
  } = React.useContext(GlobalContext)

```

### 页面路由跳转

#### 配置路由表

```javascript
// 全局路由管理文件
// REACT
import React from "react";
// ROUTER
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../page/Home";



export default function Router() {
    return (
        <BrowserRouter>
            {/* 路由模式 */}
            <Routes>
                {/* 主页 */}
                <Route path="/" element={<Home/>}/>
                //为没有配置的路由添加匹配页面
                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}


//在入口文件index.jsx 配置路由站位
import Router from './router/Router';
ReactDOM.render(
<React.StrictMode>
    <GlobalContextProvider>
      <GlobalTheme>
        <Router />
      </GlobalTheme>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

```

#### 通过点击实现路由跳转

```javascript
//从路由表依赖中引入useNavgite
import { useNavigate } from 'react-router-dom'
// 路由导航
const navigate = useNavigate()
onClick={()=>{ navgiate(/想要去的路由)}}
```

## 二维码生成流程

```javascript
//全局定义
const [qrcodeGenerator, setQrcodeGenerator] = useState('')
//存储生成二维码的字符串

```

### 二维码生成库的封装

> BuiltinDrawIcon.jsx
> CodeGenerationInterface.jsx
> CodeListPoints.jsx
> CodeListPointsCircle.jsx
> CodeListPointsDisturb.jsx
> CodeListPointsDSJ.jsx

#### CodeGenerationInterface.jsx

二维码生成界面，需要将二维码的类型、边框、logo的生成在此处进行拼接、并接收父组件传入的二维码信息。

#### 二维码样式与type的匹配

0→矩形、1→圆形、2→随机圆、3→左右、4→上下、5→纵横、6→回环、7→左上-右下、8→右上-左下、9→交叉、10→气泡、11→干扰线点、12→干扰线圆、13→DJS

#### CodeListPoints.jsx

普通二维码类型存储

包含type（0-9）类型的生成

#### CodeListPointsCircle.jsx

气泡类型的二维码，存储type=10

#### CodeListPointsDisturb.jsx

包含干扰线的二维码，存储type（11-12）

#### CodeListPointsDSJ.jsx

DJS手工类型的二维码，存储type=13

### 基本生成的流程

1. 全局状态定义

   ```javascript
   //二维码的value值
   const [qrcodeGenerator, setQrcodeGenerator] = useState('')
   // 颜色数值
   const [sketchColor, setSketchColor] = useLocalStorage('sketch_color', {
     r: '241',
     g: '112',
     b: '19',
     a: '1'
   })
   // 锚点颜色数值
   const [sketchColorAnchor, setSketchColorAnchor] = useLocalStorage(
     'sketch_color_Anchor',
     {
       r: '241',
       g: '112',
       b: '19',
       a: '1'
     }
   )
   // 定位点样式
   const [styleEdgeType, setStyleEdgeType] = useLocalStorage('style_edge_type', 0)
   // 二维码边框的样式
   const [frameStyle, setFrameStyle] = useLocalStorage("frame_style", 0)
   //预定义的logo样式状态
   const [logoStyle, setLogoStyle] = useLocalStorage("logo_style", 0)
   //用户上传的logo状态
   const [uploadLogo, setuploadLogo] = useLocalStorage("upload_logo", "")
   ```

2. 将二维码value传入

   \<CodeGenerationInterface value={qrcodeGenerator}/>

3. 用户选择自己的二维码的样式

   所有的状态值保存至全局

### 文本自动生成类型(website、text、appstore)

```javascript
//每一个都属于一个多行文本输入框
//事件绑定
// website多行文本输入框，当输入框改变时生成二维码
  const handleWebsiteChange = (event) => {
  //为当前的输入框的value绑定一个特定的状态，防止多个状态共享一个状态产生的干扰
    setWebsiteValue(event.target.value)
    // 设置二维码的状态
    setQrcodeGenerator(event.target.value)
    //以为二维码是在前端生成的，当拿到字符串之后生成的时间是立即生成
    //为了转移用户的注意力，所以需要一个圆形绿色的进度条，在50毫秒之后触发
    if (circularProgress === 100) setCircularProgress(0)
    setTimeout(() => {
      setCircularProgress(100)
    }, 500)
  }
  //传值 生成二维码
  <CodeGenerationInterface value={qrcodeGenerator}/>

```

#### 文件上传手动生成类型(mp3、pdf、image)

1.  通过点击或者和拖拽上传多个或者单个文件

2.  将上传的文件列表展示到界面，并且可以点击右上角的按钮移除对应的文件

3.  上传成功之后会拿到后台给我们的存储连接地址

4.  将存储链接地址传入保存二维码信息的全局状态之中生成相对应的二维码

5.  用户点击Generate按钮才会生成二维码

#### 文本手动生成类型(vcard、eMail、wifi、sms）

1. 数据定义

   ```javascript
   //所有的输入框等均使用form表单包括
   //所有的输入框添加name属性
   //为form标点添加id
   //获取form的dom元素
   let xxxFrom = document.getElementById('xxx)
   let xxxFormData = new FormData(xxxForm)
   xxxForm.get('name')//获取到输入框对应的数值
   
   ```

2. 数据拼接

   vcard

   ```javascript
   ` BEGIN:VCARD
   VERSION:3.0
   N:${vCardFormData.get('lastName')};${vCardFormData.get('firstName')}
   FN:${vCardFormData.get('firstName')} ${vCardFormData.get('lastName')}
   ORG:${vCardFormData.get('company')}
   TITLE:${vCardFormData.get('yourJob')}
   ADR:;;;${vCardFormData.get('city')};${vCardFormData.get(
     'state'
   )};${vCardFormData.get('zip')};${vCardFormData.get('country')}
   TEL;WORK;VOICE:${vCardFormData.get('phone')}
   TEL;CELL:${vCardFormData.get('mobileNumber')}
   TEL;FAX:${vCardFormData.get('fax')}
   EMAIL;WORK;INTERNET:${vCardFormData.get('mail')}
   URL:${vCardFormData.get('web')}
   END:VCARD
   `
   ```

   email

   ```javascript
   `MATMSG:TO:${emailFormData.get('emailAddress')};
   SUB:${emailFormData.get('emailSubject')};
   BODY:${emailFormData.get('emailMessage')};`
   ```

   wifi

   ```javascript
   `WIFI:T:自定义的数据;S:自定义的数据;P:自定义的数据;H;;`
   ```

   sms

   ```javascript
   `SMSTO:自定义数据:自定义数据`
   ```

3. 生成二维码

   每一个表单form绑定onChange事件，完成模板字符串的拼接，存储至一个变量中去

   当用户点击生成按钮之后调用onChange事件，拿到返回值，将返回值设置为二维码value

#### 二维码存储历史记录流程

1. 历史记录生成的原理

    1.  Website、vCard、Email、Text、WiFi、App Stores、SMS当用户输入或者点击生成按钮之后会生成一个二维码，但是不会保存到数据库中，当用户选择时间（默认时间一天）然后点击保存之后，会将二维码的信息存储到数据库中
        MP3、Images、PDF当用户点击生成按钮之后，就会自动保存（默认一天），而后用户根据自己的意愿保存二维码

    2.  当数据存入数据库之后，当用点击进入历史按钮之后，便会根据当前用户的id查询数据库中的数据

2. 具体实现、

   二维码保存→文件路径：page/component/BeautifyTab.jsx

   ```javascript
     // 网络请求
     const saveQrCodeFunction = async () => {
       // 判断当前用户是否登录
       // 初始化二维码的类型
       let codeType = ''
       // 判断当前保存二维码的类型，根据当前用户选择的tab标签匹配对应的类型
       switch (String(qrCodeClassTab)) {
         case '0':
           codeType = 'Website'
           break
         case '1':
           codeType = 'MP3'
           break
         case '2':
           codeType = 'Images'
           break
         case '3':
           codeType = 'PDF'
           break
         case '4':
           codeType = 'vCard'
           break
         case '5':
           codeType = 'Email'
           break
         case '6':
           codeType = 'Text'
           break
         case '7':
           codeType = 'WiFi'
           break
         case '8':
           codeType = 'AppStores'
           break
         case '9':
           codeType = 'SMS'
           break
         default:
           break
       }
   
       // 保存的网络请求
       const { data: res } = await axios.post(saveQrCodeUrl, {
         data: `{${codeType}:"${qrcodeGenerator}"}`,
         code_type: codeType,
         user_id: userName,
         expires: selectedAging
       })
       如果当前的返回的状态为3000则成功，在左下角弹出成功的下
       if (res.status !== 3000) {
         setSaveQrCodeOpen(false)
       }
       setSaveQrCodeOpen(true)
     }
   ```

## UI 界面难点实现方案

#### 首页二维码 tab 切换

使用MUI中的无样式系统

```javascript
//引入MUI的样式系统
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
//每一个tab标签的样式封装
const Tab = styled(TabUnstyled)`
  color: #000000;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 0.875rem;
  background-color: transparent;
  border: none;
  text-align: center;
  border-bottom: 2px solid rgba(6, 161, 58, 1);
  margin: 0px;
  padding: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: center;
  //tab标签选中后的样式
  &.${tabUnstyledClasses.selected} {
  选中之后上、左、右添加绿色边框，下添加白色的边框
    border: 2px solid rgba(6, 161, 58, 1);
    border-bottom: 0px solid #ffffff;
    color: #000000;
  }
`
// 切换内容体的样式
const TabPanel = styled(TabPanelUnstyled)`
  width: 800px;
  font-size: 0.875rem;
  boxSizing: 'border-box',
  //为每一个内容的边框添加绿色的边框
  border: '2px solid rgba(6, 161, 58, 1)',
`

HTML
<TabsUnstyled
  defaultValue={0}>
>
//包裹所有的tab
  <TabsList>
    <Tab>1<Tab/>
    <Tab>2<Tab/>
    <Tab>3<Tab/>
  <TabsList/>
  //tab对应的内容体
  <TabPanel>1<TabPanel/>
  <TabPanel>2<TabPanel/>
  <TabPanel>3<TabPanel/>
<TabsUnstyled/>

```

#### 首页半圆凹形边框

方式一

```javascript
//tab切换、中间凹陷边框、右侧生成区域采用弹性盒子布局居中
//中间定义出一个父亲盒子采用relective布局
//内部定义三个平级的盒子
1.圆形
//上边框以及左边框颜色相同、右边框、下边框颜色相同
//逆时针旋转45deg
//采用绝对布局
   <Box
    sx={{
      background: '#FAFAFA',
      width: '65px',
      height: '65px',
      borderTop: '2px solid rgba(6, 161, 58, 1)',
      borderLeft: '2px solid rgba(6, 161, 58, 1)',
      borderBottom: '2px solid rgba(0, 0, 0, 0.06)',
      borderRight: '2px solid rgba(0, 0, 0, 0.06)',
      borderRadius: '50%',
      transform: ' rotateZ(-45deg)',
      position: 'absolute'
    }}
  ></Box>
  2.虚线以及灰色圆圈
  //使用img图片的形式，同样采用absolute布局
  3.遮罩条子，负责将一个完整的愿遮罩成两个相对较小的半圆
     {/* 遮罩条子 */}
<Box
  sx={{
    background: '#FAFAFA',
    width: '40px',
    height: '348px',
    position: 'absolute',
    zIndex: '1'
  }}
>
  <img src="/images/dottedLine.png" alt="" />
</Box>


```

方式二

> 上述方法存在色差

使用svg图生成两侧不同的圆形边框，解决色差

