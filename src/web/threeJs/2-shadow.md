---
title: 光
tag:
  - three.js
recommend: 2
---



## 光照

> 目标：灯光与阴影
> //灯光阴影
> //1、材质要满足能够对光照有反应
> /2、设置渲染器开启阴影的计算renderer,shadowMap,enabled=true;
> //3、设置光照投射阴影directionalLight.castshadow=true;
> //4、设置物体投射阴影sphere,castshadow=true;
> //5、设置物体接收阴影plane.receiveShadow=true;



1. 开启场景中的阴影贴图

```js
renderer.shadowMap.enabled = true
```

2. 环境光（AmbientLight）

```js
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

```

3. 直线光源

```js
/直线光源
const directionalLight new  = THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(5,5,5);
directionalLight.castshadow = true;
```

4.投射阴影

```js
sphere.castShadow = true
```

5. 平面接收阴影

```js
//创建平面
const planeGeometry new  = THREE.PlaneBufferGeometry(10,10);
const plane = new THREE.Mesh(planeGeometry,material);
plane.position.set(0,-1,0);
plane.rotation.x =-Math.PI 2;
//接收阴影
plane.receiveshadow  = true;
scene.add(plane);
```

6. 设置阴影

```js
//设置阴影贴图模糊度
directionalLight.shadow.radius = 20;
//设置阴影贴图的分辨率
directionalLight.shadow.mapsize.set(2048,2048);
```

