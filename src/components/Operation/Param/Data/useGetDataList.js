/**
 * @author Lemon
 * 获取数据列表
 * */
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { onMounted, reactive } from "vue";

export const useGetDataList = () => {
  // 创建数据
  const dataList = reactive({});
  // 获取数据列表
  const getDataList = () => {
    // 发起ajax请求
    httpGet(param.GetDataList)
      .then(res => {
        // 判断是否获取成功
        if (res.success === true) {
          // 设置数据
          dataList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getDataList();
  });

  return {
    // 储存数据
    dataList,
    // 获取数据列表
    getDataList
  };
};
