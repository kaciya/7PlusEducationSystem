/**
 * 联系列表格式
 * */
export const useLinkColumn = () => {
  const linkColumn = [
    {
      title: "排序",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "电话",
      dataIndex: "telPhone",
      key: "telPhone"
    },
    {
      title: "启用/禁用",
      slots: { customRender: "state" }
    },
    {
      title: "操作",
      slots: { customRender: "operational" }
    }
  ];

  return {
    linkColumn
  };
};
