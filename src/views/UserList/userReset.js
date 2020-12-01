import { ref } from "vue";
// 引入获取信息文件
import { userData } from "./userData";
// 引入全局提示插件
import { message } from "ant-design-vue";
// iocn图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 引入确认框
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const userReset = () => {
  // 引入获取信息方法
  let { isSuccess } = userData();
  //#region 重置
  // 定义表单数据相当于$ref
  let userForm = ref(null);
  // 点击重置事件
  let handelReset = callback => {
    // 重置二次确定模态框
    Modal.confirm({
      title: "您确定要重置吗？",
      icon: createVNode(ExclamationCircleOutlined),
      // 点击确定事件
      onOk() {
        // 清空文本框
        userForm.value.resetFields();
        // 重置列表
        callback();
        // 判断请求是否发送成功
        if (isSuccess.value) {
          // 全局提示
          message.success("重置成功");
          // 改为默认状态
          isSuccess.value = false;
        }
      },
      // 点击取消事件
      onCancel() {
        message.info("您已经取消重置");
      }
    });
  };
  //#endregion

  return {
    userForm,
    handelReset
  };
};
