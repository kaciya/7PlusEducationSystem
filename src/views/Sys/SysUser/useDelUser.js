//导入 Delete请求方法
import { httpPost } from "@/utils/http";

//导入 API 接口
import { sys } from "@/api/sysUserAPI";

//导入全局提示信息
import { message } from "ant-design-vue";

//#region 显示删除模态框
export const useDelUser = getSysUserList => {
  const showDelConfirm = userId => {
    //发送请求 删除此项
    httpPost(sys.DelUser + "/" + userId)
      .then(res => {
        if (res.success) {
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
    showDelConfirm
  };
};
//#endregion
