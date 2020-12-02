//#region 获取首页统计数据
// 导入接口配置
import home from "@/api/homeAPI";
// 导入httpGet方法
import { httpGet } from "@/utils/http";
// 导入响应api
import { reactive } from "vue";

export const useGetStatistics = () => {
  // 声明统计数据
  const statistics = reactive({
    data: {}
  });
  // 调用接口获取数据
  httpGet(home.HomeStatistics)
    .then(res => {
      if (res.success) {
        statistics.data = res.data;
        // 处理数据
        for (const key in statistics.data) {
          // 调用处理数字数据
          // statistics.data[key] = dealDigitalData(statistics.data[key]);
          if (key == "userCount")
            statistics.data[key] = dealDigitalData(2805763);
          else statistics.data[key] = dealDigitalData(1000);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

  // 处理数字数据格式方法 (x,xxx,xxx)
  function dealDigitalData(n) {
    const num = String(n);
    const length = num.length;
    // 长度小于4 直接返回num
    if (length < 4) {
      return num;
    } else {
      // 转为数组，再反转数组
      const numArr = num.split("").reverse();
      // 遍历数组，每3个长度添加一个','
      for (let i = 3; i < numArr.length; i += 3) {
        // 如果当前下标无值，跳出循环
        if (!numArr[i]) break;
        // 添加','
        numArr.splice(i, 0, ",");
        // 索引自增
        i++;
      }
      // console.log(numArr.reverse().join(""));
      // 返回处理后的数据
      return numArr.reverse().join("");
    }
  }

  // 返回
  return {
    statistics
  };
};
//#endregion
