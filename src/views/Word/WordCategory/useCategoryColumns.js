import { reactive } from "vue";

export const useCategoryColumns = () => {
  const columns = reactive([
    {
      title: "词库名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      slots: { customRender: "operation" },
    },
  ]);

  return {
    columns,
  };
};
