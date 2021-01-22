/**
 * @author Lemon
 * 删除广告位移动端
 * */
import { httpDelete } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useDelMobileList = getMobileList => {
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
          getMobileList();
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
