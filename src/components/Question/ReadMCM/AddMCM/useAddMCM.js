//#region 添加MCM题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddMCM(addModalVisible) {
  // 添加MCM题目
  const confirmAddMCM = () => {
    console.log(111111);
    // 关闭MCM模态框
    addModalVisible.mcm = false;
  };
  // 取消添加MCM题目
  const cancelAddMCM = () => {
    // 提示用户
    message.warn("取消添加MCM题目");
  };
  return {
    confirmAddMCM,
    cancelAddMCM
  };
}
//#endregion
