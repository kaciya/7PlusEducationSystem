//#region 添加RO题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddRO(addModalVisible) {
  // 添加RO题目
  const confirmAddRO = () => {
    console.log(111111);
    // 关闭ro模态框
    addModalVisible.ro = false;
  };
  // 取消添加RO题目
  const cancelAddRO = () => {
    // 提示用户
    message.warn("取消添加ro题目");
  };
  return {
    confirmAddRO,
    cancelAddRO
  };
}
//#endregion
