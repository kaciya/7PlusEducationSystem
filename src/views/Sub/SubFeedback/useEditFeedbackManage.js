//导入 API接口
import { feedback } from "@/api/subUserAPI";

//导入 GET请求方法
import { httpPost } from "@/utils/http";

//导入 对话框 图标 提示
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";

//导入 全局提示信息
import { Modal, message } from "ant-design-vue";

//#region 操作处理 点击事件
export const useEditFeedbackManage = getFeedbackData => {
  //点击处理 将未处理 的 问题 更改为 已解决
  const editManage = feedId => {
    Modal.confirm({
      title: "确定处理该记录吗?",
      icon: createVNode(ExclamationCircleOutlined),
      content: "处理后操作不能点击 且状态为已解决",
      onOk() {
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
          .catch(err => {
            throw err;
          });
      }
    });
  };

  //返回 操作处理事件
  return {
    editManage
  };
};
//#endregion
