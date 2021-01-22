/**
 * @author Lemon
 * 更改更多服务状态
 * */
import { message } from "ant-design-vue";
import { param } from "@/api/operationAPI";
import { httpPost } from "@/utils/http";

export const useChangeMoreList = getMoreList => {
  // 点击气泡框的回调
  const changeMoreList = id => {
    // 发起ajax请求
    httpPost(param.ChangeAdList(id))
      .then(res => {
        // 判断是否操作成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getMoreList();
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
    changeMoreList
  };
};
