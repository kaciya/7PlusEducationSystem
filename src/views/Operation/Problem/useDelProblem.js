/**
 * @author Lemon
 * 删除问题
 * */
import { message } from "ant-design-vue";
import { httpDelete } from "@/utils/http";
import { problem } from "@/api/operationAPI";

export const useDelProblem = getProblem => {
  const delSubmit = problemId => {
    // 发送请求
    httpDelete(problem.DelProblemList + `/${problemId}`)
      .then(res => {
        if (res.code === 200) {
          message.success(res.message);
          // 重新获取数据
          getProblem();
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
