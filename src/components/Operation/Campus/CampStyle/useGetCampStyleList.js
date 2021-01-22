/**
 * @author Lemon
 * 获取校区风采表格数据
 * */
import { httpGet } from "@/utils/http";
import { onMounted, reactive } from "vue";
import { campus } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useGetCampStyleList = () => {
  // 储存表格数据
  const campStyleList = reactive({});
  // 获取表格列表数据
  const getCampStyleList = () => {
    // 发送ajax请求
    httpGet(campus.GetCampStyleList)
      .then(res => {
        console.log(res);
        // 判断数据是否获取成功
        if (res.success === true) {
          // 存入数据
          campStyleList.data = res.data;
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  onMounted(() => {
    getCampStyleList();
  });

  return {
    // 储存表格数据
    campStyleList,
    // 获取表格数据
    getCampStyleList
  };
};
