//导入 reactive 对象
import { reactive } from "vue";

//导入 API接口
import { log } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 操作日志 数据列表
export const showLogList = logTable => {
  //#region 分页所需数据
  const pageInfo = reactive({
    //列表所在页数
    pageNum: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //指定每页可以显示多少条
    pageSizeOptions: ["10", "20", "30", "40", "50"],
    //一共多少条数据
    total: 0
  });
  //#endregion

  //#region 发起请求  获取数据列表
  const getLogData = getParam => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: 1,
      pageSize: 10
    });
    //判断获取到的参数是否为空
    if (getParam) {
      //不为空则 添加到 params对象中
      (params.endTime = getParam.endDate),
        (params.startTime = getParam.startDate),
        (params.username = getParam.username);
    }

    //请求接口: /admin/log/page
    httpGet(log.sysLogList, params)
      .then(res => {
        if (res.success == true) {
          //获取操作日志数据
          logTable.logData = res.data.records;
          //获取多少条数据
          pageInfo.total = res.data.records.length;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  //#endregion

  //#region 点击下一页方法
  const pageChange = (page, pageSize) => {
    pageInfo.pageNum = page;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  };
  //#endregion

  //#region 设置每页显示多少条数据
  const pageSizeChange = (current, pageSize) => {
    pageInfo.pageNum = current;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  };
  //#endregion

  //返回
  return {
    pageInfo,
    getLogData,
    pageChange,
    pageSizeChange
  };
};
//#endregion
