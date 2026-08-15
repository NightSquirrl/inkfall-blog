---
title: pdfjs 源码基本说明
tag:
  - pdfjs
  - 前端
---


# pdfjs

## 目录


[pdf页面生成的原理](#pdf页面生成的原理)

[在pdf渲染到页面的方式](#在pdf渲染到页面的方式)
  [1. canvas](#1-canvas)\
  [2. svg渲染模式](#2-svg渲染模式)

[API介绍-函数的封装](#api介绍-函数的封装)
  [安装](#安装)\
  [引入](#引入)\
  [htmlCode](#htmlcode)\
  [函数功能封装](#函数功能封装)

## pdf.js

### pdf页面生成的原理

> 默认状态下pdfjs所渲染的pdf在DOM上一共成现为三层状态

第一层：canvas画布层，将pdf转换为canvas可识别的元素，然后通过canvas直接绘制在页面上，此时的pdf就是一张图片一样，不具备任何的功能「选中等」。

第一层有两种模式：

模式一：canvas，特点像一张图片一样，可以在画上额外的画一下其他的内容，比如水印。缺点见下。

模式二：svg模式，特点，所有的文字、图片，都会被转换为svg的DOM元素

第二层：文本层，会将pdf上的文字转换为以div、span的形式展示在页面上，此时的文字精准的覆盖在canvas画布层。

可以控制盖层是否开启。

第三层：注释层，像一些额外的画笔，添加的文字，以及文字的超链接，包括form填写的表单均在这一层上。

> 此三层一次叠加，覆盖，就上一层一样，进而实现PDF的预览，以及填写和选中。

### 在pdf渲染到页面的方式

#### 1. canvas

依赖的安装

```javascript
npm i pdf-dist -D
```

异步获取pdf

```javascript
  const url = '../example.pdf'
    //必须手动指定 workerSrc ，不然会抛出 Setting up fake worker failed 的错误
     pdfjsLib.GlobalWorkerOptions.workerSrc =
      '../../node_modules/pdfjs-dist/build/pdf.worker.js';
  const loadingTask = pdfjsLib.getDocument(url);

    (async () => {
      const pdf = await loadingTask.promise;
      //
      // 获取页面的第一页
      //
      const page = await pdf.getPage(1);
      //设置页面的缩放
      const scale = 1.5;
      //pdf预览的视口
      const viewport = page.getViewport({ scale });
      // Support HiDPI-screens.
      const outputScale = window.devicePixelRatio || 1;

      //
      // 使用PDF页面尺寸准备画布
      //
      const canvas = document.getElementById("the-canvas");
      const context = canvas.getContext("2d");
      //
      //页面渲染
      //
       const renderContext = {
        canvasContext: context,
        viewport,
      };
      page.render(renderContext);

```

#### 2. svg渲染模式

htmlCode

```javascript
  //创建容器
  <div id="viewerContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>
  //要注意的是容器的布局必须是绝对布局
    #viewerContainer {
      overflow: auto;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    //否则报错
```

jsCode

```javascript
    //必须手动指定 workerSrc ，不然会抛出 Setting up fake worker failed 的错误
     pdfjsLib.GlobalWorkerOptions.workerSrc =
      '../../node_modules/pdfjs-dist/build/pdf.worker.js';
    //有些pdf需要外部的cmap
    const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
    const CMAP_PACKED = true;
    //pdf文件地址
    const DEFAULT_URL = "../../Flutter基础学习笔记.pdf";
    //获取容器
    const container = document.getElementById("viewerContainer");
    //
    const eventBus = new pdfjsViewer.EventBus();

    //pdf中启用超链接服务
    const pdfLinkService = new pdfjsViewer.PDFLinkService({
      eventBus,
    });

    const pdfViewer = new pdfjsViewer.PDFViewer({
      container,//显示的容器
      eventBus,
      linkService: pdfLinkService,
      renderer: "svg",//渲染的模式
      textLayerMode: 0,//选在文字类型，渲染文字图层，如果是1的话则在svg层再加一层
      //dom层，文字等均由div、span组成
    });
    pdfLinkService.setViewer(pdfViewer);
    
    eventBus.on("pagesinit", function () {
      // 
      pdfViewer.currentScaleValue = "page-width";
    });
    
    // 进行文档的加载
    const loadingTask = pdfjsLib.getDocument({
      url: DEFAULT_URL,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
    });
    loadingTask.promise.then(function (pdfDocument) {
      // 开始进行页面的渲染
      // 
      pdfViewer.setDocument(pdfDocument);
    
      pdfLinkService.setDocument(pdfDocument, null);
    });
```

### API介绍-函数的封装

#### 安装

```javascript
npm i pdfjs-dist
```

#### 引入

> 必须手动指定 `workerSrc` ，不然会抛出 `Setting up fake worker failed` 的错误。

```javascript
import * as PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc
 = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`


```

#### htmlCode

```javascript
<canvas id="pdfCanvas"></canvas>
```

#### 函数功能封装

1. 变量初始化

   ```javascript
   let  pdfDoc= null,// PDFJS 实例
         currentPage= 1,
         width= 0,
         height= 0,
         rendering= false,  // 是否位于队列中
         totalPage= 1,
         url="http://127.0.0.1:5501/111.pdf",
         watermark= "watermark",
   ```

2. 初始化pdf

   ```javascript
    //执行函数
    initPdf('url')
    initPdf(url) {
         PDFJS.getDocument(this.url).promise.then((pdf) => {
           // 文档对象
           pdfDoc = pdf;
           // 总页数
           totalPage = pdf.numPages;
           // 调用函数渲染页面
            renderPage();
         });
       },
   ```

3. 渲染页面

   ```javascript
      renderPage() {
         pdfDoc.getPage(this.currentPage).then((page) => {
           let canvas = document.querySelector("#pdfCanvas");
           let ctx = canvas.getContext("2d");
           // 函数调用获取页面比率
           let ratio = getRatio(ctx);
   
           //pdf渲染窗口大小的计算
           let dialogWidth = 1000;
           let pageWidth = page.view[2]*  ratio;
           let scale = dialogWidth / pageWidth;
   
           let viewport = page.getViewport({ scale });
   
           // 记录内容区宽高，后期添加水印时需要
           width = viewport.width*  ratio;
           height = viewport.height*  ratio;
   
           canvas.width = this.width;
           canvas.height = this.height;
   
           // 缩放比率
           ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
   
           page
             .render({
               canvasContext: ctx,
               viewport,
             })
             .promise.then(() => {
             //队列结束
             rendering = false
             // 渲染水印
             this._renderWatermark();
             });
         });
       },
   ```

4. 获取页面比率

   ```javascript
    getRatio(ctx) {
         let dpr = window.devicePixelRatio || 1;
         let bsr =
           ctx.webkitBackingStorePixelRatio ||
           ctx.mozBackingStorePixelRatio ||
           ctx.msBackingStorePixelRatio ||
           ctx.oBackingStorePixelRatio ||
           ctx.backingStorePixelRatio ||
           1;
         return dpr / bsr;
       },
   ```

5. 水印的添加

   > 方案一：准备一个 div 作为透明的遮罩层挡在内容区的上层，然后将 canvas 绘制的水印使用 `canvas.toDataURL('image/png')` 导出成 Base64 格式，作为遮罩层的背景图片进行平铺。 虽然可以实现效果，但这种方式只要简单的打开浏览器控制台，删除这个遮罩层就可以去除水印。
   > 方案二：canvas 其实是可以将一个 canvas 作为图片绘制到自身上的，流程就是先使用canvas绘制一个水印出来然后将这个canvas以图片的方式绘制在另一个canvas「pdf的canvas」

   水印绘制

   ```javascript
   initWatermark () {
       let canvas = document.createElement('canvas');
       canvas.width = 200
       canvas.height = 200
   
       let ctx = canvas.getContext('2d')
       ctx.rotate(-18 * Math.PI / 180)
       //所要绘制的文字的大小
       ctx.font = '14px Vedana'
       ctx.fillStyle = 'rgba(200, 200, 200, .3)'
       ctx.textAlign = 'left'
       ctx.textBaseline = 'middle'
       ctx.fillText(this.watermark, 50, 50)
   
       return canvas
     }
   
   ```

   将水印绘制在pdf的画布上

   ```javascript
   renderWatermark () {
       let canvas = document.querySelector('#pdfCanvas')
       let ctx = canvas.getContext('2d')
       // 平铺水印
       let pattern = ctx.createPattern(this._initWatermark(), 'repeat')
       ctx.rect(0, 0, this.width, this.height)
       ctx.fillStyle = pattern
       ctx.fill()
     }
   
   ```

6. 页面跳转

   准备渲染队列，防止渲染顺序混乱

   ```javascript
   renderQueue () {
       if (this.rendering) {
         return
       }
   
       renderPage()
     }
   ```

   页面跳转函数

   ```javascript
   // 跳转到首页
     firstPageHandler () {
       if (this.firstPage) {
         return
       }
   
       currentPage = 1
       renderQueue()
     },
     // 跳转到尾页
     lastPageHandler () {
       if (this.lastPage) {
         return
       }
   
       currentPage = this.totalPage
       renderQueue()
     },
     // 上一页
     previousPage () {
       if (this.firstPage) {
         return
       }
   
       currentPage--
       renderQueue()
     },
     // 下一页
     nextPage () {
       if (this.lastPage) {
         return
       }
   
       currentPage++
       renderQueue()
     }
   ```
