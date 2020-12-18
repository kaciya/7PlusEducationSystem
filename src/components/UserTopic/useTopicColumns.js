import { reactive } from "vue";
// 柒加圈columns
export const useTopicColumns = () => {
  const columns = reactive([
    {
      title: "序号",
      align: "center",
      width: 80,
      slots: { customRender: "index" }
    },
    {
      title: "内容",
      align: "center",
      dataIndex: "content",
      width: 300,
      ellipsis: true
    },
    {
      title: "分类",
      align: "center",
      dataIndex: "category"
    },
    {
      title: "发布时间",
      align: "center",
      dataIndex: "createTime"
    },
    {
      title: "相关",
      align: "center",
      slots: { customRender: "relevant" }
    },
    {
      title: "操作",
      align: "center",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    columns
  };
};
