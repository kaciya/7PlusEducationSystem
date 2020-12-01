//导入 reactive 对象
import { reactive } from "vue";

//导入 API 接口
import { sys } from "@/api/sysAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 定义方法  获取账号列表
export const showSysUserList = () => {
  //定义 表格项
  let sysUsersColums = reactive([
    // 列表索引
    {
      title: "#",
      key: "index",
      slots: { customRender: "index" }
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
      slots: { customRender: "status" }
    },
    //操作
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);

  //#region 根据后台接口地址发送请求获取权限组数据
  //定义 列表数据
  let sysUsersData = reactive({});

  //请求地址 /admin/sys/user/list
  httpGet(sys.sysUserList)
    .then(res => {
      //判断相应状态
      if (res.success) {
        sysUsersData.data = res.data;
      }
    })
    .catch(error => {
      console.log(error);
    });
  //#endregion

  return {
    sysUsersColums,
    sysUsersData
  };
};
//#endregion
