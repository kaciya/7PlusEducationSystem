import { onMounted, ref } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入get请求方法
import { httpGet } from "@/utils/http";
export const useTopicGetCategory = () => {
  // 分类列表数据
  let categoryList = ref([]);
  const getCategory = () => {
    httpGet(topic.getCategory)
      .then(res => {
        categoryList.value = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  };
  onMounted(() => {
    getCategory();
  });
  return {
    getCategory,
    categoryList
  };
};
