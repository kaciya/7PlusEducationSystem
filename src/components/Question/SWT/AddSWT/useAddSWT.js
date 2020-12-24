//#region 添加SWT题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddSWT(addModalVisible) {
  // 添加MCM题目
  const confirmAddSWT = () => {
    console.log(111111);
    // 关闭SWT模态框
    addModalVisible.swt = false;
  };
  // 取消添加SWT题目
  const cancelAddSWT = () => {
    // 提示用户
    message.warn("取消添加SWT题目");
  };
  return {
    confirmAddSWT,
    cancelAddSWT
  };
}
//#endregion
