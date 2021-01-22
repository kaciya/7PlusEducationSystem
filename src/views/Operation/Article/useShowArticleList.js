/**
 * @author Lemon
 * 查看文章
 * */
import { ref } from "vue";

export const useShowArticleList = () => {
  // 查看文章模态框状态
  const articleModalVisible = ref(false);
  // 获取文章内容
  const articlContent = ref({});
  // 显示查看文章模态框状态
  const showArticleModal = record => {
    articleModalVisible.value = true;
    articlContent.value = record;
  };
  // 点击确定的回调
  const addOk = () => {
    articleModalVisible.value = false;
  };

  return {
    // 查看文章模态框状态
    articleModalVisible,
    // 显示查看文章模态框状态
    showArticleModal,
    // 获取文章内容
    articlContent,
    // 点击确定的回调
    addOk
  };
};
