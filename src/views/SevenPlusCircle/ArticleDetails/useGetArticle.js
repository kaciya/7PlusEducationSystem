import { onMounted, ref } from "vue";
// 导入get请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";

export const useGetArticle = id => {
  // 用户头像图片地址
  const publisherAvatar = ref("");
  // 用户名
  const publisherUserName = ref("");
  // 创建时间
  const publisherCreateTime = ref("");
  // ip地址
  const publisherIp = ref("");
  // 文章分类
  const publisherCategory = ref("");
  // 文章收藏数量
  const publisherFavoriteCount = ref("");
  // 文章阅读数量
  const publisherReadCount = ref("");
  // 文章内容
  const publisherContent = ref("");
  // 文章评论数量
  const publisherCommentCount = ref("");
  // 获取文章详情
  const getArticle = () => {
    httpGet(topic.getArticle + "/" + id)
      .then(res => {
        let { data } = res;
        if (!data.avatar) {
          data.avatar =
            "https://axure-file.lanhuapp.com/722bc281-5269-4069-b62e-36a9c6d9ac14__91b179a0b2490fafbecb391f4ae79eba.png";
        }
        publisherAvatar.value = data.avatar;
        publisherUserName.value = data.userName;
        publisherCreateTime.value = data.createTime;
        publisherIp.value = data.ip;
        publisherCategory.value = data.category;
        publisherFavoriteCount.value = data.favoriteCount;
        publisherReadCount.value = data.readCount;
        publisherContent.value = data.content;
        publisherCommentCount.value = data.commentCount;
      })
      .catch(err => {
        console.log(err);
      });
  };
  onMounted(() => {
    getArticle();
  });
  return {
    getArticle,
    publisherAvatar,
    publisherUserName,
    publisherCreateTime,
    publisherIp,
    publisherCategory,
    publisherFavoriteCount,
    publisherReadCount,
    publisherContent,
    publisherCommentCount
  };
};
