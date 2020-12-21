import { onMounted, ref } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入请求方法
import { httpGet } from "@/utils/http";
export const useGetTopicCategory = () => {
  // 分类列表数据
  let categoryList = ref([]);

  // 发起请求获取数据
  const getCategory = () => {
    httpGet(topic.GetCategory)
      .then(res => {
        let { success } = res;
        if (success) {
          categoryList.value = res.data;
        }
      })
      .catch(err => {
        throw new Error(err);
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
