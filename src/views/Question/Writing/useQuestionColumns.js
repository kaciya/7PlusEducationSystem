//#region 题目列表 列配置
import { reactive } from "vue";

export function useQuestionColumns() {
  // 题目列配置
  const questionColumns = reactive([
    {
      title: "编号",
      dataIndex: "no"
    },
    {
      title: "题目",
      dataIndex: "title"
    },
    {
      title: "标签",
      key: "labels",
      slots: { customRender: "labels" },
      width: "300px"
    },
    {
      title: "最近更新时间",
      dataIndex: "updateTime"
    },
    {
      title: "备注"
    },
    {
      title: "累计练习"
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    },
  ]);
  return {
    questionColumns
  };
}
//#endregion
