//#region 查看FIBW题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetFIBW(getModalVisible) {
  // 查看FIBW题目
  const confirmGetFIBW = () => {
    console.log(111111);
    // 关闭FIBW模态框
    getModalVisible.fibw = false;
  };
  // 取消查看FIBW题目
  const cancelGetFIBW = () => {
    // 提示用户
    message.warn("取消查看FIBW题目");
  };
  return {
    confirmGetFIBW,
    cancelGetFIBW
  };
}
//#endregion
