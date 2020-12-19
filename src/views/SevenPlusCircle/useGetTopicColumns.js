import { reactive } from "vue";
export const useGetTopicColumns = () => {
  // 表格列的配置
  const columns = reactive([
    {
      title: "序号",
      key: "index",
      slots: { customRender: "index" }
    },
    {
      title: "内容",
      key: "content",
      slots: { customRender: "content" },
      ellipsis: true
    },
    {
      title: "发布用户",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "分类",
      key: "category",
      slots: { customRender: "category" }
    },
    {
      title: "发布时间",
      dataIndex: "createTime",
      key: "createTime",
      //默认降序
      defaultSortOrder: "descend",
      //排序规则
      sorter: (a, b) => (a.createTime > b.createTime ? 1 : -1)
    },
    {
      title: "相关",
      key: "about",
      slots: { customRender: "about" }
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    columns
  };
};
