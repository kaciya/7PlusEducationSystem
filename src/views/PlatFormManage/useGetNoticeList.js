import { createVNode } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useGetNoticeList = (
  getNoticeData,
  clearInput,
  tablePagination
) => {
  // 重置
  const noticeReset = () => {
    Modal.confirm({
      title: "您是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      onOk() {
        message.success("重置成功");
        // 清空输入框
        clearInput();
        // 重新渲染数据
        getNoticeData();
      },
      onCancel() {
        message.info("已取消重置");
      }
    });
  };

  // 查询
  const noticeRead = () => {
    // 将页码改为第一页
    tablePagination.current = 1;
    message.success("查询成功");
    // 重新渲染数据
    getNoticeData();
  };

  return {
    noticeReset,
    noticeRead
  };
};
