import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
export const LoginLog = (id) => {
  // 表格数据
  const loginLoglData = reactive({
    // 表格数据
    Data: [],
    // 表格标题
    Columns: [
      {
        title: "时间",
        align: "center",
        dataIndex: "createTime",
      },
      {
        title: "IP",
        align: "center",
        dataIndex: "ip",
      },
      {
        title: "登录方式",
        align: "center",
        dataIndex: "channel",
      },
    ],
  });

  const pagination = reactive({
    // 第几页
    pageNum: 1,
    // 每页显示多少条
    pageSize: 10,
    // 数据总数
    total: 0,
    // 每页可以显示多少条
    pageSizeOptions: ["10"],
  });
  // 获取后台数据
  const getUserTopicData = async () => {
    const res = await httpGet(user.LoginJournal + `/${id}`, {
      // 降序
      descColumns: "createTime",
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    });
    if (res.code == 200) {
      // 数据
      loginLoglData.Data = res.data;
      // 数据总数
      pagination.total = res.data.total;
    }
  };
  // 点击页码显示对应数据
  const handleLogPageChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTopicData(page, pageSizes);
  };
  // 选择每页显示多少条数据显示对应条数
  const handleLogSizeChange = (page, pageSizes) => {
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
    loginLoglData,
    pagination,
    handleLogPageChange,
    handleLogSizeChange,
  };
};
