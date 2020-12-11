//导入 reactive 对象
import {
    reactive
} from "vue";

//#region 创建变量  获取表格项
export const useSysuserColums = () => {
      //定义 表格项
  const sysUsersTable = reactive({
    sysUsersColums: [
      // 列表索引
      {
        title: "索引",
        align: "center",
        key: "index",
        slots: {
          customRender: "index"
        }
      },
      //用户名
      {
        title: "账号",
        align: "center",
        dataIndex: "username"
      },
      //真实姓名
      {
        title: "操作员名称",
        align: "center",
        dataIndex: "realName"
      },
      //权限组
      {
        title: "权限组",
        align: "center",
        dataIndex: "roleName"
      },
      //状态
      {
        title: "是否启用",
        align: "center",
        key: "status",
        slots: {
          customRender: "status"
        }
      },
      //操作
      {
        title: "操作",
        align: "center",
        key: "operation",
        slots: {
          customRender: "operation"
        }
      }
    ],
    //获取列表数据
    sysUsersData: []
  });

  //返回列表
  return{
    sysUsersTable
  }
}
//#endregion