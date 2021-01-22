//#region 设置题目标签
// 引入 httpPost请求
import { httpPost } from "@/utils/http";
// 引入 听力sst题配置接口
import questionAPI from "@/api/questionAPI";
import { message } from "ant-design-vue";
// 导出
/**
 * 修改标签功能
 * @param {*} labelList 所有标签列表
 * @param {*} getQuestion 刷新题目列表
 */
export function useEditLabels(labelList, getQuestion) {
  // 设置题目标签
  /**
   *
   * @param {*} id 题目id
   * @param {*} checkedLabels 选中的标签
   */
  const editLabels = (id, checkedLabels) => {
    // 限制用户只能选择最多三个标签
    if (checkedLabels.length >= 4) {
      message.warn("每题最多可选三个标签");
      return checkedLabels.pop();
    }
    // 找出所选标签的ids
    const checkedIds = [];
    checkedLabels.forEach(ele => {
      // 如果 标签列表中的标签名 与 所选标签名一致，记录索引
      checkedIds.push(
        labelList.value[labelList.value.findIndex(value => value.name == ele)]
          .id
      );
    });
    // 发起请求设置标签
    httpPost(questionAPI.EditLabels, {
      // 题目id
      id,
      // 选择的标签
      labelIds: checkedIds
    })
      .then(res => {
        if (res.success) {
          // 成功时提示用户
          message.success("修改题目标签成功");
          // 刷新列表
          getQuestion();
        } else {
          message.success(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    editLabels
  };
}
//#endregion
