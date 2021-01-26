//导入 reactive 对象
import { ref, reactive } from "vue";

//导入 API接口
import { log } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 操作日志 数据列表
export const useGetLogList = logTable => {
  //创建加载状态
  const isLoading = ref(false);

  //#region
  const logPagination = reactive({
    //列表所在页数
    current: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //一共多少条数据
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion

  //获取查询数据
  const searchData = reactive({});

  //#region 发起请求  获取数据列表
  const getLogData = getParam => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: logPagination.current,
      pageSize: logPagination.pageSize
    });
    //判断获取到的参数是否为空
    if (getParam) {
      //获取查询数据
      searchData.data = getParam;
      //不为空则 添加到 params对象中
      params.endTime = getParam.endDate;
      params.startTime = getParam.startDate;
      params.username = getParam.username;
    }

    //发送请求时 显示加载状态
    isLoading.value = true;

    //请求接口: /admin/log/page
    httpGet(log.GetLogList, params)
      .then(res => {
        if (res.success) {
          //获取操作日志数据
          logTable.data = res.data.records;
          //获取分页总数量
          logPagination.total = res.data.total;

          //请求成功后 取消加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    //点击下一页后 将分页参数中的 当前页 和 一页显示的数据改变
    logPagination.current = pagination.current;
    logPagination.pageSize = pagination.pageSize;
    //刷新列表
    getLogData(searchData.data);
  };
  //#endregion

  //返回
  return {
    //操作日志分页
    logPagination,
    //加载状态
    isLoading,
    //获取操作日志数据方法
    getLogData,
    //分页改变方法
    pageChange
  };
};
//#endregion
