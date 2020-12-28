//#region 查看FIBR题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetFIBR(getModalVisible) {
  // 查看FIBR题目
  const confirmGetFIBR = () => {
    console.log(111111);
    // 关闭FIBR模态框
    getModalVisible.fibr = false;
  };
  // 取消查看FIBR题目
  const cancelGetFIBR = () => {
    // 提示用户
    message.warn("取消查看FIBR题目");
  };
  return {
    confirmGetFIBR,
    cancelGetFIBR
  };
}
//#endregion
