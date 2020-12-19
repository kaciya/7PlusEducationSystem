import { reactive } from "vue";
export const useCommentPaging = (getComment, pageNum) => {
  // 可改变的pageSize
  const pageSizeOptions = reactive(["10"]);

  // 点击分页
  const commentPaging = page => {
    pageNum.value = page;
    // 重新渲染
    getComment();
  };
  return {
    pageSizeOptions,
    commentPaging
  };
};
