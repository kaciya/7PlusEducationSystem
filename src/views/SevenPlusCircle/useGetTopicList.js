import { ref, createVNode, reactive } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useGetTopicList = (getTopicData, tablePagination) => {
  // 用户名称输入框内容
  const topicUserName = ref("");

  // 分类选择
  const topicSortStatus = ref(null);

  // 重置
  const topicReset = () => {
    Modal.confirm({
      title: "您是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      onOk() {
        message.success("重置成功");
        // 将页码改为第一页
        tablePagination.current = 1;
        // 重新渲染数据
        getTopicData();
        clearInput();
      },
      onCancel() {
        message.info("已取消重置");
      }
    });
  };

  // 查询存下的输入框内容
  const topicModel = reactive({
    username: "",
    status: ""
  });

  // 查询
  const topicRead = () => {
    // 存用户名称和分类
    topicModel.username = topicUserName.value;
    topicModel.status = topicSortStatus.value;
    // 将页码改为第一页
    tablePagination.current = 1;
    message.success({ content: "查询成功", key: "updatable" });
    // 重新渲染数据
    getTopicData(topicUserName.value, topicSortStatus.value);
    clearInput();
  };

  // 清空输入框
  const clearInput = () => {
    topicUserName.value = "";
    topicSortStatus.value = null;
  };

  return {
    topicUserName,
    topicSortStatus,
    topicReset,
    topicRead,
    topicModel
  };
};
