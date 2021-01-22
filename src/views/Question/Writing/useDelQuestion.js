//#region 删除题目
// 导入 delete 请求
import { httpDelete } from "@/utils/http";

// 导入接口配置文件
import question from "@/api/questionAPI";

// 引入 提示框
import { message } from "ant-design-vue";

export function useDelQuestion(getQuestion) {
  // 删除题目方法
  const delQuestion = id => {
    // console.log(id);
    // 发起删除请求
    httpDelete(question.DelQuestion + "/" + id)
      .then(res => {
        // console.log(res);
        if (res.success) {
          // 提示用户
          message.success("删除题目成功");
          // 刷新页面
          getQuestion();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 取消删除题目方法
  const cancelDelQuestion = () => {
    message.warn("已取消删除题目");
  };
  return {
    delQuestion,
    cancelDelQuestion
  };
}
//#endregion
