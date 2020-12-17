import { reactive } from "vue";
// 用户列表columns;
export const useWordColumns = () => {
  const columns = reactive([
    {
      title: "类名",
      dataIndex: "id"
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
