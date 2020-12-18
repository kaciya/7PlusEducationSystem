//导入 reactive 对象
import {
  ref
} from "vue";

//导入 API接口
import {
  feedback
} from "@/api/subUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const useGetFeedbackList = (feedbackTable) => {
  //图片获取正则表达
  const matchReg = ref("\\[(.*?)\\]");

  //#region 根据后台接口地址发送请求联系记录
  const getFeedbackData = (params) => {
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
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //返回数据
  return {
    getFeedbackData,
  };
};
//#endregion