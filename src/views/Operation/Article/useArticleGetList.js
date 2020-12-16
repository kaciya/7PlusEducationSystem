/**
 * @author Lemon
 * 获取文章列表
 * */
import { reactive } from "vue";
import { httpGet } from "@/utils/http";
import { article } from "@/api/operationAPI";

export const getArticleList = () => {
  // 存储数据
  const ArticlList = reactive({});

  // 获取数据
  const getArticl = async () => {
    // 发起ajax请求
    const res = await httpGet(article.GetArticleList);
    // 结构数据
    let { current, size, total, records } = res.data;
    // 判断数据是否获取成功
    if (res.code === 200) {
      console.log(res);
      // 设置数据
      ArticlList["pageNum"] = current;
      ArticlList["pageSize"] = size;
      ArticlList["total"] = total;
      ArticlList["data"] = records;
    }
  };

  return {
    ArticlList,
    getArticl
  };
};
