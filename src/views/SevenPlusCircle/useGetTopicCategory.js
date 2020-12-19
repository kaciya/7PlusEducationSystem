import { onMounted, ref } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入请求方法
import { httpGet } from "@/utils/http";
export const useGetTopicCategory = () => {
  // 分类列表数据
  let categoryList = ref([]);

  const getCategory = () => {
    httpGet(topic.GetCategory)
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
