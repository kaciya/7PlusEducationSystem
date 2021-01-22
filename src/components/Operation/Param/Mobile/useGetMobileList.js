/**
 * @author Lemon
 * 获取移动端广告位
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useGetMobileList = () => {
  // 创建数据
  const mobileList = reactive({});
  // 获取数据
  const getMobileList = () => {
    // 发送ajax请求
    httpGet(param.GetAdList("MOBILE_AD"))
      .then(res => {
        // 判断是否获取成功
        if (res.success) {
          // 设置数据
          mobileList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getMobileList();
  });

  return {
    // 数据
    mobileList,
    // 获取广告列表
    getMobileList
  };
};
