//#region 退出登录
// 导入请求方法
import { httpPost } from "@/utils/http";
// 导入auth接口
import auth from "@/api/authAPI";
// 导入对话框
import { Modal } from "ant-design-vue";
// 导入创建虚拟DOM
import { createVNode } from "vue";
// 导入警告图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 导入全局提示
import { message } from "ant-design-vue";
// 导入router
import { useRouter } from "vue-router";
export const useLogout = () => {
  // 使用router
  const router = useRouter();

  // 退出登录方法
  function handleLogout() {
    // 确认退出弹窗
    Modal.confirm({
      title: "退出系统确认",
      icon: createVNode(ExclamationCircleOutlined),
      content: "确定要退出登录吗？",
      autoFocusButton: "cancel", //指定自动获得焦点的按钮
      onOk() {
        return new Promise(resolve => {
          httpPost(auth.UserLogout).then(res => {
            if (res.success) {
              // 移除token
              window.sessionStorage.removeItem("token");
              // 调回登录页
              router.push("/login");
              // 提示退出成功
              message.success("退出成功", 2);
              // 结束加载
              resolve();
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => message.error("退出失败", 2));
      },
      onCancel() {
        return;
      }
    });
  }

  // 返回
  return {
    handleLogout //退出登录
  };
};
//#endregion
