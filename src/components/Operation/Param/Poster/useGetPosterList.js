/**
 * @author Lemon
 * 获取学院海报
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useGetPosterList = () => {
  // 创建数据
  const posterList = reactive({});
  // 获取数据
  const getPosterList = () => {
    // 发送ajax请求
    httpGet(param.GetAdList("STUDENT_POSTER"))
      .then(res => {
        // 判断是否获取成功
        if (res.success) {
          // 设置数据
          posterList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getPosterList();
  });

  return {
    // 数据
    posterList,
    // 获取广告列表
    getPosterList
  };
};
