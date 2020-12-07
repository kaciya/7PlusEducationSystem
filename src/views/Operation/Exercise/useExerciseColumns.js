// 创建表格模板
export const columns = [
  {
    title: "对象",
    dataIndex: "name",
    width: 300,
    key: "name"
  },
  {
    title: "内容",
    dataIndex: "content",
    key: "content"
  },
  {
    title: "操作",
    width: 200,
    slots: { customRender: "action" }
  }
];
