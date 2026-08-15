---
title: 03. Echarts 基本教程
icon: ix:piechart-filled
description: 综合的讲解 Echarts 的使用
tag:
  - 前端
  - Echarts
---
![echart.png](https://echarts.apache.org/zh/images/logo.png?_v_=20200710_1)

[Echarts官网地址](https://echarts.apache.org/handbook/en/get-started)

# Get Start

## Demo
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Echarts</title>
    <style>
    .box {
        width: 300px;
        height: 300px;
        background-color: #62CDFF;
    }
    </script>
</head>
<body>
    <div id="main" class="box"></div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

option && myChart.setOption(option);
</script>
</html>
```

使用的步骤
1. 引入echarts 插件文件到html页面中
2. 准备一个具备大小的DOM容器
3. 初始化echarts实例对象
4. 指定配置项和数据(option)
5. 将配置项设置给echarts实例对象
## Echarts 基础配置讲解
注意一下 series 中的一个配置 stack
数据堆叠，同个类目轴上系列配置相同的`stack`值后 后一个系列的值会在前一个系列的值上相加。
```javascript
// 声明颜色数组
var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

option = {
    // color设置我们线条的颜色 注意后面是个数组
    color: ['pink', 'red', 'green', 'skyblue'],
    // 设置图表的标题
    title: {
        text: '折线图堆叠123'
    },
    // 图表的提示框组件 
    tooltip: {
        // 触发方式
        trigger: 'axis',
        axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    // 图例组件
    legend: {
       // series里面有了 name值则 legend里面的data可以删掉
    },
    // 工具箱组件  可以另存为图片等功能
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 网格配置  grid可以控制线形图 柱状图 图表大小
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        // 是否显示刻度标签 如果是true 就显示 否则反之
        containLabel: true
    },
    // 设置x轴的相关配置
    xAxis: {
        type: 'category',
        // 是否让我们的线条和坐标轴有缝隙
        boundaryGap: false,
        data: ['星期一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // x 轴的文字颜色和字体大小
        axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
        },
        //  x轴样式不显示
        axisLine: {
            show: false
            // 如果想要设置单独的线条样式 
            // lineStyle: {
            //    color: "rgba(255,255,255,.1)",
            //    width: 1,
            //    type: "solid"
        // }
    },
        // 不显示刻度
        axisTick: {
            show: false
        },
    },
     // 设置y轴的相关配置
    yAxis: {
        type: 'value',
        // y 轴的分割线的样式
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)"
            }
        }
    },
    // 系列图表配置 它决定着显示那种类型的图表
    series: [
        {
            name: '邮件营销',
            type: 'line',
           //      stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            //      stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
          
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'bar',
            // 如果类型是 bar 柱状图
            // barWidth: "60%", 代表柱状图的宽度
            data: [320, 332, 301, 334, 390, 330, 320],
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5,
                color:function (params) {
                    return myColor[params.dataIndex]
                }
            },
            // 图形上的文本标签
            label: {
                normal: {
                    show: true,
                    // 图形内显示
                    position: "inside",
                    // 文字的显示格式
                    formatter: "{c}%"
                }
            },
        }
    ]
};

```
[配置文档](https://echarts.apache.org/zh/option.html#title)

* 让图表跟随屏幕自适应

```javascript
  window.addEventListener("resize", function() {
    myChart.resize();
  });
```

# 综合案例

## 柱形图

<Histogram/>
<details>
<summary>点击展开代码</summary>

```javascript
完整的代码 :
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


