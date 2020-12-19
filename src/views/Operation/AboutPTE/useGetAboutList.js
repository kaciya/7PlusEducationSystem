/**
 * @author Lemon
 * 获取数据列表
 * */
import { onMounted, reactive } from "vue";
import { httpGet } from "@/utils/http";
import { about } from "@/api/operationAPI";
// 引入api

export const useGetAboutList = () => {
  // 存储列表数据
  const aboutList = reactive({});

  // 获取数据
  const getAboutData = async () => {
    const res = await httpGet(about.GetAboutList);
    if (res.code === 200) {
      // 设置表格数据
      aboutList.data = res.data.records;
    }
  };
  onMounted(() => {
    getAboutData();
  });
  return {
    aboutList,
    getAboutData
  };
};
