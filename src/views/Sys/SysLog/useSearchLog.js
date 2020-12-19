//导入 reactive 对象
import { reactive } from "vue";

//#region 查询列表
export const useSearchLog = (getLogData, headerData) => {
  //
  const searchClick = () => {
    //创建变量  存储接口查询参数
    let params = reactive({});

    //获取日期范围
    //判断获取的日期是否为空
    if (headerData.dateModel.length != 0) {
      params.startDate = headerData.confirmDate.startDate;
      params.endDate = headerData.confirmDate.endDate;
    }

    //获取状态
    //判断账号名称是否为空
    if (headerData.usernameModel) {
      params.username = headerData.usernameModel;
    }
    //发起查询请求
    getLogData(params);

    //将双向绑定的 日期 和 账号名称 中的值 重置
    headerData.dateModel = [];
    headerData.usernameModel = "";
    headerData.confirmDate = {};
  };

  //返回 查询方法
  return {
    searchClick
  };
};
//#endregion
