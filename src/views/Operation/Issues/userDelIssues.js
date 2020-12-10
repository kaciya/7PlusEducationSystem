// 引入请求方式
import { httpDelete } from "@/utils/http";
// 引入请求接口
import Issue from "@/api/IssuesAPI";
// 图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 确认框
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const DelIssues = getIssuesData => {
  const removeIssues = id => {
    // 确认框
    Modal.confirm({
      // 提示文字
      content: "你确定要删除吗",
      // 图标
      icon: createVNode(ExclamationCircleOutlined),
      // 点击确认回调
      onOk() {
        // 发送请求删除数据
        httpDelete(Issue.DelIssues + id)
          .then(res => {
            // 判断请求是否成功
            if (res.code == 200) {
              // 更新数据
              getIssuesData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  return {
    removeIssues
  };
};
