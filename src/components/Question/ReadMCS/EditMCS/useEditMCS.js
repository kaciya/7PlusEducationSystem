//#region 编辑MCS题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditMCS(editModalVisible) {
  // 编辑MCS题目
  const confirmEditMCS = () => {
    console.log(111111);
    // 关闭MCS模态框
    editModalVisible.mcs = false;
  };
  // 取消添加MCS题目
  const cancelEditMCS = () => {
    // 提示用户
    message.warn("取消编辑MCS题目");
  };
  return {
    confirmEditMCS,
    cancelEditMCS
  };
}
//#endregion
