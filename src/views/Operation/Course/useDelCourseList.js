/**
 * @author Lemon
 *
 * */
import { message } from "ant-design-vue";
// 引入http库
import { httpDelete } from "@/utils/http";
// 引入api
import { course } from "@/api/operationAPI";

export const useDelCourseList = getCourse => {
  // 删除数据方法
  const deleteCourseSubmit = async id => {
    let res = await httpDelete(course.DelCourseList + `/${id}`);
    if (res.code === 200) {
      message.success(res.message);
      getCourse();
    }
  };

  // 点击取消的回调函数
  const delCancel = () => {
    message.info("用户取消操作");
  };

  return {
    deleteCourseSubmit,
    delCancel
  };
};
