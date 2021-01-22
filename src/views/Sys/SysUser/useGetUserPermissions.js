//导入 reactive 对象
import { reactive } from "vue";

//导入 API 接口
import { role } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 渲染权限列表
export const useGetUserPermissions = () => {
  //权限列表数据存储对象
  let rolesPermissionsList = reactive({});

  //#region 获取权限组列表
  const getPermissions = () => {
    //发起请求  获取权限列表
    httpGet(role.GetRolesList)
      .then(res => {
        if (res.success) {
          //获取权限列表数据
          rolesPermissionsList.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //返回
  return {
    rolesPermissionsList,
    getPermissions
  };
};
//#endregion
