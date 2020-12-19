//导入 API接口
import { feedback } from "@/api/subUserAPI";

//导入 GET请求方法
import { httpPost } from "@/utils/http";

//导入 全局提示信息
import { message } from "ant-design-vue";

//#region 操作处理 点击事件
export const useEditFeedbackManage = () => {
  //点击处理 将未处理 的 问题 更改为 已解决
  const editManage = feedId => {
    //根据id 发送请求
    httpPost(feedback.FeedbackHandle, {
      description: "aaa",
      feedbackId: feedId,
      status: 1
    })
      .then(res => {
        if (res.success) {
          message.success(res.message);
          //重新刷新列表
          getFeedbackData();
        }
      })
      .catch(error => {
        message.error(error);
      });
  };

  //返回 操作处理事件
  return {
    editManage
  };
};
//#endregion
