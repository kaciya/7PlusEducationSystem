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
    // 表格标题
    topicColumns: [
      {
        title: "序号",
        align: "center",
        width: 80,
        slots: { customRender: "index" },
      },
      {
        title: "内容",
        align: "center",
        dataIndex: "content",
        width: 300,
        ellipsis: true,
      },
      {
        title: "分类",
        align: "center",
        dataIndex: "category",
      },
      {
        title: "发布时间",
        align: "center",
        dataIndex: "createTime",
      },
      {
        title: "相关",
        align: "center",
        slots: { customRender: "relevant" },
      },
      {
        title: "操作",
        align: "center",
        slots: { customRender: "operation" },
      },
    ],
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