```
</details>

## 折线图
<LineChart />
<details>
<summary>点击展开代码</summary>

```javascript
option = {
    color: ["#00f2f1", "#ed3f35"],
        tooltip: {
        // 通过坐标轴来触发
        trigger: "axis"
    },
    legend: {
        // 距离容器10%
        right: "10%",
            // 修饰图例文字的颜色
            textStyle: {
            color: "#4c9bfd"
        }
        // 如果series 里面设置了name，此时图例组件的data可以省略
        // data: ["邮件营销", "联盟广告"]
    },
    grid: {
        top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true,
            borderColor: "#012f4a",
            containLabel: true
    },

    xAxis: {
        type: "category",
            boundaryGap: false,
            data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
        ],
            // 去除刻度
            axisTick: {
            show: false
        },
        // 修饰刻度标签的颜色
        axisLabel: {
            color: "rgba(4, 0, 255,.7)"
        },
        // 去除x坐标轴的颜色
        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: "value",
            // 去除刻度
            axisTick: {
            show: false
        },
        // 修饰刻度标签的颜色
        axisLabel: {
            color: "rgba(4, 0, 255,.7)"
        },
        // 修改y轴分割线的颜色
        splitLine: {
            lineStyle: {
                color: "#012f4a"
            }
        }
    },
    series: [
        {
            name: "新增粉丝",
            type: "line",
            stack: "总量",
            // 是否让线条圆滑显示
            smooth: true,
            data: data.year[0]
        },
        {
            name: "新增游客",
            type: "line",
            stack: "总量",
            smooth: true,
            data: data.year[1]
        }
    ]
}
```
</details> 

## 饼状图
<Pie/>

<details>
<summary>点击展开代码</summary>

```javascript
option = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function(p: any) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
        top: "90%",
        itemWidth: 10,
        itemHeight: 10,
        data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
        textStyle: {
            color: "rgba(4, 0, 255,.5)",
            fontSize: "12"
        }
    },
    series: [
        {
            name: "年龄分布",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: [
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab",
                "#06b4ab",
                "#06c8ab",
                "#06dcab",
                "#06f0ab"
            ],
            label: { show: false },
            labelLine: { show: false },
            data: [
                { value: 1, name: "0岁以下" },
                { value: 4, name: "20-29岁" },
                { value: 2, name: "30-39岁" },
                { value: 2, name: "40-49岁" },
                { value: 1, name: "50岁以上" }
            ]
        }
    ]
}
```
</details> 

## 进度图

<ProgressBarChart/>
<details>
<summary>点击展开代码</summary>

```javascript
{
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
}
```
</details> 

## 折线背景图
<LineChartShadow/>

<details>
<summary>点击展开代码</summary>

```javascript
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            lineStyle: {
                color: "#dddc6b"
            }
        }
    },
    legend: {
        top: "0%",
        textStyle: {
            color: "rgba(4, 0, 255,.5)",
            fontSize: "12"
        }
    },
    grid: {
        left: "10",
        top: "30",
        right: "10",
        bottom: "10",
        containLabel: true
    },

    xAxis: [
        {
            type: "category",
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(4, 0, 255,.6)",
                    fontSize: 12
                }
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(4, 0, 255,.2)"
                }
            },

            data: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30"
            ]
        },
        {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20
        }
    ],

    yAxis: [
        {
            type: "value",
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: "rgba(4, 0, 255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(4, 0, 255,.6)",
                    fontSize: 12
                }
            },

            splitLine: {
                lineStyle: {
                    color: "rgba(4, 0, 255,.1)"
                }
            }
        }
    ],
    series: [
        {
            name: "播放量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: "#0184d5",
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)"
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)"
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                }
            },
            itemStyle: {
                normal: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                }
            },
            data: [
                30,
                40,
                30,
                40,
                30,
                40,
                30,
                60,
                20,
                40,
                20,
                40,
                30,
                40,
                30,
                40,
                30,
                40,
                30,
                60,
                20,
                40,
                20,
                40,
                30,
                60,
                20,
                40,
                20,
                40
            ]
        },
        {
            name: "转发量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: "#00d887",
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(0, 216, 135, 0.4)"
                            },
                            {
                                offset: 0.8,
                                color: "rgba(0, 216, 135, 0.1)"
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                }
            },
            itemStyle: {
                normal: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                }
            },
            data: [
                50,
                30,
                50,
                60,
                10,
                50,
                30,
                50,
                60,
                40,
                60,
                40,
                80,
                30,
                50,
                60,
                10,
                50,
                30,
                70,
                20,
                50,
                10,
                40,
                50,
                30,
                70,
                20,
                50,
                10,
                40
            ]
        }
    ]
}
```
</details> 

## 饼状图数据
<PointDistributionStatistics/>

<details>
<summary>点击展开代码</summary>

```javascript
option = {
    legend: {
        top: "90%",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: "rgba(4, 0, 255,.5)",
            fontSize: "12"
        }
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
        "#006cff",
        "#60cda0",
        "#ed8884",
        "#ff9f7f",
        "#0096ff",
        "#9fe6b8",
        "#32c5e9",
        "#1d9dff"
    ],
    series: [
        {
            name: "点位统计",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["10%", "70%"],
            center: ["50%", "42%"],
            roseType: "radius",
            data: [
                { value: 20, name: "云南" },
                { value: 26, name: "北京" },
                { value: 24, name: "山东" },
                { value: 25, name: "河北" },
                { value: 20, name: "江苏" },
                { value: 25, name: "浙江" },
                { value: 30, name: "深圳" },
                { value: 42, name: "广东" }
            ],
            // 修饰饼形图文字相关的样式 label对象
            label: {
                fontSize: 10
            },
            // 修饰引导线样式
            labelLine: {
                // 连接到图形的线长度
                length: 10,
                // 连接到文字的线长度
                length2: 10
            }
        }
    ]
}
```
</details> 

## 轨道飞行图
> 借助于 echart 社区

<FlightPath/>

<script setup>
import Histogram from "@source/web/Echarts/components/Histogram.vue";
import LineChart from "@source/web/Echarts/components/LineChart.vue";
import Pie from "@source/web/Echarts/components/Pie.vue";
import ProgressBarChart from "@source/web/Echarts/components/ProgressBarChart.vue";
import LineChartShadow from "@source/web/Echarts/components/LineChartShadow.vue";
import PointDistributionStatistics from "@source/web/Echarts/components/PointDistributionStatistics.vue"
import FlightPath from "@source/web/Echarts/components/FlightPath.vue"
</script>
