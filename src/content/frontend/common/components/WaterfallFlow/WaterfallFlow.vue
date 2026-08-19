<template>
  <!--  div.wrapper>div*13.wf-item>img[src="./images/$.jpg"]-->

  <div class="wrapper">
    <div class="wf-item" v-for="(image, index) in images" :key="index">
      <img :src="image" class="wf-img" :alt="index.toString()" />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  /* background: bisque; */
  width: 20vw;
  margin: 0 auto;
  position: relative;
  /* columns: 5;
  column-gap: 10px; */
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
import { onMounted } from "vue";
import Waterfall from "./utils/waterfall";

const images = [
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
"https://picsum.photos/800/600",
];

onMounted(() => {
  // js 方式实现瀑布流
  new Waterfall({
    el: "wrapper",
    column: 5,
    gap: 10,
  });
});
</script>
