import { reactive } from "vue";

export const userCategoryColumns = () => {
  const categoryColumns = reactive([
    {
      title: "词库名称",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "操作",
      align: "center",
      slots: { customRender: "operation" },
    },
  ]);

  return {
    categoryColumns,
  };
};
