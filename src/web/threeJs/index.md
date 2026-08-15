---
title: 06. ThreeJS入门教程 
icon: skill-icons:threejs-dark
tag:
  - three.js
top: 7
recommend: 1
---

> 文档地址:https://www.three3d.cn/
>
> 官网文档地址:https://threejs.org/



## 基本的使用

### 依赖引入

```js
// 导入threejs
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

```

### 创建场景

```js
const scene = new THREE.Scene();
```

### 相机

```js
const camera = new THREE.PerspectiveCamera(
	45,
  window.innerWidth/window/innerHeight,
  0.1,
  1000
)
//设置相机的位置
camera.position.set(5, 5, 10);
camera.lookAt(0,0,0)
```

### 添加渲染器

```js
cosnt renderer = new THREE.WebGLRenderer();
renderer.setrSize(window.innerWidth,window.inerHeight);
document.body.appendChild(render.domElement)
```

### 创建几何体

```js
//创建几何体
const geometry new = THREE.BoxGeometry(1,1,1);
//创建材质
const material new = THREE.MeshBasicMaterial({color:0x00ff00 })
//创建网格
const cube new=THREE.Mesh(geometry,material);
// 设置坐标
cube.position.set(x,y,z) // 相对于父元素
// 设置缩放
cube.scale.set(x,y,z)  //  父元素放大,子元素也会放大
// 旋转

cube.rotation.set(x,y,z,order)// order 旋转的顺序

//将网格添加到场景中
scene.add(cube);
```

### 添加世界坐标系

```js
const axesHelper = new THREE.AxesHelper(5)
```

### 添加到场景

```js
scene.add(axesHelper)
```

### 轨道控制器

```js
const controls =  new OrbitControls(camera,renderer.domElement);
//设置带阻尼的惯性
controls.enableDamping=true;
//设置阻尼系数
controls.dampingFactor=0.05;
//设置旋转速度
controls.autoRotate=true;
```

### 画布自适应窗口

```js
//监听窗口变化
window.addEventListener("resize",()=>{
//重置渲染器宽高比
renderer.setsize(window.innerWidth,window.innerHeight);
//重置相机宽高比
camera.aspect = window.innerWidth window.innerHeight;
//更新相机投影矩阵
camera.updateProjectionMatrix();
});
```

### 全屏

```js
renderer.domElement.requestFullscreen()
renderer.domElement.exitFullscreen()
```

### GUI调试开发

```js
import {GUI} from "three/example/jsm/lib/lil-gui.module.min.js"


let eventobj =
    Fullscreen:function () {
      //全屏
      document.body.requestFullscreen();
      console.1og("全屏")；
    },
      ExitFullscreen:function () {
        document.exitFullscreen();
        console.1og("退出全屏")；
      },
}

//创建 GUI
const gui = new GUI();

gui.add(eventObj,"Fullscreen").name("全屏")
//控制立方体
//添加折叠
let folder = gui.addFolder("立方体位置")
folder.add(cube.position,"x").min(-10).max(10).set(1).name("立方体 X 轴的位置").onChange(()=> {})
```

### 正确处理动画运动

> 为了最好的利用性能和渲染效果，那么我们只需要在绘制每一帧画面的时候，计算需要渲染的画面即可。这个时候就可以使用window.requestAnimationFrame方法。

```javascript
function callback(){
  //下一帧渲染画面前，需要执行处理的函数
}
window.requestAnimationFrame(callback);
```

#### 解决确保不同帧率的画面运行速度一致

```js
let preTime;
function render(time) {
  //第一次调用render函数，没有上一帧的时间
  if (preTime === undefined) {
    preTime = time;
  }

  //计算每帧画面的间隔时间，单位毫秒
  const deltaTime = time - preTime;
  console.log(deltaTime)
  //保留当前时间作为上一帧时间，用于下一帧计算2帧间隔
  preTime = time;
  //renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
```

## 全面认识物体

### 1. 图元与 3D 形状

> 所有的图形都是由单一的三角形形成的

#### 1.1 BoxGeometry

盒子几何体，BoxGeometry是四边形的原始几何类，它通常使用构造函数所提供的“width”、“height”、“depth”参数来创建立方体或者不规则四边形。

