//导入 reactive 对象
import { reactive } from "vue";

//#region 查询列表
export const useSearchContact = (getContactData, headerData) => {
  //创建变量 接受查询参数
  const searchData = reactive({});

  //通过时间范围 和 状态 发起查询请求 获取查询结果
  const searchClick = () => {
    //重置状态
    searchData.status = "";

    //获取日期范围
    //判断获取的日期是否为空
    if (headerData.dateModel.length != 0) {
      searchData.startDate = headerData.confirmDate.startDate;
      searchData.endDate = headerData.confirmDate.endDate;
    }

    //获取状态
    //判断状态值是否为 2
    if (headerData.selectModel == "1" || headerData.selectModel == "0") {
      searchData.status = headerData.selectModel;
    }

    //发起查询请求
    getContactData(searchData);
  };

  //返回方法
  return {
    searchData,
    searchClick
  };
};
//#endregion
