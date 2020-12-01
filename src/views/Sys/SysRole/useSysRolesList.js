//导入 reactive 对象
import { reactive } from "vue";

//导入 API接口
import { role } from "@/api/sysAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 渲染权限组标签列表 和 表头
export const showRoleList = () => {
  //定义 表格项
  const rolesColums = reactive([
    {
      title: "#",
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
  ]);

  //#region 根据后台接口地址发送请求获取权限组数据
  let rolesData = reactive({});
  //请求地址 /admin/role/list
  httpGet(role.sysRolesList)
    .then(results => {
      //判断相应状态
      if (results.success) {
        rolesData.data = results.data;
      }
    })

    .catch(error => {
      console.log("error", error);
    });
  //#endregion

  //返回
  return {
    rolesColums,
    rolesData
  };
};
//#endregion