![img](https://img.picgo.net/2023/11/21/1668242187269-a562af07-0938-4978-b263-5ca412eaa3d6adeda4a8b226ec36.gif)

```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```

#### 1.2 球缓冲几何体（SphereGeometry）

```js
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
```

#### 1.3 平面缓冲几何体（PlaneGeometry

![img](https://img.picgo.net/2023/11/21/1668246917510-a61daa20-8a6b-4555-ab17-8a8da87402c0fcc786841eac2a62.png)

```js
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
```

#### 1.4 圆形缓冲几何体（CircleGeometry）

CircleGeometry是欧式几何的一个简单形状，它由围绕着一个中心点的三角分段的数量所构造，由给定的半径来延展。 同时它也可以用于创建规则多边形，其分段数量取决于该规则多边形的边数。

```js
const geometry = new THREE.CircleGeometry( 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( geometry, material );
scene.add( circle );
```

#### 1.5 圆锥缓冲几何体（ConeGeometry）

```js
const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( geometry, material );
scene.add( cone );
```

#### 1.6 圆柱缓冲几何体（CylinderGeometry）

```js
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );
```

#### 1.7十二面缓冲几何体（DodecahedronGeometry）

```js
const radius = 7;  // ui: radius
const geometry = new THREE.DodecahedronGeometry(radius);
```

#### 1.8 边缘几何体（EdgesGeometry）

```js
const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );
```

#### 1.9 挤压缓冲几何体（ExtrudeGeometry）

从一个形状路径中，挤压出一个BufferGeometry。受挤压的 2D 形状，及可选的斜切。 这里我们挤压了一个心型。

![img](https://img.picgo.net/2023/11/21/1668246168131-643ecfb5-68c9-44d9-81ff-78f54731f605d82254d774d37376.gif)

```js
const shape = new THREE.Shape();
const x = -2.5;
const y = -5;
shape.moveTo(x + 2.5, y + 2.5);
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

const extrudeSettings = {
  steps: 2,  // ui: steps
  depth: 2,  // ui: depth
  bevelEnabled: true,  // ui: bevelEnabled
  bevelThickness: 1,  // ui: bevelThickness
  bevelSize: 1,  // ui: bevelSize
  bevelSegments: 2,  // ui: bevelSegments
};

const geometry = THREE.ExtrudeGeometry(shape, extrudeSettings);
```

#### 1.10 形状缓冲几何体（ShapeGeometry）

![img](https://img.picgo.net/2023/11/21/1668247133884-ebfaa3f8-2350-4f35-bef8-5c02c7eb1a35d132a3bb58c129f0.png)

```javascript
const shape = new THREE.Shape();
const x = -2.5;
const y = -5;
shape.moveTo(x + 2.5, y + 2.5);
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
const geometry = new THREE.ShapeGeometry(shape);
```

#### 1.11 二十面缓冲几何体（IcosahedronGeometry）

```javascript
const radius = 7;  // ui: radius
const geometry = new THREE.IcosahedronGeometry(radius);
```

#### 1.12 车削缓冲几何体（LatheGeometry）

创建具有轴对称性的网格，比如花瓶。车削绕着Y轴来进行旋转。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668246758260-4301d4f3-10a5-4a96-b7ce-56cba6d3cb16.png)

```javascript
const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const geometry = new THREE.LatheGeometry( points );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const lathe = new THREE.Mesh( geometry, material );
scene.add( lathe );
```

#### 1.13 八面缓冲几何体（OctahedronGeometry）

一个用于创建八面体的类。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668246839464-7bc9d7e2-f21c-49b1-a028-72d3377b4d08.png)

```javascript
const radius = 7;  // ui: radius
const geometry = new THREE.OctahedronGeometry(radius);
```

#### 1.14 多面缓冲几何体（PolyhedronGeometry）

多面体在三维空间中具有一些平面的立体图形。这个类将一个顶点数组投射到一个球面上，之后将它们细分为所需的细节级别。 这个类由DodecahedronGeometry、IcosahedronGeometry、OctahedronGeometry和TetrahedronGeometry 所使用，以生成它们各自的几何结构。将一些环绕着中心点的三角形投影到球体上。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247032250-0ebae146-96a9-4123-8dc0-fe9b9f5bacb7.png)

```javascript
const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
```

#### 1.15 圆环缓冲几何体（RingGeometry）

一个用于生成二维圆环几何体的类。中间有洞的 2D 圆盘

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247090385-e5bc48c2-a53b-49ba-9e10-326fd92fcbdd.png)

