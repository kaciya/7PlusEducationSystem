import { ref } from "vue";
// 引入全局提示插件
import { message } from "ant-design-vue";
// iocn图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 引入确认框
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const useResetList = (getUserListData, userPagination) => {
  //#region 重置
  // 定义表单数据相当于$ref
  const userRef = ref(null);
  // 点击重置事件
  const resetUserList = () => {
    // 重置二次确定模态框
    Modal.confirm({
      title: "您确定要重置吗？",
      icon: createVNode(ExclamationCircleOutlined),
      // 点击确定事件
      onOk() {
        // 重置页码回到第一页
        userPagination.current = 1;
        // 清空文本框
        userRef.value.resetFields();
        // 重置列表
        getUserListData();
        // 全局提示
        message.success("重置成功");
      },
      // 点击取消事件
      onCancel() {
        message.info("您已经取消重置");
      }
    });
  };
  //#endregion

  return {
    userRef,
    resetUserList
  };
};
