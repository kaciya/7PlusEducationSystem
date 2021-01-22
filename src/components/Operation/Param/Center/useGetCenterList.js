/**
 * @author Lemon
 * 获取课程图-学习中心
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useGetCenterList = () => {
  // 创建数据
  const centerList = reactive({});
  // 获取数据
  const getCenterList = () => {
    // 发送ajax请求
    httpGet(param.GetAdList("STUDY_COURSE"))
      .then(res => {
        // 判断是否获取成功
        if (res.success) {
          // 设置数据
          centerList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getCenterList();
  });

  return {
    // 数据
    centerList,
    // 获取广告列表
    getCenterList
  };
};
