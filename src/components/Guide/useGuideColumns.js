import { reactive } from "vue";
// 柒加圈columns
export const useGuideColumns = () => {
  // 表格标题
  const columns = reactive([
    {
      title: "题型",
      dataIndex: "category",
      width: 100
    },
    {
      title: "考试要求",
      dataIndex: "testRequires",
      ellipsis: true,
      width: 150
    },
    {
      title: "评分项",
      dataIndex: "grade"
    },
    {
      title: "题目个数",
      dataIndex: "problemsNumber"
    },
    {
      title: "其他考核项",
      dataIndex: "examine"
    },
    {
      title: "答题时间",
      dataIndex: "answerTime"
    },
    {
      title: "答题要点",
      dataIndex: "keyPoints",
      ellipsis: true,
      width: 200
    },
    {
      title: "操作",
      slots: { customRender: "operation" },
      width: 120
    },
  ]);

  return {
    columns
  };
};
