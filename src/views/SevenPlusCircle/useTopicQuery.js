import { ref, createVNode } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useTopicQuery = (pageNum, topicGetData) => {
  // 用户名称输入框内容
  const topicUserName = ref("");
  // 分类选择
  const topicSortStatus = ref(null);
  // 重置
  const topicReset = () => {
    Modal.confirm({
      title: "你是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        message.success("重置成功");
        topicGetData();
        clearInput();
      },
      onCancel() {
        message.info("已取消重置");
      }
    });
  };
  // 查询
  const topicInquire = () => {
    topicGetData(1, 10, topicUserName.value, topicSortStatus.value);
    clearInput();
  };
  // 清空输入框
  const clearInput = () => {
    topicUserName.value = "";
    topicSortStatus.value = null;
    pageNum.value = 1;
  };

  return {
    topicUserName,
    topicSortStatus,
    topicReset,
    topicInquire
  };
};
