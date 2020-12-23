//#region 查看MCM题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetMCM(getModalVisible) {
  // 查看MCM题目
  const confirmGetMCM = () => {
    console.log(111111);
    // 关闭MCM模态框
    getModalVisible.mcm = false;
  };
  // 取消查看MCM题目
  const cancelGetMCM = () => {
    // 提示用户
    message.warn("取消查看MCM题目");
  };
  return {
    confirmGetMCM,
    cancelGetMCM
  };
}
//#endregion
