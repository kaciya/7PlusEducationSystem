import { reactive } from "vue";
// 词库columns;
export const useWordColumns = () => {
  const columns = reactive([
    {
      title: "类名",
      dataIndex: "typeName"
    },
    {
      title: "单词",
      dataIndex: "word"
    },
    {
      title: "操作",
      width: "18%",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    columns
  };
};
