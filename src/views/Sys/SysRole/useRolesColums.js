//导入 reactive 对象
import { reactive } from "vue";

//#region 创建变量  获取表格项
export const useRolesColums = () => {
  //定义 表格项
  const rolesTable = reactive({
    //表格列
    colums: [
      {
        title: "序号",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "权限组",
        dataIndex: "roleName"
      },
      {
        title: "人员",
        dataIndex: "count"
      },
      {
        title: "更新时间",
        dataIndex: "updateTime"
      },
      {
        title: "启用",
        key: "status",
        slots: {
          customRender: "status"
        }
      },
      {
        title: "操作",
        key: "operation",
        slots: {
          customRender: "operation"
        }
      }
    ],
    //表格数据
    data: []
  });

  //返回列表数据
  return {
    rolesTable
  };
};
//#endregion
