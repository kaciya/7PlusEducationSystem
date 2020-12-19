//导入 reactive 对象
import { ref, reactive } from "vue";

//导入 API接口
import { feedback } from "@/api/subUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const useGetFeedbackList = feedbackTable => {
  //图片获取正则表达
  const matchReg = ref("\\[(.*?)\\]");

  //#region 分页参数
  const feedbackPagination = reactive({
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

  //#region 根据后台接口地址发送请求联系记录
  const getFeedbackData = params => {
    //请求接口: /admin/feedback/page
    httpGet(feedback.GetFeedbackList, params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //遍历获取到的数据列表
          res.data.records.forEach(element => {
            //获取每个图片  使用正则表达式将图片地址 切割出 重新存入图片参数中
            element.picUrls = element.picUrls.match(matchReg.value)[1];
          });
          //将获取到的数据列表存入变量中
          feedbackTable.data = res.data.records;
          //获取分页总数量
          feedbackPagination.total = res.data.total;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    //点击下一页后 将分页参数中的 当前页 和 一页显示的数据改变
    feedbackPagination.current = pagination.current;
    feedbackPagination.pageSize = pagination.pageSize;
    //刷新列表
    getFeedbackData();
  };
  //#endregion

  //返回数据
  return {
    //分页参数
    feedbackPagination,
    //反馈列表 数据
    getFeedbackData,
    //点击下一页方法
    pageChange
  };
};
//#endregion
