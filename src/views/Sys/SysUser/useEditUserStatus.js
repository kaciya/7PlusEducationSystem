//导入 API 接口
import { sys } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpPost } from "@/utils/http";

//导入 全局提示信息
import { message } from "ant-design-vue";

//#region 更改账号启用状态
export const useEditUserStatus = getSysUserList => {
  //发起请求  更改账号启用状态
  const changeStatus = userId => {
    //发起请求  更改列的启用状态
    httpPost(sys.EditUserStatus + "/" + userId)
      .then(res => {
        //判断是否改变成功
        if (res.success) {
          //全局提示
          message.success(res.message);
          //刷新页面
          getSysUserList();
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
    changeStatus
  };
};
//#endregion
