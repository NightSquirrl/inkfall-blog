<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
var data = [70, 34, 60, 78, 69];
var titlename = ["HTML5", "CSS3", "javascript", "VUE", "NODE"];
var valdata = [702, 350, 610, 793, 664];
var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("ProgressBarChart"));
  // 绘制图表
  myChart.setOption({
    //图标位置
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%",
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#0400ff",

          rich: {
            lg: {
              backgroundColor: "#339911",
              color: "#0400ff",
              borderRadius: 15,
              // padding: 5,
              align: "center",
              width: 15,
              height: 15,
            },
          },
        },
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#0400ff",
          },
        },
      },
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data,
        barCategoryGap: 50,
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function (params: any) {
              var num = myColor.length;
              return myColor[params.dataIndex % num];
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: "{c}%",
          },
        },
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 50,
        data: [100, 100, 100, 100, 100],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15,
          },
        },
      },
    ],
  });
});
</script>

<template>
  <div id="ProgressBarChart"></div>
</template>

<style scoped>
#ProgressBarChart {
  width: 400px;
  height: 300px;
}
</style>
