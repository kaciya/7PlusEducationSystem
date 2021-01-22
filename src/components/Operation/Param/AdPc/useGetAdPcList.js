/**
 * @author Lemon
 * 获取pc广告位
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useGetAdPcList = () => {
  // 创建数据
  const adPcList = reactive({});
  // 获取数据
  const getAdPcList = () => {
    // 发送ajax请求
    httpGet(param.GetAdList("HOME_BANNER"))
      .then(res => {
        // 判断是否获取成功
        if (res.success) {
          // 设置数据
          adPcList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getAdPcList();
  });

  return {
    // 数据
    adPcList,
    // 获取广告列表
    getAdPcList
  };
};
