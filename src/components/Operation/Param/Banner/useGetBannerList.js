/**
 * @author Lemon
 * 获取轮播图
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useGetBannerList = () => {
  // 创建数据
  const bannerList = reactive({});
  // 获取数据
  const getBannerList = () => {
    // 发送ajax请求
    httpGet(param.GetAdList("PC_BANNER"))
      .then(res => {
        // 判断是否获取成功
        if (res.success) {
          // 设置数据
          bannerList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getBannerList();
  });

  return {
    // 数据
    bannerList,
    // 获取广告列表
    getBannerList
  };
};
