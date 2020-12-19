//导入 reactive 对象
import { reactive } from "vue";

//#region 创建变量  获取表格项
export const useUserColums = () => {
  //定义 表格项
  const sysUsersTable = reactive({
    colums: [
      // 列表索引
      {
        title: "序号",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      //用户名
      {
        title: "账号",
        dataIndex: "username"
      },
      //真实姓名
      {
        title: "操作员名称",
        dataIndex: "realName"
      },
      //权限组
      {
        title: "权限组",
        dataIndex: "roleName"
      },
      //状态
      {
        title: "是否启用",
        key: "status",
        slots: {
          customRender: "status"
        }
      },
      //操作
      {
        title: "操作",
        key: "operation",
        slots: {
          customRender: "operation"
        }
      }
    ],
    //获取列表数据
    data: []
  });

  //返回列表
  return {
    sysUsersTable
  };
};
//#endregion
