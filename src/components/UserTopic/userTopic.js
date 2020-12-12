import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
export const userTopic = (id) => {
  // 表格数据
  const userTopicData = reactive({
    // 表格数据
    topicData: [],
  });
  // 分页数据
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    pageSizeOptions: ["10"],
    total: 0,
  });
  // 获取后台数据
  const getUserTopicData = async () => {
    const res = await httpGet(user.UserTopic + `/${id}`, {
      // 降序
      descColumns: "createTime",
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    });
    if (res.code == 200) {
      userTopicData.topicData = res.data;
      pagination.total = res.data.total;
    }
  };
  // 点击页码显示对应数据
  const handleTopicPageChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTopicData();
  };
  // 选择每页显示多少条数据显示对应条数
  const handelTopicSizeChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTopicData();
  };
  // 初始化获取数据
  onMounted(() => {
    getUserTopicData();
  });
  return {
    getUserTopicData,
    userTopicData,
    pagination,
    handelTopicSizeChange,
    handleTopicPageChange,
  };
};
