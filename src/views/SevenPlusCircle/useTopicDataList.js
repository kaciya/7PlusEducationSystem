import { ref, onMounted, reactive } from "vue";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";
export const useTopicDataList = () => {
  // 定义内容
  const topicData = ref([]);

  // 用户名称输入框内容
  const topicUserName = ref("");

  // 分类选择
  const topicSortStatus = ref("");

  // 分页
  const tablePagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10"],
    total: 0,
    showSizeChanger: true
  });

  // 清空输入框
  const clearInput = () => {
    topicUserName.value = "";
    topicSortStatus.value = "";
    tablePagination.current = 1;
  };

  // 发起请求获取数据
  const getTopicData = () => {
    const params = {
      pageNum: tablePagination.current,
      pageSize: tablePagination.pageSize,
      userName: topicUserName.value,
      categoryId: topicSortStatus.value,
      descColumns: "createTime"
    };
    httpGet(topic.GetDataList, params)
      .then(res => {
        const { data, success } = res;
        if (success) {
          topicData.value = data.records;
          tablePagination.total = data.total;
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  // 获取数据
  onMounted(() => {
    getTopicData();
  });

  return {
    topicData,
    topicUserName,
    topicSortStatus,
    tablePagination,
    clearInput,
    getTopicData
  };
};
