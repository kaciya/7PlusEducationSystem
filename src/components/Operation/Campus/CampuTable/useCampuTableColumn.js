/**
 * @author Lemon
 * 校区列表表格格式
 * */
export const useCampuTableColumn = () => {
  const campuTableColumn = [
    {
      title: "校区名称",
      dataIndex: "name",
      key: "name",
      width: "10%"
    },
    {
      title: "图片",
      slots: { customRender: "img" },
      width: "15%"
    },
    {
      title: "具体介绍",
      dataIndex: "introduce",
      key: "introduce",
      width: "60%"
    },
    {
      title: "操作",
      slots: { customRender: "operational" }
    }
  ];

  return {
    campuTableColumn
  };
};
