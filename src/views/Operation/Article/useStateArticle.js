/**
 * @author Lemon
 * 设置文章状态
 * */
import { httpPost } from "@/utils/http";
import { article } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useStateArticle = getArticl => {
  // 点击开关的回调函数
  const stateClick = record => {
    // 获取id和状态
    const { id } = record;
    handleToggleArticlState(id);
  };

  // 设置文章状态
  const handleToggleArticlState = async id => {
    // 更新文章状态
    const res = await httpPost(article.SetArticleState + `/${id}`);
    if (res.code === 200) {
      message.success(res.message);
      // 获取数据
      getArticl();
    }
  };

  return {
    stateClick
  };
};
