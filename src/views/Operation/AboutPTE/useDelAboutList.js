/**
 * @author Lemon
 * 删除关于PTE项
 * */
import { httpDelete } from "@/utils/http";
// 引入api
import { about } from "@/api/operationAPI";
import { message } from "ant-design-vue";

/**
 *
 * @param {function} getAboutData 获取数据
 * @returns {{delSubmit: delSubmit}}
 */
export const useDelAboutList = getAboutData => {
  // 确定删除
  const delSubmit = id => {
    // 发起ajax请求
    httpDelete(about.DelAboutList(id))
      .then(res => {
        if (res.code === 200) {
          message.success(res.message);
          // 重新获取数据
          getAboutData();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const delCancel = () => {
    message.info("用户取消操作");
  };

  return {
    // 确定删除
    delSubmit,
    // 点击取消的回调函数
    delCancel
  };
};
