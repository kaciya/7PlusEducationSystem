//导入 reactive 对象
import {
  reactive
} from "vue";

//导入 API 接口
import {
  sys
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

//#region 定义方法  获取账号列表
export const showSysUserList = () => {
  //#region 分页所需数据
  const pageInfo = reactive({
    //列表所在页数
    pageNum: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //指定每页可以显示多少条
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    //一共多少条数据
    total: 0,
  });
  //#endregion

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
    sysUsersData: []
  });

  //#region 根据后台接口地址发送请求获取权限组数据
  const getSysUserList = () => {
    //请求地址 /admin/sys/user/list
    httpGet(sys.sysUserList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          sysUsersTable.sysUsersData = res.data;
          //获取多少条数据
          pageInfo.total = res.data.length;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //#region 点击下一页方法
  const pageChange = (page, pageSize) => {
    pageInfo.pageNum = page;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  }
  //#endregion

  //#region 设置每页显示多少条数据
  const pageSizeChange = (current, pageSize) => {
    pageInfo.pageNum = current;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  }
  //#endregion

  //返回数据
  return {
    sysUsersTable,
    pageInfo,
    getSysUserList,
    pageChange,
    pageSizeChange,
  };
};
//#endregion