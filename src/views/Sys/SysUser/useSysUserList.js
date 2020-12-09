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
  httpGet,
  httpDelete
} from "@/utils/http";

//导入 全局提示信息
import {
  message
} from 'ant-design-vue';

//#region 定义方法  获取账号列表
export const showSysUserList = () => {
  //#region 分页所需数据
  const pageInfo = reactive({
    //列表所在页数
    pageNum: 2,
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
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //#region 删除
  const removeSysUser = (sysUserId) => {
    //向后台发起请求  删除此项
    httpDelete(`${sys.removeSysUser}/${sysUserId}`)
      .then(res => {
        if (res.success) {
          message.success("删除成功");
        }
      })
      .catch(error => {
        message.error("删除失败: " + error);
      })
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
    removeSysUser,
    pageChange,
    pageSizeChange,
  };
};
//#endregion