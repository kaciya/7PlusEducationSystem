//#region 编辑MCM题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditMCM(editModalVisible) {
  // 编辑MCM题目
  const confirmEditMCM = () => {
    console.log(111111);
    // 关闭MCM模态框
    editModalVisible.mcm = false;
  };
  // 取消添加MCM题目
  const cancelEditMCM = () => {
    // 提示用户
    message.warn("取消编辑MCM题目");
  };
  return {
    confirmEditMCM,
    cancelEditMCM
  };
}
//#endregion
