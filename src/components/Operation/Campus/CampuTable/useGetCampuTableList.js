/**
 * @author 获取校区列表数据
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { campus } from "@/api/operationAPI";

export const useGetCampuTableList = () => {
  // 储存数据
  const campuTableList = reactive({});

  const getCampuTableList = () => {
    // 发送ajax请求
    httpGet(campus.GetCampuTableList)
      .then(res => {
        // 判断是否获取成功
        if (res.success === true) {
          // 将数据存入变量
          campuTableList.data = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onMounted(() => {
    getCampuTableList();
  });

  return {
    campuTableList,
    getCampuTableList
  };
};
