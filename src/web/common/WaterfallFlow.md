---
title: 🤔 瀑布流
tag:
  - 算法
---

>HTML 代码

<details>
<summary>点击展开代码</summary>

```vue
  <div class="wrapper">
    <div class="wf-item" v-for="(image,index) in images" :key="index">
      <img  :src="image" class="wf-img" :alt="index.toString()"/>
    </div>
  </div>
```
</details>

## css 方式
```css
/* 设置最外层的宽度以及使用 grid 布局,5 列,间隙是 10px */
.wrapper {
    width: 1200px;
    margin: 0 auto;
    columns: 5;
    column-gap: 10px;
}


.wf-img {
    width: 100%;
    height: 100%;
}
```

## js 方式
<details>
<summary>点击展开代码</summary>

```javascript
let Waterfall = function (options) {
    this.el = document.getElementsByClassName(options.el)[0];
    this.oItems = this.el.getElementsByTagName("div")
    this.column = options.column;
    this.gap = options.gap;
    this.itemWidth = (this.el.offsetWidth - (this.column - 1) * this.gap) / this.column;
    this.heighArray = []
    this.init()
};


Waterfall.prototype.init = function () {
    this.render();
};
Waterfall.prototype.render = async function () {
    let item = null
    let minIndex = -1;
    for (let index = 0; index < this.oItems.length; index++) {
        item = this.oItems[index];
        item.style.width = this.itemWidth + "px";

        if (index < this.column) {
            item.style.top = "0px"
            item.style.left = index * (this.itemWidth + this.gap) + "px";
            this.heighArray.push(await getItemHeight(item))
        } else {

            let minIndex = getMinIndex(this.heighArray)
            item.style.left = this.oItems[minIndex].offsetLeft + "px";
            item.style.top = this.heighArray[minIndex] + this.gap + "px"
            this.heighArray[minIndex] += item.offsetHeight + this.gap
        }
    }
}

function getMinIndex(heightArray) {
    return heightArray.indexOf(Math.min.apply(null, heightArray))
}

function getItemHeight(item) {
    return new Promise((resolve) => {
        item.getElementsByTagName("img")[0].onload = (event) => {
            resolve(event.target.offsetHeight)
        }
    })
}

export default Waterfall


// 调用

new Waterfall({
    el: "wrapper",
    column: 5,
    gap: 10,
})

```

> 原理解释:
> 首先接收所有的参数 
> 计算出每一个图片应该所占的宽度
> 获取到所有的图片 item
> 使用 for 进行动态的计算 top 和 left(使用 absolute 布局)
> 首先是绘制出第一行的位置也就是条件 < this.column
> 他们的 top 都是 0 left 是当前的索引值 * (当前的宽度+间隔),当每一个的位置确定之后需要将他们的高度存储在数组中
> 然后开始绘制其他的行
> 计算出最小的高度,决定了下一张图片的 top,而下一张图片的 left = (最小值的索引)对应的 dom 的 offsetLeft

</details>




<div style="height:200px">
<WaterfallFlow/>
</div>

<script setup>
import WaterfallFlow from "@source/web/common/components/WaterfallFlow/WaterfallFlow.vue"
</script>
