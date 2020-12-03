import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
export const LoginJournal = id => {
  // 表格数据
  const loginJournalData = reactive({
    // 表格数据
    journalData: [],
    // 表格标题
    journalColumns: [
      {
        title: "时间",
        align: "center",
        dataIndex: "createTime",
        // 排序 默认降序
        defaultSortOrder: "descend",
        // 排序规则
        sorter: (a, b) => (a.createTime > b.createTime ? 1 : -1)
      },
      {
        title: "IP",
        align: "center",
        dataIndex: "ip"
      },
      {
        title: "登录方式",
        align: "center",
        dataIndex: "channel"
      }
    ]
  });

  const pagination = reactive({
    // 第几页
    pageNum: 1,
    // 每页显示多少条
    pageSize: 10,
    // 数据总数
    total: 0,
    // 每页可以显示多少条
    pageSizeOptions: ["10"]
  });
  // 获取后台数据
  const getUserTopicData = async () => {
    const res = await httpGet(user.LoginJournal + `/${id}`, {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    });
    if (res.code == 200) {
      // 数据
      loginJournalData.journalData = res.data;
      // 数据总数
      pagination.total = res.data.total;
    }
  };
  // 点击页码显示对应数据
  const handleJournalPageChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTopicData(page, pageSizes);
    console.log(1);
  };
  // 选择每页显示多少条数据显示对应条数
  const handleJournalSizeChange = (page, pageSizes) => {
    pagination.pageSize = pageSizes;
    pagination.pageNum = page;
    getUserTopicData();
    console.log(2);
  };
  // 初始化获取数据
  onMounted(() => {
    getUserTopicData();
  });
  return {
    getUserTopicData,
    loginJournalData,
    pagination,
    handleJournalPageChange,
    handleJournalSizeChange
  };
};
