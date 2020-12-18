//导入 reactive 对象
import {
  reactive
} from "vue";

//导入 API接口
import {
  log
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

//#region 获取 操作日志 数据列表
export const useGetLogList = (logTable) => {
  //#region 发起请求  获取数据列表
  const getLogData = (getParam) => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: 1,
      pageSize: 10,
    })
    //判断获取到的参数是否为空
    if (getParam) {
        //不为空则 添加到 params对象中
        params.endTime = getParam.endDate,
        params.startTime = getParam.startDate,
        params.username = getParam.username
    }

    //请求接口: /admin/log/page
    httpGet(log.GetLogList, params)
      .then(res => {
        if (res.success == true) {
          //获取操作日志数据
          logTable.logData = res.data.records;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //返回
  return {
    getLogData,
  };
};
//#endregion