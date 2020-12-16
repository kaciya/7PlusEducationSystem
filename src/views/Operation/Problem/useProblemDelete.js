/**
 * @author Lemon
 * 删除问题
 * */
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { message, Modal } from "ant-design-vue";
import { httpDelete } from "@/utils/http";
import { problem } from "@/api/operationAPI";

export const problemDelete = getProblem => {
  // 创建模态框
  const showDeleteConfirm = id => {
    // 获取问题id
    let problemId = id;

    Modal.confirm({
      title: "您真的要删除该数据么?",
      icon: createVNode(ExclamationCircleOutlined),
      content: "这将会永久删除",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        // 发送请求
        httpDelete(problem.DeleteProblemList + `/${problemId}`)
          .then(res => {
            if (res.code === 200) {
              message.success(res.message);
              // 重新获取数据
              getProblem();
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      onCancel() {
        message.info("用户取消了操作");
      }
    });
  };

  return {
    showDeleteConfirm
  };
};
