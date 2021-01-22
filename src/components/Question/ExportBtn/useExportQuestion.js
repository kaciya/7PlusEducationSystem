//#region 导出题目功能
// 引入axios请求
import axios from "axios";
// 导入接口配置
import questionAPI from "@/api/questionAPI";
// 引入提示框
import { message } from "ant-design-vue";

/**
 * 导出题目功能
 * @param {*} questionType 题目类型 1:听,2:说,3:读,4:写
 */
export function useExportQuestion(questionType) {
  /**
   * 导出题目
   * @param {*} category 题型分类
   */
  const exportQuestion = category => {
    axios({
      method: "get",
      url: "/api" + questionAPI.ExportQuestion,
      params: {
        category,
        type: questionType
      },
      headers: {
        Token: window.localStorage.getItem("token")
      },
      // 二级制流文件，一定要设置成blob
      responseType: "blob"
    })
      .then(res => {
        if (res.status == 200) {
          //创建应该a标签
          const link = document.createElement("a");
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          // 隐藏a标签
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          // 设置文件名
          link.setAttribute("download", `${category.toUpperCase()}题目.xlsx`);
          // 添加a标签
          document.body.appendChild(link);
          // 点击
          link.click();
          // 删除a标签
          document.body.removeChild(link);
        } else {
          message.error("导出失败");
        }
      })
      .catch(err => {
        if (err.response.status == 403) {
          message.error("没有访问权限");
        }
      });
  };

  return { exportQuestion };
}
//#endregion
