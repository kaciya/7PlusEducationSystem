import { reactive } from "vue";
export const useGetNoticeColumns = () => {
  // 表格列的配置
  const columns = reactive([
    {
      title: "标题",
      dataIndex: "title",
      key: "title"
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
      title: "发布人员",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "状态",
      key: "status",
      slots: { customRender: "status" }
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
