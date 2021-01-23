/**
 * @author Lemon
 * 课程图-学习中心表格格式
 * */
export const useCenterColumn = () => {
  const centerColumn = [
    {
      title: "排序",
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
    centerColumn
  };
};
