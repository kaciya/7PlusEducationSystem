/**
 * @author Lemon
 * 更改轮播图状态
 * */
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useChangeBannerList = getBannerList => {
  // 点击气泡框的回调
  const changeBannerList = id => {
    // 发起ajax请求
    httpPost(param.ChangeAdList(id))
      .then(res => {
        // 判断是否操作成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getBannerList();
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
    changeBannerList
  };
};
