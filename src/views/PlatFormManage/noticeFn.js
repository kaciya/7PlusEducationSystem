import { ref, createVNode } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const noticeFunction = () => {
  // 输入查询
  const inputQuery = ref("");
  // 公告状态
  const noticeStatus = ref(null);
  // 对象
  const noticeObj = ref("");
  // 当前页
  const current = ref(1);
  // 重置
  const reset = callback => {
    Modal.confirm({
      title: "你是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        message.success("重置成功");
        callback();
        clearInput();
      }
    });
  };
  // 查询
  function inquire(callback) {
    callback(1, 1, { status: noticeStatus.value, title: inputQuery.value });
    clearInput();
  }
  // 清空输入框
  function clearInput() {
    inputQuery.value = "";
    noticeStatus.value = null;
    noticeObj.value = "";
    current.value = 1;
  }
  // 点击添加
  const addVisible = ref(false);
  function addShowModal() {
    addVisible.value = true;
  }
  // 表单内容
  const addForm = ref({
    title: ""
  });
  // 校验规则
  const addRules = ref({
    title: [
      { required: true, message: "公告标题不能为空", trigger: "blur" },
      { min: 1, max: 20, message: "长度在1-20之间", trigger: "blur" }
    ]
  });
  return {
    inputQuery,
    noticeStatus,
    noticeObj,
    current,
    reset,
    inquire,
    addVisible,
    addShowModal,
    addForm,
    addRules
  };
};
