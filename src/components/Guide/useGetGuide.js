import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import guide from "@/api/guideAPI";
export const useGetGuide = Type => {
  // 表格数据
  const guideData = reactive({
    // 表格数据
    data: []
  });

  // 获取后台数据
  const getGuideData = async () => {
    const res = await httpGet(guide.GetGuide + `${Type}`);
    if (res.success) {
      guideData.data = res.data;
    }
  };

  // 初始化获取数据
  onMounted(() => {
    getGuideData();
  });
  return {
    getGuideData,
    guideData
  };
};
