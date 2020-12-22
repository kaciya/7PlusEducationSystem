import { reactive } from "vue";
// 词库分类表格columns
export const useCategoryColumns = () => {
  const columns = reactive([
    {
      title: "词库名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    columns
  };
};
