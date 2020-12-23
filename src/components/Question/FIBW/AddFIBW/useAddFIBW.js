//#region 添加FIBW题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddFIBW(addModalVisible) {
  // 添加FIBW题目
  const confirmAddFIBW = () => {
    console.log(111111);
    // 关闭FIBW模态框
    addModalVisible.fibw = false;
  };
  // 取消添加FIBW题目
  const cancelAddFIBW = () => {
    // 提示用户
    message.warn("取消添加FIBW题目");
  };
  return {
    confirmAddFIBW,
    cancelAddFIBW
  };
}
//#endregion
