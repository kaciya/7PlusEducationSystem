/**
 * @author Lemon
 * 删除PC广告
 * */
import { httpDelete } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useDelMoreList = getAdPcList => {
  // 点击确定的回调函数
  const delSubmit = id => {
    // 发送ajax请求
    httpDelete(param.DelAdList(id))
      .then(res => {
        // 判断是否删除成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getAdPcList();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    delSubmit
  };
};
