//#region 添加FIBR题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddFIBR(addModalVisible) {
  // 添加FIBR题目
  const confirmAddFIBR = () => {
    console.log(111111);
    // 关闭FIBR模态框
    addModalVisible.ro = false;
  };
  // 取消添加FIBR题目
  const cancelAddFIBR = () => {
    // 提示用户
    message.warn("取消添加FIBR题目");
  };
  return {
    confirmAddFIBR,
    cancelAddFIBR
  };
}
//#endregion
