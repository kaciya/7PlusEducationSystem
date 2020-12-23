//#region 添加WE题型
// 引入提示框
import { message } from "ant-design-vue";
export function useAddWE(addModalVisible) {
  // 添加MCM题目
  const confirmAddWE = () => {
    console.log(111111);
    // 关闭WE模态框
    addModalVisible.we = false;
  };
  // 取消添加WE题目
  const cancelAddWE = () => {
    // 提示用户
    message.warn("取消添加WE题目");
  };
  return {
    confirmAddWE,
    cancelAddWE
  };
}
//#endregion
