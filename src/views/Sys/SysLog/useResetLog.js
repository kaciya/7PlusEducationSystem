//导入 全局提示信息
import { message } from "ant-design-vue";

//#region 重置列表项 和 时间范围
export const useResetLog = (getLogData, headerData) => {
  //通过 重置 日期 和 账号名称 重新 获取列表值
  const resetClick = () => {
    //将双向绑定的 日期 和 账号名称 中的值 重置
    headerData.dateModel = [];
    headerData.usernameModel = "";
    headerData.confirmDate = {};
    getLogData();
    message.success("日期选择 与 状态 已重置");
  };
  //返回 查询方法
  return {
    resetClick
  };
};
//#endregion
