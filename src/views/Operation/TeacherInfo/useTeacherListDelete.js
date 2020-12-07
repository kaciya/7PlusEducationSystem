/**
 * @author Lemon
 * 删除教师
 * */

// 引入小图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 引入虚拟DOM
import { createVNode } from "vue";
// 引入模态框
import { Modal, message } from "ant-design-vue";
// 引入http
import { httpDelete } from "@/utils/http";
// 引入api
import { teacherInfo } from "@/api/operationAPI";

// 删除教师方法
export const DeleteTeacher = (id, callback) => {
  // 模态框
  Modal.confirm({
    title: "您真的要删除吗?",
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode("div", { style: "color:red;" }, "这将会永久删除"),
    onOk() {
      // 发送请求
      httpDelete(teacherInfo.DeleteTeacherList + `/${id}`)
        .then(res => {
          // 判断是否删除成功
          if (res.code === 200) {
            // 提示信息
            message.success(res.message);
            // 执行回调
            callback();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    onCancel() {
      console.log("Cancel");
    },
    class: "test"
  });
};
