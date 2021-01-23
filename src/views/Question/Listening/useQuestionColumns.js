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
      title: "题目音频",
      dataIndex: "titleAudio",
      ellipsis: true,
      slots: { customRender: "titleAudio" }
    },
    {
      title: "标签",
      key: "labels",
      width: "250px",
      slots: { customRender: "labels" }
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
      title: "练习次数",
      dataIndex: "totalNum",
      ellipsis: true
    },
    {
      title: "操作",
      key: "operation",
      width: "300px",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    questionColumns
  };
}
//#endregion
