/**
 * @author Lemon
 * 删除教师
 * */

// 引入模态框
import { message } from "ant-design-vue";
// 引入http
import { httpDelete } from "@/utils/http";
// 引入api
import { teacherInfo } from "@/api/operationAPI";

// 删除教师方法
export const useDelTeacherList = getTacherList => {
  // 删除方法
  const delSubmit = id => {
    // 发送请求
    httpDelete(teacherInfo.DelTeacherList + `/${id}`)
      .then(res => {
        // 判断是否删除成功
        if (res.code === 200) {
          // 提示信息
          message.success(res.message);
          // 重新获数据
          getTacherList();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const delCancel = () => {
    message.info("用户取消操作");
  };

  return {
    delSubmit,
    delCancel
  };
};
