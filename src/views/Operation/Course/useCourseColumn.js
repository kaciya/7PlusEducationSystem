// 导出表格格式
export const columns = [
  {
    title: "课程名称",
    dataIndex: "name",
    width: "10%"
  },
  {
    title: "课程介绍",
    dataIndex: "introduce",
    width: "25%"
  },
  {
    title: "适合人群",
    dataIndex: "fit",
    width: "25%"
  },
  {
    title: "课程特点",
    dataIndex: "trait",
    width: "20%"
  },
  {
    title: "操作",
    width: "20%",
    slots: { customRender: "operational" }
  }
];
