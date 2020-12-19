//导入 reactive 对象
import { reactive } from "vue";

//#region 获取表格项
export const useTableColums = () => {
  //创建对象  储存表格项 和 表格数据
  const rolePermissionTable = reactive({
    colums: [
      {
        title: "权限类型",
        key: "permissionType",
        slots: {
          customRender: "permissionType"
        }
      },
      {
        title: "权限名称",
        key: "permissionName",
        slots: {
          customRender: "permissionName"
        }
      }
    ],
    data: []
  });

  //返回表格对象
  return {
    rolePermissionTable
  };
};
//#endregion
