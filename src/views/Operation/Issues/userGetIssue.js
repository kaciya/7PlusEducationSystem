import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import Issues from "@/api/IssuesAPI";
export const userGetIssues = () => {
  // 表格数据
  const issuesData = reactive({
    // 表格数据
    Data: [],
    // 表格标题和内容
    Columns: [
      {
        title: "问题",
        dataIndex: "question",
        width: 260
      },
      {
        title: "内容",
        dataIndex: "answer",
        width: 500
      },
      {
        title: "发布时间",
        dataIndex: "createTime",
        // 排序 默认降序
        defaultSortOrder: "descend",
        // 排序规则
        sorter: (a, b) => (a.createTime > b.createTime ? 1 : -1)
      },
      {
        title: "操作",
        slots: { customRender: "operation" }
      }
    ]
  });

  // 获取后台数据
  const getIssuesData = async () => {
    const res = await httpGet(Issues.IssueList);
    // 数据获取成功
    if (res.code == 200) {
      issuesData.Data = res.data;
    }
  };

  //   初始化获取数据;
  onMounted(() => {
    getIssuesData();
  });
  return {
    getIssuesData,
    issuesData
  };
};
