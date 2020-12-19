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
          statistics.data[key] = statistics.data[key];
          // if (key == "userCount") statistics.data[key] = 2805763;
          // else statistics.data[key] = 12345;
        }
      }
    })
    .catch(err => {
      // console.log(err);
      throw new Error(err);
    });

  // 返回
  return {
    statistics
  };
};
//#endregion
