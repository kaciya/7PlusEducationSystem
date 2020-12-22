// 导入接口
import notice from "@/api/noticeAPI";
// 引入提示方法
import { message } from "ant-design-vue";
// 导入请求方法
import { httpDelete } from "@/utils/http";
export const useDelNotice = getNoticeData => {
  const delOneNotice = noticeId => {
    httpDelete(notice.DelOneNotice + "/" + noticeId)
      .then(res => {
        let { success } = res;
        if (success) {
          message.success("删除成功");
          // 重新渲染数据
          getNoticeData();
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  // 取消删除
  const cancelDel = () => {
    message.warning("已取消");
  };
  return {
    delOneNotice,
    cancelDel
  };
};
