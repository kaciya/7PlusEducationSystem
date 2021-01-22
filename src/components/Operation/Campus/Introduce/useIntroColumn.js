/**
 * @author Lemon
 * 介绍列表
 * */
export const useIntroColumn = () => {
  // 介绍列表表格格式
  const introColumn = [
    {
      title: "对象",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "具体介绍",
      dataIndex: "introduce",
      key: "introduce",
      width: "70%"
    },
    {
      title: "编辑",
      slots: { customRender: "edit" }
    }
  ];

  return {
    introColumn
  };
};
