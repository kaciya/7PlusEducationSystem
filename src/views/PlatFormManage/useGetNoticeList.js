import { ref, createVNode, reactive } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useGetNoticeList = (getNoticeData, tablePagination) => {
  // 输入查询
  const noticeTitle = ref("");

  // 公告状态
  const noticeStatus = ref(null);

  // 发布人
  const noticeUserName = ref("");

  // 重置
  const noticeReset = () => {
    Modal.confirm({
      title: "您是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      onOk() {
        message.success("重置成功");
        // 将页码改为第一页
        tablePagination.current = 1;
        // 重新渲染数据
        getNoticeData();
        clearInput();
      },
      onCancel() {
        message.info("已取消重置");
      }
    });
  };

  // 查询存下的输入框内容
  const noticeModel = reactive({
    status: "",
    title: "",
    username: ""
  });

  // 查询
  const noticeRead = () => {
    noticeModel.status = noticeStatus.value;
    noticeModel.title = noticeTitle.value;
    noticeModel.username = noticeUserName.value;
    // 将页码改为第一页
    tablePagination.current = 1;
    message.success({ content: "查询成功", key: "updatable" });
    // 重新渲染数据
    getNoticeData(noticeStatus.value, noticeTitle.value, noticeUserName.value);
    clearInput();
  };

  // 清空输入框
  const clearInput = () => {
    noticeTitle.value = "";
    noticeStatus.value = null;
    noticeUserName.value = "";
  };

  return {
    noticeTitle,
    noticeStatus,
    noticeUserName,
    noticeReset,
    noticeRead,
    noticeModel
  };
};
