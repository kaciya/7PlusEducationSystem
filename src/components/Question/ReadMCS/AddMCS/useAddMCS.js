//#region 添加MCS题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddMCS(addModalVisible) {
  // 添加MCS题目
  const confirmAddMCS = () => {
    console.log(111111);
    // 关闭MCS模态框
    addModalVisible.mcs = false;
  };
  // 取消添加MCM题目
  const cancelAddMCS = () => {
    // 提示用户
    message.warn("取消添加MCS题目");
  };
  return {
    confirmAddMCS,
    cancelAddMCS
  };
}
//#endregion
