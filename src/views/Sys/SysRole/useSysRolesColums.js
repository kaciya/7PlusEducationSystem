//导入 reactive 对象
import { reactive } from "vue";

//#region 创建变量  获取表格项
export const useSysRolesColums = () => {
  //定义 表格项
  const rolesTable = reactive({
    //表格列
    rolesColums: [
      {
        title: "索引",
        align: "center",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      {
        title: "权限组",
        align: "center",
        dataIndex: "roleName"
      },
      {
        title: "人员",
        align: "center",
        dataIndex: "count"
      },
      {
        title: "更新时间",
        align: "center",
        dataIndex: "updateTime",
        //默认降序排列
        defaultSortOrder: "descend",
        //日期排序
        sorter: (a, b) => {
          let aTime = new Date(a.createTime);
          let bTime = new Date(b.createTime);
          return aTime - bTime;
        }
      },
      {
        title: "启用",
        align: "center",
        key: "status",
        slots: {
          customRender: "status"
        }
      },
      {
        title: "操作",
        align: "center",
        key: "operation",
        slots: {
          customRender: "operation"
        }
      }
    ],
    //表格数据
    rolesData: []
  });

  //返回列表数据
  return {
    rolesTable
  };
};
//#endregion
