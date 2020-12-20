//#region 获取用户来源数据[饼图]
// 导入请求方式
import { httpGet } from "@/utils/http";
// 导入home接口
import home from "@/api/homeAPI";
// 导入响应api
import { ref } from "vue";

// 定义功能函数
export const useGetUserSource = () => {
  // 定义图形ref
  const chartRef = ref(null);

  //#region 请求数据方法
  function getUserSource(chart) {
    httpGet(home.UserSource)
      .then(res => {
        if (res.success) {
          // 调用并存储处理数据
          const userSourceData = dealWithData(res.data);
          // 关闭加载动画
          chart.hideLoading();
          // 异步数据加载
          chart.setOption({
            legend: {
              data: userSourceData.xData
            },
            series: [
              {
                data: userSourceData.yData
              }
            ]
          });
          // 如果只有一条用户来源，移除边框样式
          if (userSourceData.xData.length == 1) {
            chart.setOption({
              series: [
                {
                  itemStyle: {
                    normal: {
                      borderWidth: 0
                    }
                  }
                }
              ]
            });
          }
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  //#endregion

  //#region 处理用户增长数据方法
  function dealWithData(data) {
    const xData = [];
    const yData = [];
    data.forEach(item => {
      xData.push(item.channel);
      yData.push({ value: item.value, name: item.channel });
    });
    // console.log({ xData, yData });
    return { xData, yData };
  }
  //#endregion

  // 返回
  return {
    chartRef,
    getUserSource
  };
};
//#endregion
