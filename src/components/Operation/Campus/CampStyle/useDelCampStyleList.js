/**
 * @author Lemon
 * 删除校区风采
 * */
import { httpDelete } from "@/utils/http";
import { campus } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useDelCampStyleList = getCampStyleList => {
  // 点击确定的回调函数
  const delSubmit = id => {
    // 发送ajax请求
    httpDelete(campus.DelCampStyleList(id))
      .then(res => {
        // 判断是否删除成功
        if (res.success === true) {
          // 提示用户
          message.success(res.message);
          // 重新渲染列表
          getCampStyleList();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const delCancel = () => {
    // 提示用户
    message.info("用户取消操作");
  };

  return {
    // 点击删除的回调函数
    delSubmit,
    // 点击取消的回调函数
    delCancel
  };
};
