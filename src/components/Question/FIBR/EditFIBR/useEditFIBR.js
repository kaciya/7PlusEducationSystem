//#region 编辑FIBR题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditFIBR(editModalVisible) {
  // 编辑FIBR题目
  const confirmEditFIBR = () => {
    console.log(111111);
    // 关闭FIBR模态框
    editModalVisible.fibr = false;
  };
  // 取消添加FIBR题目
  const cancelEditFIBR = () => {
    // 提示用户
    message.warn("取消编辑FIBR题目");
  };
  return {
    confirmEditFIBR,
    cancelEditFIBR
  };
}
//#endregion
