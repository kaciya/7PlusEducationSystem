//#region 题目列表 列配置
import { reactive } from "vue";

export function useQuestionColumns() {
  // 题目列配置
  const questionColumns = reactive([
    {
      title: "编号",
      dataIndex: "no",
      ellipsis: true
    },
    {
      title: "题目",
      dataIndex: "title",
      ellipsis: true
    },
    {
      title: "标签",
      key: "labels",
      slots: { customRender: "labels" },
      width: "250px"
    },
    {
      title: "最近更新时间",
      dataIndex: "updateTime",
      ellipsis: true
    },
    {
      title: "备注",
      dataIndex: "remark",
      ellipsis: true
    },
    {
      title: "累计练习",
      dataIndex: "totalNum",
      ellipsis: true
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" },
      width: "280px"
    }
  ]);
  return {
    questionColumns
  };
}
//#endregion
