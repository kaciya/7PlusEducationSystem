//导入 reactive 对象
import { reactive } from "vue";

//#region 查询列表
export const useSearchContact = (getContactData, headerData) => {
  //通过时间范围 和 状态 发起查询请求 获取查询结果
  const searchClick = () => {
    //创建变量  存储接口查询参数
    const params = reactive({});
    console.log(headerData.confirmDate);
    //获取日期范围
    //判断获取的日期是否为空
    if (headerData.dateModel.length != 0) {
      params.startDate = headerData.confirmDate.startDate;
      params.endDate = headerData.confirmDate.endDate;
    }

    //获取状态
    //判断状态值是否为 2
    if (headerData.selectModel == "1" || headerData.selectModel == "0") {
      params.status = headerData.selectModel;
    }
    //发起查询请求
    getContactData(params);

    //将双向绑定的 日期 和 选择项 中的值 重置
    headerData.selectModel = "2";
    headerData.dateModel = [];
    headerData.confirmDate = {};
  };

  //返回方法
  return {
    searchClick
  };
};
//#endregion
