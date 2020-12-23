//#region 查看WE题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetWE(getModalVisible) {
  // 查看WE题目
  const confirmGetWE = () => {
    console.log(111111);
    // 关闭WE模态框
    getModalVisible.we = false;
  };
  // 取消查看WE题目
  const cancelGetWE = () => {
    // 提示用户
    message.warn("取消查看WE题目");
  };
  return {
    confirmGetWE,
    cancelGetWE
  };
}
//#endregion
