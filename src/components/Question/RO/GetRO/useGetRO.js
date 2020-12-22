//#region 查看RO题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetRO(getModalVisible) {
  // 查看RO题目
  const confirmGetRO = () => {
    console.log(111111);
    // 关闭RO模态框
    getModalVisible.ro = false;
  };
  // 取消查看RO题目
  const cancelGetRO = () => {
    // 提示用户
    message.warn("取消查看RO题目");
  };
  return {
    confirmGetRO,
    cancelGetRO
  };
}
//#endregion
