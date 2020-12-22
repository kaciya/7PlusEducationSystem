import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
export const useGetTopic = id => {
  // 表格数据
  const topicData = reactive({
    // 表格数据
    data: []
  });
  //#region 分页配置项
  const topicPagination = reactive({
    // 第几页
    current: 1,
    // 每页显示多少条
    pageSize: 10,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
    // 总数
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion 分页配置项
  //#region 获取后台数据
  const getTopicData = async () => {
    const res = await httpGet(user.GetUserTopic + `/${id}`, {
      // 降序
      descColumns: "createTime",
      pageNum: topicPagination.current,
      pageSize: topicPagination.pageSize
    });
    if (res.success) {
      // 数据
      topicData.data = res.data.records;
      // 数据总数
      topicPagination.total = res.data.total;
    }
  };
  //#endregion
  //#region 页码改变回调
  const onTableChange = pagination => {
    // 第几页
    topicPagination.current = pagination.current;
    // 每页显示多少条
    topicPagination.pageSize = pagination.pageSize;
    // 刷新数据
    getTopicData();
  };
  //#endregion
  // 初始化获取数据
  onMounted(() => {
    getTopicData();
  });
  return {
    topicData,
    topicPagination,
    onTableChange,
    getTopicData
  };
};
