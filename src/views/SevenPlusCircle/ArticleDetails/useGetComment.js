import { onMounted, ref } from "vue";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";
export const useGetComment = id => {
  // 定义评论数据
  const commentList = ref([]);

  // 评论总数量
  const commentTotal = ref(0);

  // 页码
  const pageNum = ref(1);

  // 发起请求获取数据
  const getComment = () => {
    httpGet(topic.GetComment + "/" + id, {
      pageNum: pageNum.value,
      pageSize: 10
    })
      .then(res => {
        let { data, success } = res;
        if (success) {
          commentTotal.value = data.total;
          commentList.value = data.records;
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  onMounted(() => {
    getComment();
  });

  return {
    getComment,
    commentList,
    commentTotal,
    pageNum
  };
};
