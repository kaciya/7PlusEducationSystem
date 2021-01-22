//导入 API接口
import { role } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpDelete } from "@/utils/http";

import { message } from "ant-design-vue";

//#region 删除模态框 中 删除点击事件
export const useDelRoles = getSysRolesData => {
  //显示删除模态框
  const showDelConfirm = roleId => {
    //发起请求 通过 id 删除指定列表项
    httpDelete(role.DelRoles + "/" + roleId)
      .then(res => {
        //判断是否删除成功
        if (res.success) {
          message.success(res.message);
          //刷新页面
          getSysRolesData();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  //返回方法
  return {
    showDelConfirm
  };
};
//#endregion
