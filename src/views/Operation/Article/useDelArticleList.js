/**
 * @author Lemon
 * 删除文章列表
 * */
import { httpDelete } from "@/utils/http";
import { article } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useDelArticleList = getArticl => {
  // 点击确定的回调函数
  const delSubmit = id => {
    // 发送ajax请求
    httpDelete(article.DelArticleList(id))
      .then(res => {
        // 判断是否删除成功
        if (res.success) {
          // 提示用户
          message.success(res.message);
          // 重新获取数据
          getArticl();
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
