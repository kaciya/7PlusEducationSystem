/**
 * @author Lemon
 * 表格列
 * */
import { reactive } from "vue";

// 创建表格格式
export const columns = reactive([
  {
    title: "问题",
    dataIndex: "question",
    key: "question"
  },
  {
    title: "内容",
    dataIndex: "answer",
    key: "answer"
  },
  {
    title: "发布时间",
    dataIndex: "createTime",
    key: "createTime",
    width: "10%"
  },
  {
    title: "操作",
    width: "15%",
    slots: { customRender: "operational" }
  }
]);
