//#region 获取用户增长数据[折线图]
// 导入请求方式
import { httpGet } from "@/utils/http";
// 导入home接口
import home from "@/api/homeAPI";
// 导入响应api
import { ref } from "vue";

// 定义功能函数
export const useGetUserAdd = () => {
  // 定义图形ref
  const chartRef = ref(null);

  //#region 请求近几日数据方法
  function getUserAddForDays(chart, d) {
    httpGet(home.UserGrowth, {
      days: d
    })
      .then(res => {
        // console.log(res);
        if (res.success) {
          // 调用并存储处理数据
          const userAddData = dealWithData(res.data);
          // 关闭加载动画
          chart.hideLoading();
          // 定义窗口最小值
          const minSpan = d == 7 ? "50" : "30";
          // 定义配置图形数据
          const options = {
            dataZoom: [
              {
                // 还原缩放
                start: 0,
                end: 100,
                minSpan: minSpan
              }
            ],
            xAxis: {
              data: userAddData.xData
            },
            series: [
              {
                data: userAddData.yData
              }
            ]
          };
          // 异步数据加载
          chart.setOption(options);
        }
      })
      .catch(err => {
        // console.log(err);
        throw new Error(err);
      });
  }
  //#endregion

  //#region 请求[start-end]数据方法
  function getUserAddStartToEnd(chart, startDate, endDate) {
    httpGet(home.UserGrowth, {
      startDate,
      endDate
    })
      .then(res => {
        // console.log(res);
        if (res.success) {
          // 调用并存储处理数据
          const userAddData = dealWithData(res.data);
          // 关闭加载动画
          chart.hideLoading();
          // 定义窗口最小值
          const minSpan = userAddData.xData.length < 30 ? "50" : "30";
          // 定义配置图形数据
          const options = {
            dataZoom: [
              {
                // 还原缩放
                start: 0,
                end: 100,
                minSpan: minSpan
              }
            ],
            xAxis: {
              data: userAddData.xData
            },
            series: [
              {
                data: userAddData.yData
              }
            ]
          };
          // 异步数据加载
          chart.setOption(options);
        }
      })
      .catch(err => {
        // console.log(err);
        throw new Error(err);
      });
  }
  //#endregion

  //#region 处理用户增长数据方法
  function dealWithData(data) {
    const xData = [];
    const yData = [];
    data.forEach(item => {
      xData.push(item.date);
      yData.push(item.value);
    });
    // console.log({ xData, yData });
    return { xData, yData };
  }
  //#endregion

  return {
    chartRef,
    getUserAddForDays, //近几日
    getUserAddStartToEnd //开始-结束日期
  };
};
//#endregion
