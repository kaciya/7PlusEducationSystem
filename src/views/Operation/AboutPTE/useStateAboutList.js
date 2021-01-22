/**
 * @author Lemon
 * 更改文章状态
 */
// 引入http工具
import { httpPost } from "@/utils/http";
// 引入api
import { about } from "@/api/operationAPI";
import { message } from "ant-design-vue";

/**
 *
 * @param {function} getAboutData 获取关于PTE数据列表
 */
export const useStateAboutList = getAboutData => {
  // 开关点击时候的回调函数
  const stateChange = id => {
    // 发起ajax请求
    httpPost(about.EditStateAboutList(id))
      .then(res => {
        // 判断是否更改成功
        if (res.success === true) {
          // 消息提示
          message.success(res.message);
          // 重新渲染数据
          getAboutData();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    stateChange
  };
};
