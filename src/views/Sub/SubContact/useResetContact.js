//导入 全局提示信息
import { message } from "ant-design-vue";

//#region 重置列表项 和 时间范围
export const useResetContact = (getContactData, headerData) => {
  //将获取到的 时间范围 和 状态 重置为默认状态
  const resetClick = () => {
    //将双向绑定的 日期 和 选择项 中的值 重置
    headerData.selectModel = "2";
    headerData.dateModel = [];
    headerData.confirmDate = {};
    //重新刷新页面
    getContactData();
    message.success("日期选择 与 状态 已重置");
  };

  //返回方法
  return {
    resetClick
  };
};
//#endregion