```javascript
const geometry = new THREE.RingGeometry( 1, 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

#### 1.16 四面缓冲几何体（TetrahedronGeometry）

一个用于生成四面几何体的类。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247361129-bc28e329-bc38-4bc2-a8c4-cc6f2594024e.png)

```javascript
const radius = 7;  // ui: radius
const geometry = new THREE.TetrahedronGeometry(radius);
```

#### 1.17 圆环缓冲几何体（TorusGeometry）

一个用于生成圆环几何体的类。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247423559-a3a56814-5b5f-4e86-b2fc-f7306ccc7aef.png)

```javascript
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );
```

#### 1.18 圆环缓冲扭结几何体（TorusKnotGeometry）

创建一个圆环扭结，其特殊形状由一对互质的整数，p和q所定义。如果p和q不互质，创建出来的几何体将是一个环面链接。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247481750-49c77b4c-8d0e-4397-adb5-e9506801b3c1.png)

```javascript
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );
```

#### 1.19 管道缓冲几何体（TubeGeometry）

创建一个沿着三维曲线延伸的管道。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247533817-629b82ec-2f1e-453a-a50d-9b984babbd22.png)

```javascript
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

#### 1.20 网格几何体（WireframeGeometry）

这个类可以被用作一个辅助物体，来对一个geometry以线框的形式进行查看。

