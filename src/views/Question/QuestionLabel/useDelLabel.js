//#region 删除标签
// 引入post请求
import { httpDelete } from "@/utils/http";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";
import { message } from "ant-design-vue";

export function useDelLabel(getLabels) {
  /**
   * 删除标签方法
   * @param {*} id 要删除的id
   */
  const delLabel = id => {
    // 发起删除请求
    httpDelete(questionLabel.DelLabel + "/" + id).then(res => {
      if (res.success == true) {
        // 提示用户删除标签成功
        message.success("删除成功");
        // 刷新标签
        getLabels();
      }
    });
  };

  return {
    delLabel
  };
}
//#endregion
