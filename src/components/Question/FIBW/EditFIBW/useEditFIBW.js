//#region 编辑FIBW题型
// 引入提示框
import { message } from "ant-design-vue";
export function useEditFIBW(editModalVisible) {
  // 编辑FIBW题目
  const confirmEditFIBW = () => {
    console.log(111111);
    // 关闭FIBW模态框
    editModalVisible.fibw = false;
  };
  // 取消添加FIBW题目
  const cancelEditFIBW = () => {
    // 提示用户
    message.warn("取消编辑FIBW题目");
  };
  return {
    confirmEditFIBW,
    cancelEditFIBW
  };
}
//#endregion
