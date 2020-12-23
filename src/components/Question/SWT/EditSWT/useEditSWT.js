//#region 编辑SWT题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditSWT(editModalVisible) {
  // 编辑SWT题目
  const confirmEditSWT = () => {
    console.log(111111);
    // 关闭SWT模态框
    editModalVisible.swt = false;
  };
  // 取消添加SWT题目
  const cancelEditSWT = () => {
    // 提示用户
    message.warn("取消编辑SWT题目");
  };
  return {
    confirmEditSWT,
    cancelEditSWT
  };
}
//#endregion
