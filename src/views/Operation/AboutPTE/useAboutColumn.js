/**
 * @author Lemon
 * 关于pte列表
 * */

export const column = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "发布时间",
    dataIndex: "createTime",
    key: "createTime"
  },
  {
    title: "发布人",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "开启/关闭",
    slots: { customRender: "state" }
  },
  {
    title: "操作",
    align: "center",
    slots: { customRender: "operational" }
  }
];
