/**
 * @author Lemon
 * 数据列表表格格式
 * */
import { reactive } from "vue";

export const useDataColumn = () => {
  const dataColumn = reactive([
    {
      title: "对象",
      dataIndex: "remark",
      key: "remark"
    },
    {
      title: "内容",
      width: "65%",
      slots: { customRender: "content" }
    },
    {
      title: "操作",
      slots: { customRender: "operational" }
    }
  ]);
  return {
    // 表格格式
    dataColumn
  };
};
