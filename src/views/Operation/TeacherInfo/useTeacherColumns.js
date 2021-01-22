import { reactive } from "vue";

// 创建表格格式
export const useTeacherColumns = () => {
  const column = [
    {
      title: "序号",
      width: 80,
      slots: { customRender: "index" }
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 180
    },
    {
      title: "照片",
      width: 180,
      slots: { customRender: "photo" }
    },
    {
      title: "简介",
      dataIndex: "profiles",
      key: "profiles"
    },
    {
      title: "操作",
      width: 200,
      slots: { customRender: "operational" }
    }
  ];

  return { column };
};
