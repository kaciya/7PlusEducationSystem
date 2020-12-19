//导入 reactive 对象
import { reactive } from "vue";

//导入 API接口
import { log } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 操作日志 数据列表
export const useGetLogList = logTable => {
  //#region
  const logPagination = reactive({
    //列表所在页数
    current: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //指定每页可以显示多少条
    pageSizeOptions: ["10"],
    //一共多少条数据
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion

  //#region 发起请求  获取数据列表
  const getLogData = getParam => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: logPagination.current,
      pageSize: logPagination.pageSize
    });
    //判断获取到的参数是否为空
    if (getParam) {
      //不为空则 添加到 params对象中
      params.endTime = getParam.endDate;
      params.startTime = getParam.startDate;
      params.username = getParam.username;
    }

    //请求接口: /admin/log/page
    httpGet(log.GetLogList, params)
      .then(res => {
        if (res.success == true) {
          //获取操作日志数据
          logTable.logData = res.data.records;
          //获取分页总数量
          logPagination.total = res.data.total;
        }
      })
      .catch(error => {
        throw error;
      });
  };
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    //点击下一页后 将分页参数中的 当前页 和 一页显示的数据改变
    logPagination.current = pagination.current;
    logPagination.pageSize = pagination.pageSize;
    //刷新列表
    getLogData();
  };
  //#endregion

  //返回
  return {
    logPagination,
    getLogData,
    pageChange
  };
};
//#endregion
