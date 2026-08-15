---
title:  6-页面动画
tag:
  - harmony
star: true
---

# 页面动画

## 属性动画

给组件添加 animation属性添加动画

`width`,`height`,`Opacity`,`backgroundColor`,`scale`,`rotate`,`translate`

| 名称       | 参数类型                                                     | 必填 | 描述                                                         |
| ---------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| duration   | number                                                       | 否   | `设置动画时长。默认值：1000单位：毫秒从API version 9开始，该接口支持在ArkTS卡片中使用。**说明：**- 在ArkTS卡片上最大动画持续时间为1000毫秒。- 设置浮点型类型的值时，向下取整；设置值为1.2，按照1处理。` |
| tempo      | number                                                       | 否   | `动画播放速度。数值越大，动画播放速度越快，数值越小，播放速度越慢。值为0时，表示不存在动画。默认值：1` |
| curve      | string \| [Curve](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-appendix-enums-0000001478061741-V3#ZH-CN_TOPIC_0000001574248789__curve) \| [ICurve](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/js-apis-curve-0000001427585072-V3#ZH-CN_TOPIC_0000001523808354__icurve)9+ | 否   | `设置动画曲线。默认值：Curve.EaseInOut从API version 9开始，该接口支持在ArkTS卡片中使用。` |
| delay      | number                                                       | 否   | `设置动画延迟执行的时长。默认值：0，不延迟播放。单位：毫秒取值范围：[0, +∞)**说明：**设置浮点型类型的值时，向下取整。例如，设置值为1.2，按照1处理。` |
| iterations | number                                                       | 否   | `设置播放次数。默认值：1取值范围：[-1, +∞)**说明：**设置为-1时表示无限次播放。设置为0时表示无动画效果。` |
| playMode   | [PlayMode](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-appendix-enums-0000001478061741-V3#ZH-CN_TOPIC_0000001574248789__playmode) | 否   | `设置动画播放模式，默认播放完成后重头开始播放。默认值：PlayMode.Normal从API version 9开始，该接口支持在ArkTS卡片中使用。` |
| onFinish   | `() => void`                                                 | 否   | `状态回调，动画播放完成时触发。从API version 9开始，该接口支持在ArkTS卡片中使用。**说明：**当iterations设置为-1时，动画效果无限循环不会停止，所以不会触发此回调` |

## 显示动画

通过全局的 animateTo修改组件的属性

```ts
animateTo(
  {
    duration:200 // 上方表格中的属性
  },
  ()=> {
    
  }
)
```

> Demo

```ts
Button('change rotate angle')
  .margin(50)
  .rotate({ x: 0, y: 0, z: 1, angle: this.rotateAngle })
  .onClick(() => {
    animateTo({
      duration: 1200,
      curve: Curve.Friction,
      delay: 500,
      iterations: -1, // 设置-1表示动画无限循环
      playMode: PlayMode.Alternate,
      onFinish: () => {
        console.info('play end')
      }
    }, () => {
      this.rotateAngle = 90
    })
  })
```

## 组件转场动画

`transition`组件插入和移除的过度动画

需要配合[animateTo](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-explicit-animation-0000001478341181-V3)才能生效，动效时长、曲线、延时跟随animateTo中的配置）

| 参数名称  | 参数                                                         | 必填 | 参数描述                                                     |
| --------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| slide     | [SlideEffect](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-page-transition-animation-0000001477981233-V3#ZH-CN_TOPIC_0000001523489146__slideeffect枚举说明) | 否   | `设置页面转场时的滑入滑出效果。默认值：SlideEffect.Right`    |
| translate | `{x? : number \|string,y? : number \|string,z? : number \|string}` |      | `设置页面转场时的平移效果，为入场时起点和退场时终点的值，和slide同时设置时默认生效slide。- x：横向的平移距离。- y：纵向的平移距离。- z：竖向的平移距离。` |
| scale     | `{x? : number,y? : number,z? : number,centerX? : number \|string,centerY? : number \|string}` |      | `设置页面转场时的缩放效果，为入场时起点和退场时终点的值。- x：横向放大倍数（或缩小比例）。- y：纵向放大倍数（或缩小比例）。- z：竖向放大倍数（或缩小比例）。- centerX、centerY缩放中心点。- 中心点为0时，默认的是组件的左上角。` |
| opacity   | number                                                       | 否   | `设置入场的起点透明度值或者退场的终点透明度值。默认值：1`    |

### SlideEffect枚举说明

| 名称   | 描述                                               |
| :----- | :------------------------------------------------- |
| Left   | 设置到入场时表示从左边滑入，出场时表示滑出到左边。 |
| Right  | 设置到入场时表示从右边滑入，出场时表示滑出到右边。 |
| Top    | 设置到入场时表示从上边滑入，出场时表示滑出到上边。 |
| Bottom | 设置到入场时表示从下边滑入，出场时表示滑出到下边。 |

### 事件

| 事件                                                         | 功能描述                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| onEnter(event: (type?: RouteType, progress?: number) => void) | `回调入参为当前入场动画的归一化进度[0 - 1]。- type：跳转方法。- progress：当前进度。触发该事件的条件：逐帧回调，直到入场动画结束，progress从0变化到1。` |
| onExit(event: (type?: RouteType, progress?: number) => void) | `回调入参为当前退场动画的归一化进度[0 - 1]。- type：跳转方法。- progress：当前进度。触发该事件的条件：逐帧回调，直到退场动画结束，progress从0变化到1。` |

> Demo

```ts
if (this.flag) {
// Image的显示和消失配置为不同的过渡效果
Image($r('app.media.testImg')).width(300).height(300)
  .transition({ type: TransitionType.Insert, scale: { x: 0, y: 1.0 } })
  .transition({ type: TransitionType.Delete, rotate: { angle: 180 } })
}



// 点击Button控制Image的显示和消失
animateTo({ duration: 1000 }, () => {
  if (this.flag) {
    this.show = 'hide'
  } else {
    this.show = 'show'
  }
  this.flag = !this.flag
})
```



