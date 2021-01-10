/**
 * @author Lemon
 * 文章列表列
 * */

export const column = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "封面",
    slots: { customRender: "cover" },
    width: "20%"
  },
  {
    title: "发布时间",
    dataIndex: "createTime",
    key: "createTime",
    width: "15%"
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
    slots: { customRender: "operational" }
  }
];
