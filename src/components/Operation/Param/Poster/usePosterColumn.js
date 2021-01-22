/**
 * @author Lemon
 * 学院海报列表格式
 * */
export const usePosterColumn = () => {
  const posterColumn = [
    {
      title: "轮播图顺序",
      dataIndex: "sort",
      key: "sort"
    },
    {
      title: "广告位",
      slots: { customRender: "ad" },
      width: "50%"
    },
    {
      title: "备注",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link"
    },
    {
      title: "操作",
      slots: { customRender: "operational" }
    }
  ];

  return {
    posterColumn
  };
};
