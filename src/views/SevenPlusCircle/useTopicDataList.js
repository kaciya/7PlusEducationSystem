import { ref, onMounted } from "vue";
// 导入get请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";
export const useTopicDataList = () => {
  // 定义内容
  const topicData = ref();
  // 数据总条数
  const topicDataListTotal = ref(0);
  // 发起请求获取数据
  const topicGetData = (pageNum = 1, pageSize = 10, userName, categoryId) => {
    const params = {
      pageNum: pageNum,
      pageSize: pageSize,
      userName: userName,
      categoryId: categoryId,
      descColumns: "createTime"
    };
    httpGet(topic.getDataList, params)
      .then(res => {
        const { data } = res;
        if (res.code == 200) {
          topicDataListTotal.value = data.total;
          topicData.value = res.data.records;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 获取数据
  onMounted(() => {
    topicGetData();
  });
  return {
    topicGetData,
    topicData,
    topicDataListTotal
  };
};
