//#region 编辑WE题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditWE(editModalVisible) {
  // 编辑WE题目
  const confirmEditWE = () => {
    console.log(111111);
    // 关闭WE模态框
    editModalVisible.we = false;
  };
  // 取消添加WE题目
  const cancelEditWE = () => {
    // 提示用户
    message.warn("取消编辑WE题目");
  };
  return {
    confirmEditWE,
    cancelEditWE
  };
}
//#endregion
