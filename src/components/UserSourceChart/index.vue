<template>
  <a-page-header
    class="user-source-page"
    style="border: 1px solid rgb(235, 237, 240)"
  >
    <template #title>
      <div class="user-source-page-heading">用户来源</div>
    </template>
    <div class="user-source">
      <div
        ref="chartRef"
        :style="{
          width: '100%',
          height: '100%'
        }"
      />
    </div>
  </a-page-header>
</template>

<script>
// 导入vue中的方法
import { onMounted, inject } from "vue";
// 导入获取用户来源
import { useGetUserSource } from "./useGetUserSource";
export default {
  setup() {
    // 用户来源数据
    const { chartRef, getUserSource } = useGetUserSource();
    // 获取$echarts
    const echarts = inject("$echarts");
    // 定义echarts实例存储变量
    let chart = null;
    // 在mounted周期中执行
    onMounted(() => {
      // 初始化echarts实例
      chart = echarts.init(chartRef.value);
      // 调用绘图函数
      drawLine();
      // 初始化图形
      setUserSource();
    });

    //#region 绘图函数
    function drawLine() {
      //#region 指定配置图形参数
      const options = {
        title: {
          // text: "用户来源",
        },
        // 主题颜色
        color: [
          "#3aa1ff",
          "#36cbcb",
          "#4ecb73",
          "#eebe38",
          "#ee7b38",
          "#f245ab",
          "#f24545"
        ],
        // 提示框
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          formatter: function(param) {
            // 声明字符拼接
            let htmlStr = "";
            // 图例颜色
            const color = param.color;
            // 系列名称
            const name = param.name;
            // 该系列占比
            const percent = param.percent;

            htmlStr += "<div>";
            // 添加原型点图标
            htmlStr += `<span style="margin-left:2px;margin-right:8px;display:inline-block;
                width:5px;height:5px;border-radius:50%;
                background-color:${color};"></span>`;
            // 圆点后面显示的文本
            htmlStr += name + ": " + percent + "%";
            // 结束拼接
            htmlStr += "</div>";
            // 返回模板字符
            return htmlStr;
          },
          // 提示框样式
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          extraCssText: "box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);",
          padding: [10, 10, 10, 8],
          textStyle: {
            color: "#666",
            fontSize: 12,
            lineHeight: 24
          }
        },
        // 图例组件
        legend: {
          data: ["PC", "APP", "小程序"],
          x: "center",
          y: "bottom",
          padding: [0, 0, 40, 0],
          textStyle: {
            color: "#8c8c8c",
            padding: [0, 4]
          },
          // 修改图标样式
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8
        },
        // 饼图图形上的文本标签
        label: {
          formatter: "{b}: {d}%"
        },
        // 系列列表
        series: [
          {
            name: "用户来源",
            type: "pie",
            radius: "57%",
            center: ["52%", "46%"],
            // 高亮扇区的偏移距离
            hoverOffset: 0,
            // 放大动画效果
            hoverAnimation: true,
            cursor: "auto",
            // 开启(单)选中模式
            selectedMode: "single",
            // 系列数据
            data: [
              { value: 2991, name: "PC" },
              { value: 2949, name: "APP" },
              { value: 4060, name: "小程序" }
            ],
            label: {
              // 标签样式
              normal: {
                color: "#545454"
              }
            },
            labelLine: {
              // 标签的视觉引导线样式
              normal: {
                length: 28,
                length2: 0,
                smooth: true
              }
            },
            // 饼图扇形样式
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1
              }
            },
            // 高亮时样式
            emphasis: {}
          }
        ]
      };
      //#endregion

      // 使用刚指定的配置项和数据显示图表
      chart.setOption(options);
    }
    //#endregion

    //#region 设置用户来源数据
    function setUserSource() {
      // 开启加载动画
      chart.showLoading();
      // 获取数据异步加载
      getUserSource(chart);
    }
    //#endregion

    // 返回
    return {
      chartRef
    };
  }
};
</script>

<style lang="scss" scoped>
.user-source-page {
  float: left;
  // width: 500px;
  width: 100%;
  padding: 0;
  padding-top: 16px;
  padding-bottom: 4px;

  .user-source-page-heading {
    padding-left: 24px;
    font-size: 18px;
    font-weight: 700;
  }
}

.user-source {
  max-width: 532px;
  width: 100%;
  height: 470px;
  border-top: 1px solid #e9e9e9;
  // overflow: hidden;
}
</style>
