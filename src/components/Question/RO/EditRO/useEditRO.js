//#region 编辑RO题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditRO(editModalVisible) {
  // 编辑RO题目
  const confirmEditRO = () => {
    console.log(111111);
    // 关闭RO模态框
    editModalVisible.ro = false;
  };
  // 取消添加RO题目
  const cancelEditRO = () => {
    // 提示用户
    message.warn("取消编辑RO题目");
  };
  return {
    confirmEditRO,
    cancelEditRO
  };
}
//#endregion
