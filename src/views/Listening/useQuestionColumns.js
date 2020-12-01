//#region 题目列表 列配置
import { reactive } from "vue";

export function useQuestionColumns() {
  // 题目列配置
  const questionColumns = reactive(
    [
      {
        title: "编号",
      },
      {
        title: "题目",
      },
      {
        title: "题目音频",
      },
      {
        title: "标签",
      },
      {
        title: "最近更新时间",
      },
      {
        title: "备注",
      },
      {
        title: "练习次数",
      },
      {
        title: "操作",
      },
    ]
  );

  return {
    questionColumns
  }
}
//#endregion