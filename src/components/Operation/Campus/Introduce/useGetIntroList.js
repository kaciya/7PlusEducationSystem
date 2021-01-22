/**
 * @author Lemon
 * 获取介绍列表
 * */
// 引入api
import { campus } from "@/api/operationAPI";
import { httpGet } from "@/utils/http";
import { onMounted, reactive } from "vue";

export const useGetIntroList = () => {
  //介绍列表数据
  const introList = reactive({
    data: []
  });

  // 获取介绍列表
  const getIntroList = () => {
    httpGet(campus.GetIntroList)
      .then(res => {
        const { success, data } = res;
        // 判断是否获取成功
        if (success === true) {
          // 设置表格数据
          introList.data = [data];
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getIntroList();
  });

  return {
    // 获取表格数据
    getIntroList,
    // 储存表格数据
    introList
  };
};
