/**
 * @author Lemon
 * 修改联系状态
 * */
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useChangeLinkList = getLinkList => {
  // 点击开关的回调函数
  const changLinkList = id => {
    // 发送ajax请求
    httpPost(param.ChangeLinkList(id))
      .then(res => {
        // 判断是否请求成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getLinkList();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    // 点击开关的回调函数
    changLinkList
  };
};
