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
        if (res.code == 200) {
          message.success("删除成功");
          getNoticeData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cancelDel = () => {
    message.warning("已取消");
  };
  return {
    delOneNotice,
    cancelDel
  };
};
