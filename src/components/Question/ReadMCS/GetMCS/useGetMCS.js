//#region 查看MCS题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetMCS(getModalVisible) {
  // 查看MCS题目
  const confirmGetMCS = () => {
    console.log(111111);
    // 关闭MCS模态框
    getModalVisible.mcs = false;
  };
  // 取消查看MCS题目
  const cancelGetMCS = () => {
    // 提示用户
    message.warn("取消查看MCS题目");
  };
  return {
    confirmGetMCS,
    cancelGetMCS
  };
}
//#endregion
