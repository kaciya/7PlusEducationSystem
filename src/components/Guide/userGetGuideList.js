import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import guide from "@/api/guideAPI";
export const userGuideList = Type => {
  // 表格数据
  const userGuideListData = reactive({
    // 表格数据
    Data: [],
    // 表格标题
    Columns: [
      {
        title: "题型",
        align: "center",
        slots: { customRender: "category" },
        width: 100
      },
      {
        title: "考试要求",
        align: "center",
        dataIndex: "testRequires",
        ellipsis: true,
        width: 150
      },
      {
        title: "评分项",
        align: "center",
        dataIndex: "grade"
      },
      {
        title: "题目个数",
        align: "center",
        dataIndex: "problemsNumber"
      },
      {
        title: "其他考核项",
        align: "center",
        dataIndex: "examine"
      },
      {
        title: "答题时间",
        align: "center",
        dataIndex: "answerTime"
      },
      {
        title: "答题要点",
        align: "center",
        dataIndex: "keyPoints",
        ellipsis: true,
        width: 200
      },
      {
        title: "操作",
        align: "center",
        // columnWidth: 200,
        slots: { customRender: "operation" }
      }
    ]
  });

  // 获取后台数据
  const getUserGuideList = async () => {
    const res = await httpGet(guide.GuideList + `${Type}`);
    if (res.code == 200) {
      userGuideListData.Data = res.data;
    }
  };

  // 初始化获取数据
  onMounted(() => {
    getUserGuideList();
  });
  return {
    getUserGuideList,
    userGuideListData
  };
};
