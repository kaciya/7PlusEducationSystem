//导入 API 接口
import { sys } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpPost } from "@/utils/http";

//导入模态框所需图标样式
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";

//导入 全局提示信息
import { Modal, message } from "ant-design-vue";

//#region 重置用户账号密码
export const useResetUserPwd = () => {
  //显示重置账号密码提示框
  const resetUserPwd = userId => {
    //弹窗验证是否重置密码
    Modal.confirm({
      title: "确定重置该账户密码为初始密码？",
      icon: createVNode(ExclamationCircleOutlined),
      content: "重置密码后该用户需重新登陆",
      maskClosable: true,
      onOk() {
        //发起请求  重置该密码
        httpPost(sys.ResetUser + "/" + userId)
          .then(res => {
            if (res.success) {
              message.success(res.message);
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            throw err;
          });
      }
    });
  };

  //返回方法
  return {
    resetUserPwd
  };
};
//#endregion
