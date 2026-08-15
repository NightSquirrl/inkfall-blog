<template>
  <!--  div.wrapper>div*13.wf-item>img[src="./images/$.jpg"]-->

  <div class="wrapper">
    <div class="wf-item" v-for="(image,index) in images" :key="index">
      <img  :src="image" class="wf-img" :alt="index.toString()"/>
    </div>
  </div>

</template>
<style scoped>
.wrapper {
//background: bisque;
  width: 20vw;
  margin: 0 auto;
  position: relative;
//columns: 5; //column-gap: 10px;
}

.wf-item {
  position: absolute;
}

.wf-img {
  width: 100%;
  height: 100%;
}
</style>

<script setup>
import waterfallImages1 from "./images/1.jpg";
import waterfallImages2 from "./images/2.jpg";
import waterfallImages3 from "./images/3.jpg";
import waterfallImages4 from "./images/4.jpg";
import waterfallImages5 from "./images/5.jpg";
import waterfallImages6 from "./images/6.jpg";
import waterfallImages7 from "./images/7.jpg";
import waterfallImages8 from "./images/8.jpg";
import waterfallImages9 from "./images/9.jpg";
import waterfallImages10 from "./images/10.jpg";
import waterfallImages11 from "./images/11.jpg";
import waterfallImages12 from "./images/12.jpg";
import waterfallImages13 from "./images/13.jpg";
import {onMounted} from "vue";
import Waterfall from "./utils/waterfall"


const images = [
  waterfallImages1,
  waterfallImages2,
  waterfallImages3,
  waterfallImages4,
  waterfallImages5,
  waterfallImages6,
  waterfallImages7,
  waterfallImages8,
  waterfallImages9,
  waterfallImages10,
  waterfallImages11,
  waterfallImages12,
  waterfallImages13,
];

onMounted(() => {
  // js 方式实现瀑布流
  new Waterfall({
    el: "wrapper",
    column: 5,
    gap: 10,
  })
})




</script>
