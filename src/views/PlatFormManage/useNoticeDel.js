// 导入接口
import notice from "@/api/noticeAPI";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
// 导入get请求方法
// import { httpDelete } from "@/utils/http";
export const useNoticeDel = () => {
  const delOneNotice = noticeId => {
    Modal.confirm({
      title: "提示",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将永久删除该用户, 是否继续?",
      okText: "确认",
      cancelText: "取消",
      // 当点击确认按钮的回调
      onOk() {
        console.log(notice.delOneNotice, noticeId);
        // httpDelete(notice.delOneNotice + '/' + noticeId).then(res => {
        //   console.log(res)
        // }).catch(err => {
        //   console.log(err)
        // })
      },
      onCancel() {
        message.warning("已取消删除");
      }
    });
  };
  return {
    delOneNotice
  };
};
