<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("main"));
  // 绘制图表
  myChart.setOption({
    color: ["#0400ff"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "旅游行业",
          "教育培训",
          "游戏行业",
          "医疗行业",
          "电商行业",
          "社交行业",
          "金融行业",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          textStyle: {
            color: "rgba(4, 0, 255,1)",
            fontSize: "12",
          },
        },
        axisLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(4, 0, 255,1)",
            fontSize: "12",
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(4, 0, 255,1)",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(4, 0, 255,1)",
          },
        },
      },
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "35%",
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          barBorderRadius: 5,
        },
      },
    ],
  });
});
</script>

<template>
  <div id="main"></div>
</template>

<style scoped>
#main {
  width: 400px;
  height: 300px;
}
</style>
