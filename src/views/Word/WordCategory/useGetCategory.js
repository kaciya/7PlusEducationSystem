import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordTypeAPI";
export const useGetCategory = () => {
  // 表格数据
  const categoryData = reactive({
    // 表格数据
    data: []
  });

  // 获取后台数据
  const getCategoryData = async () => {
    const res = await httpGet(wordType.GetWordCategory);
    // 数据获取成功
    if (res.success) {
      categoryData.data = res.data;
    }
  };

  // 初始化获取数据
  onMounted(() => {
    getCategoryData();
  });
  return {
    getCategoryData,
    categoryData
  };
};
