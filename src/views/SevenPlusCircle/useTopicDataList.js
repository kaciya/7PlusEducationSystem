import { ref, onMounted, reactive } from "vue";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";
export const useTopicDataList = () => {
  // 定义内容
  const topicData = ref();

  // 分页
  const tablePagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10"],
    total: 0,
    showSizeChanger: true
  });

  // 发起请求获取数据
  const getTopicData = (topicUserName, topicSortStatus) => {
    const params = {
      pageNum: tablePagination.current,
      pageSize: tablePagination.pageSize,
      userName: topicUserName,
      categoryId: topicSortStatus,
      descColumns: "createTime"
    };
    httpGet(topic.GetDataList, params)
      .then(res => {
        const { data } = res;
        if (res.code == 200) {
          topicData.value = data.records;
          tablePagination.total = data.total;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 获取数据
  onMounted(() => {
    getTopicData();
  });

  return {
    getTopicData,
    topicData,
    tablePagination
  };
};
