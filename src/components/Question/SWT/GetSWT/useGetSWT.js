//#region 查看SWT题型
// 引入提示框
import { message } from "ant-design-vue";
export function useGetSWT(getModalVisible, questionType) {
  // 查看SWT题目
  const confirmGetSWT = () => {
    console.log(111111);
    // 关闭SWT模态框
    getModalVisible[questionType] = false;
  };
  // 取消查看SWT题目
  const cancelGetSWT = () => {
    // 提示用户
    message.warn("取消查看SWT题目");
  };
  return {
    confirmGetSWT,
    cancelGetSWT
  };
}
//#endregion
