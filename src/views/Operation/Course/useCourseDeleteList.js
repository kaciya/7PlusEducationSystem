/**
 * @author Lemon
 *
 * */
// 引入虚拟DOM
import { createVNode } from 'vue';
// 引入小图标
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message, Modal } from "ant-design-vue";
// 引入http库
import { httpDelete } from "../../../utils/http";
// 引入api
import { course } from "../../../api/operationAPI";

export const deleteCourse = (getCourse) => {

  // 删除数据方法
  const deleteCourseSubmit = async (id) => {
    let res = await httpDelete(course.deleteCourseList + `/${id}`);
    if (res.code === 200) {
      message.success(res.message);
      getCourse();
    }
  }

  // 弹出模态框
  const showDelete = (id,callback) => {
    Modal.confirm({
      title: '您真的要删除吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '这将会永久删除该数据',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteCourseSubmit(id,callback);
      },
      onCancel() {
        message.info("用户取消了操作");
      },
    });
  }

  return {
    showDelete
  }
}
