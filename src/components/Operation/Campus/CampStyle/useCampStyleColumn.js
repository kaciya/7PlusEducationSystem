/**
 * @author Lemon
 * 校区风采表格
 * */
export const useCampStyleColumn = () => {
  // 表格
  const campStyleColumn = [
    {
      title: "序号",
      slots: { customRender: "index" },
      width: "10%"
    },
    {
      title: "图片",
      slots: { customRender: "image" }
    },
    {
      title: "操作",
      slots: { customRender: "operational" },
      width: "20%"
    }
  ];

  return {
    campStyleColumn
  };
};
