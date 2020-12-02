<template>
  <a-page-header
    class="user-growth-page"
    style="border: 1px solid rgb(235, 237, 240)"
  >
    <template #title>
      <div class="user-growth-page-heading">用户增长趋势</div>
    </template>
    <template #extra>
      <a-radio-group class="daysGroup" v-model:value="daysValueModel">
        <a-radio-button value="n7d"> 近七天 </a-radio-button>
        <a-radio-button value="n30d"> 近30天 </a-radio-button>
      </a-radio-group>
      <!-- 开始日期-结束日期 -->
      <a-range-picker
        lang="range-picker"
        :style="{ width: '246px', marginRight: '8px' }"
        @change="dateRangeChange"
      />
    </template>
    <div class="user-growth">
      <div
        id="myChart"
        ref="myCharts"
        :style="{
          width: '1140px',
          height: '470px',
          left: '-44px',
          top: '-26px'
        }"
      />
    </div>
  </a-page-header>
</template>

<script>
// 导入getCurrentInstance方法等
import { getCurrentInstance, onMounted, ref } from "vue";
export default {
  setup() {
    // 使用ctx
    const { ctx } = getCurrentInstance();
    // 在mounted周期中执行
    onMounted(() => {
      // 调用绘图函数
      drawLine();
    });

    //#region 绘图函数
    function drawLine() {
      // 初始化echarts实例
      const myCharts = ctx.$echarts.init(ctx.$refs.myCharts);

      //#region 指定配置图形参数
      const options = {
        title: {
          // text: "用户增长趋势", //图表顶部的标题
        },
        // 提示框
        tooltip: {
          // 提示款触发类型
          trigger: "axis",
          // 坐标轴指示器配置项
          axisPointer: {
            type: "none"
          },
          // 自定义提示框模板
          formatter: function(params) {
            let htmlStr = "";
            for (let i = 0; i < params.length; i++) {
              const param = params[i];
              //x轴的名称
              const xName = param.name;
              //图例名称
              const seriesName = param.seriesName;
              //y轴值
              const value = param.value;
              //图例颜色
              const color = param.color;
              //添加x轴的名称
              if (i === 0) htmlStr += xName + "<br/>";

              htmlStr += "<div>";
              // 添加原型点图标
              htmlStr += `<span style="margin-left:2px;margin-right:10px;display:inline-block;
                width:5px;height:5px;border-radius:50%;
                background-color:${color};"></span>`;
              // 圆点后面显示的文本
              htmlStr +=
                seriesName + `<span style="margin:0 12px"></span>` + value;
              htmlStr += "</div>";
            }
            return htmlStr;
          },
          // 提示框样式
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          extraCssText: "box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);",
          padding: 8,
          textStyle: {
            color: "#666",
            fontSize: 12,
            lineHeight: 24
          }
        },
        // 图例组件
        legend: {
          data: ["新增用户"],
          x: "center",
          y: "bottom",
          padding: [0, 0, 2, 0],
          textStyle: {
            color: "#8c8c8c",
            padding: [0, 4]
          },
          // 修改图标样式
          icon: "rect",
          itemWidth: 12,
          itemHeight: 3
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            //坐标轴轴线
            axisLine: {
              lineStyle: {
                color: "#dfdfdf",
                width: 2
              }
            },
            // 坐标轴刻度标签
            axisLabel: {
              color: "#545454",
              margin: 16
            },
            data: [
              "2018-06-25",
              "2018-06-30",
              "2018-07-05",
              "2018-07-10",
              "2018-07-15",
              "2018-07-20",
              "2018-07-25",
              "2018-07-30",
              "2018-08-04",
              "2018-08-09",
              "2018-08-14",
              "2018-08-19"
            ]
          }
        ],
        // 直角坐标系 grid 中的 y 轴
        yAxis: [
          {
            // y轴坐标数据
            type: "value",
            show: true, //显示Y轴
            maxInterval: 400, //坐标轴最大间隔大小

            // 坐标轴轴线
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            // 分割线
            splitLine: {
              lineStyle: {
                type: "dashed",
                opacity: 0.8
              }
            },
            // 坐标轴刻度
            axisTick: {
              lineStyle: {
                opacity: 0
              }
            },
            // 坐标轴刻度标签
            axisLabel: { margin: 12 }
          }
        ],
        series: [
          // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
          {
            name: "新增用户",
            nameLocation: "left",
            type: "line",
            showSymbol: true,
            symbol: "circle", //设定为实心
            symbolSize: 8, //设定实心点的大小
            hoverAnimation: false, //取消动画效果
            legendHoverLink: true,
            cursor: "aoto",
            itemStyle: {
              normal: {
                color: "#1890ff",
                borderWidth: 1,
                borderColor: "#fff",
                lineStyle: {
                  color: "#1890ff"
                }
              }
            },
            // 图形高亮样式。
            emphasis: {
              itemStyle: {
                shadowColor: "rgba(24, 144, 255, 0.8)", //高亮时阴影颜色
                shadowBlur: 8 //高亮时阴影模糊大小
              }
            },
            //
            data: [
              700,
              690,
              950,
              1450,
              1840,
              2150,
              2520,
              2650,
              2330,
              1830,
              1390,
              960
            ]
          }
        ]
      };
      //#endregion

      // 使用刚指定的配置项和数据显示图表
      myCharts.setOption(options);
    }
    //#endregion

    // 声明近几日选择值
    let daysValueModel = ref("n7d");
    // 侦听日期选择范围变化
    function dateRangeChange(date, dateString) {
      console.log(dateString);
      // 取消近几日按钮选中状态
      daysValueModel.value = "";
    }
    // 返回
    return {
      daysValueModel,
      dateRangeChange
    };
  }
};
</script>

<style lang="scss" scoped>
.user-growth-page {
  float: left;
  // width: 922px;
  width: 1022px;
  padding: 0;
  padding-top: 16px;
  padding-bottom: 4px;

  .user-growth-page-heading {
    padding-left: 24px;
    font-size: 18px;
    font-weight: 700;
  }

  .daysGroup {
    > label {
      border-radius: 2px;
    }
  }
}

.user-growth {
  width: 100%;
  border-top: 1px solid #e9e9e9;
  // padding-bottom: 10px;
  overflow: hidden;
}
</style>