![img](https://threejs-1251830808.cos.ap-guangzhou.myqcloud.com/1668247580488-69e0e01e-41f8-4b19-9b3d-71e9ff4ce3eb.png)

```javascript
const geometry = new THREE.SphereGeometry( 100, 100, 100 );

const wireframe = new THREE.WireframeGeometry( geometry );

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

scene.add( line );
```

## BufferGeometry的使用

### 使用索引绘制

```js
// 创建几何体
const geometry = new THREE.BufferGeometry();
// 使用索引绘制
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0,
]);
// 创建顶点属性
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// 创建索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

console.log(geometry);
// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide,
  wireframe: true,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
```

## 顶点组

```js
 // 创建几何体
const cubegeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建不同材质
const cubematerial0 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cubematerial1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const cubematerial2 = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
});
const cubematerial3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const cubematerial4 = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const cubematerial5 = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
});
// 创建总合材质 --- 给不同的面设置不同的颜色
const cube = new THREE.Mesh(cubegeometry, [
  cubematerial0,
  cubematerial1,
  cubematerial2,
  cubematerial3,
  cubematerial4,
  cubematerial5,
]);
// 将网格添加到场景中
scene.add(cube);
```

## 基础材质纹理贴图使用

### 创建纹理加载器

```js
// 创建纹理加载器
let textureLoader = new THREE.TextureLoader();
```

```js
// 加载纹理
let texture = textureLoader.load(
  "./texture/watercover/CityNewYork002_COL_VAR1_1K.png"
);
```

![CityNewYork002_COL_VAR1_1K](https://img.picgo.net/2023/11/21/CityNewYork002_COL_VAR1_1Kb053fea738305249.png)

> AO 贴图
>
> Ambient Occlusion（环境遮挡*贴图*）简称*AO贴图*，
>
> *Ao贴图*记录了物体的凹凸，上下的光影变化信息。

```js

// 加载ao贴图
let aoMap = textureLoader.load("./texture/watercover/CityNewYork002_AO_1K.jpg");

```

![CityNewYork002_COL_VAR2_1K](https://img.picgo.net/2023/11/21/CityNewYork002_COL_VAR2_1K1992b5c25bdbb3ef.png)

> 透明度贴图
>
> 白色不透明
>
> 黑色完全透明

```js

// 透明度贴图
let alphaMap = textureLoader.load("./texture/door/height.jpg");

```

> 光照贴图

```js
// 光照贴图
let lightMap = textureLoader.load("./texture/colors.png");
```

> 高光贴图

```js
// 高光贴图
let specularMap = textureLoader.load(
  "./texture/watercover/CityNewYork002_GLOSS_1K.jpg"
);
```

> 环境贴图 360
>
> HRD

```js
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// rgbeLoader 加载hdr贴图
let rgbeLoader = new RGBELoader();
rgbeLoader.load("./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // 设置环境贴图
  scene.background = envMap;
  // 设置环境贴图
  scene.environment = envMap;
  // 设置plane的环境贴图
  planeMaterial.envMap = envMap;
});
```

> 最后应用之前的材质

```js
let planeGeometry = new THREE.PlaneGeometry(1, 1);

let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture,
  // 允许透明
  transparent: true,
  // 设置ao贴图
  aoMap: aoMap,
  aoMapIntensity: 1,
  // 透明度贴图
  // alphaMap: alphaMap,
  // 设置光照贴图
  // lightMap: lightMap,
  // 设置高光贴图
  specularMap: specularMap,
  reflectivity: 0.5,
});

// planeMaterial.map = texture;
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
```

## 纹理颜色空间

> 设置纹理的颜色空间

```js
// 加载纹理
let texture = textureLoader.load(
  "./texture/watercover/CityNewYork002_COL_VAR1_1K.png"
);

texture.colorSpace = THREE.SRGBColorSpace; //SRGB
// texture.colorSpace = THREE.LinearSRGBColorSpace; // 线性

```



## 指数雾和线性雾

```js
// 创建场景fog
scene.fog = new THREE.Fog(0x999999, 0.1, 50);
// 创建场景指数fog
// scene.fog = new THREE.FogExp2(0x999999, 0.1);
scene.background = new THREE.Color(0x999999);
```

## 加载 GLTF 模型

> 依赖引入

```js
// 导入gltf加载器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

```

```js
// 实例化加载器gltf
const gltfLoader = new GLTFLoader();
// 加载模型
gltfLoader.load(
  // 模型路径
  "./model/Duck.glb",
  // 加载完成回调
  (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
  }
);
```

> 设置鸭子的环境贴图

```js
// 加载环境贴图
let rgbeLoader = new RGBELoader();
rgbeLoader.load("./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // 设置环境贴图
  scene.environment = envMap;
});
```

> 使用解压缩解析器 draco

```js
// 导入draco解码器
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

```



> 单独从依赖文件中拿出来

```js
// 实例化加载器draco
const dracoLoader = new DRACOLoader();
// 设置draco路径
dracoLoader.setDecoderPath("./draco/");
// 设置gltf加载器draco解码器
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(
  // 模型路径
  "./model/city.glb",
  // 加载完成回调
  (gltf) => {
    // console.log(gltf);
    scene.add(gltf.scene);
  }
);
```

## 光线投射实现与 3d 物品的交互

```js
// 创建射线
const raycaster = new THREE.Raycaster();
// 创建鼠标向量
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY);
  // 设置鼠标向量的x,y值 坐标归一化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

  // console.log(mouse.x, mouse.y);
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);

  // 计算物体和射线的焦点
  const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
//设置点击物品的颜色和恢复
  if (intersects.length > 0) {
    // console.log(intersects[0].object);
    if (intersects[0].object._isSelect) {
      console.log(intersects[0].object._originColor);
      intersects[0].object.material.color.set(
        intersects[0].object._originColor
      );
      intersects[0].object._isSelect = false;
      return;
    }

    intersects[0].object._isSelect = true;
    intersects[0].object._originColor =
      intersects[0].object.material.color.getHex();
    intersects[0].object.material.color.set(0xff0000);
  }

  console.log(intersects);
});

```

## 补间动画

> 创建一个球

```js
// 创建1个球
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  })
);
sphere1.position.x = -4;
scene.add(sphere1);
```

> 添加动画

```js

const tween = new TWEEN.Tween(sphere1.position);


// 一秒内实现从 -4 到  4 的变化
tween.to({ x: 4 }, 1000);
tween.onUpdate(() => {
  console.log(sphere1.position.x);
});
// 设置循环无数次
// tween.repeat(Infinity);
// 循环往复
// tween.yoyo(true);
// tween.repeat(2);
// tween.delay(3000);
// 设置缓动函数
tween.easing(TWEEN.Easing.Quadratic.InOut);

let tween2 = new TWEEN.Tween(sphere1.position);
tween2.to({ x: -4 }, 1000);
// 从一的位置到 2 的位置 ,1 结束之后继续执行 2
tween.chain(tween2);
tween2.chain(tween);
// 启动补间动画
tween.start();
tween.onStart(() => {
  console.log("开始");
});
tween.onComplete(() => {
  console.log("结束");
});
tween.onStop(() => {
  console.log("停止");
});
tween.onUpdate(() => {
  console.log("更新");
});
let params = {
  stop: function () {
    tween.stop();
  },
};

gui.add(params, "stop");

```

