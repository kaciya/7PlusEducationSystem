/**
 * @author Lemon
 * 更改课程图状态
 * */
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useChangeCenterList = getCenterList => {
  // 点击气泡框的回调
  const changeCenterList = id => {
    // 发起ajax请求
    httpPost(param.ChangeAdList(id))
      .then(res => {
        // 判断是否操作成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getCenterList();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    // 点击气泡框的回调
    changeCenterList
  };
};
