//#region 退出登录
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
      okText: "确定",
      cancelText: "取消",
      autoFocusButton: "cancel", //指定自动获得焦点的按钮
      onOk() {
        // 开启加载状态
        // spinning.value = true;
        return new Promise(resolve => {
          setTimeout(() => {
            // 结束
            resolve();
            // 退出登录 [延时]
            setTimeout(() => {
              // 移除token
              window.sessionStorage.removeItem("token");
              // 调回登录页
              router.push("/login");
              // 提示退出成功
              message.success("退出成功", 2);
            }, 200);
          }, 600);
        }).catch(() => console.log("Oops errors!"));
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
