import { ref, createVNode } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useNoticeQuery = noticeGetData => {
  // 输入查询
  const noticeInputQuery = ref("");
  // 公告状态
  const noticeStatus = ref(null);
  // 对象
  const noticeObj = ref("");
  // 当前页
  const pageNum = ref(1);
  // 重置
  const noticeReset = () => {
    Modal.confirm({
      title: "你是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        message.success("重置成功");
        noticeGetData();
        clearInput();
      },
      onCancel() {
        message.info("已取消重置");
      }
    });
  };
  // 查询
  const noticeRead = () => {
    noticeGetData(1, 20, noticeStatus.value, noticeInputQuery.value);
    clearInput();
  };
  // 清空输入框
  const clearInput = () => {
    noticeInputQuery.value = "";
    noticeStatus.value = null;
    noticeObj.value = "";
    pageNum.value = 1;
  };

  return {
    noticeInputQuery,
    noticeStatus,
    noticeObj,
    pageNum,
    noticeReset,
    noticeRead
  };
};
