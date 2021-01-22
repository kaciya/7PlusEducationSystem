//#region 修改密码 表单提交
// 导入请求
import { httpPost } from "@/utils/http";
// 导入api接口
import { sys } from "@/api/sysUserAPI";
// 导入全局提示
import { message } from "ant-design-vue";
export function useEditPwdSubmit(editPwdForm, editPwdRef, backLogin) {
  // 修改密码 [提交]
  const editPwdSubmit = () => {
    editPwdRef.value
      .validate()
      .then(() => {
        // 打开确认按钮加载loading
        editPwdForm.loading = true;
        // 定义请求参数
        const params = {
          oldPassword: editPwdForm.model.oldPwd,
          newPassword: editPwdForm.model.newPwd
        };
        // 发起请求
        httpPost(sys.UpdatePwd, params)
          .then(res => {
            console.log(res);
            // 关闭确认按钮加载loading
            editPwdForm.loading = false;
            // 请求成功
            if (res.success) {
              // 全局提示
              message.success("修改成功，请重新登录");
              // 返回登录页
              backLogin();
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            // 抛出错误
            throw new Error(err);
          });
      })
      .catch(error => {
        // 错误提示
        console.log(error);
      });
  };

  // 返回
  return {
    editPwdSubmit
  };
}
//#endregion
