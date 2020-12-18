//导入 API接口
import { role } from "@/api/sysUserAPI";

//导入 Post请求方法
import { httpPost } from "@/utils/http";

//导入全局提示
import { message } from "ant-design-vue";

//#region 更改权限组启用状态
export const updateRoleStatus = getSysRolesData => {
  //发起请求  更改启用状态
  const statusChange = roleId => {
    //发起请求  更改用户状态
    httpPost(`${role.changeSysRolesStatus}/${roleId}`)
      .then(res => {
        if (res.success) {
          message.success("状态改变成功");
          //刷新页面
          getSysRolesData();
        } else {
          message.error("状态改变失败");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //返回方法
  return {
    statusChange
  };
};
//#endregion
