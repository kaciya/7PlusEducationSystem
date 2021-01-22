//导入 vue 对象
import { ref, reactive } from "vue";

//导入 API接口
import { feedback } from "@/api/subUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const useGetFeedbackList = feedbackTable => {
  //创建加载状态
  const isLoading = ref(false);

  //#region 分页参数
  const feedbackPagination = reactive({
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

  //#region 根据后台接口地址发送请求联系记录
  const getFeedbackData = getParam => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: feedbackPagination.current,
      pageSize: feedbackPagination.pageSize
    });

    //判断获取到的参数是否为空
    if (getParam) {
      searchData.data = getParam;
      //不为空则 添加到 params对象中
      params.endDate = getParam.endDate;
      params.startDate = getParam.startDate;
      params.status = getParam.status;
    }

    //发起请求前 加载状态
    isLoading.value = true;

    //请求接口: /admin/feedback/page
    httpGet(feedback.GetFeedbackList, params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //将获取到的数据列表存入变量中
          feedbackTable.data = res.data.records;
          //获取分页总数量
          feedbackPagination.total = res.data.total;

          //加载成功后 取消加载状态
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
    feedbackPagination.current = pagination.current;
    feedbackPagination.pageSize = pagination.pageSize;

    //刷新列表
    getFeedbackData(searchData.data);
  };
  //#endregion

  //返回数据
  return {
    //分页参数
    feedbackPagination,
    //加载状态
    isLoading,
    //反馈列表 数据
    getFeedbackData,
    //点击下一页方法
    pageChange
  };
};
//#endregion
