import { onMounted, reactive } from "vue";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";

export const useGetArticle = id => {
  const publisher = reactive({
    avatar: "", // 用户头像图片地址
    userName: "", // 用户名
    createTime: "", // 创建时间
    ip: "", // ip地址
    category: "", // 文章分类
    favouriteCount: "", // 文章收藏数量
    readCount: "", // 文章阅读数量
    content: "", // 文章内容
    commentCount: "", // 文章评论数量
    originalUserName: "" // 原始评论用户名
  });

  // 获取文章详情
  const getArticleDetails = () => {
    httpGet(topic.GetArticle + "/" + id)
      .then(res => {
        let { data } = res;
        publisher.avatar = data.avatar;
        publisher.userName = data.userName;
        publisher.createTime = data.createTime;
        publisher.ip = data.ip;
        publisher.category = data.category;
        publisher.favouriteCount = data.favoriteCount;
        publisher.readCount = data.readCount;
        publisher.content = data.content;
        publisher.commentCount = data.commentCount;
        publisher.originalUserName = data.originalUserName;
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  onMounted(() => {
    getArticleDetails();
  });

  return {
    getArticleDetails,
    publisher
  };
};
