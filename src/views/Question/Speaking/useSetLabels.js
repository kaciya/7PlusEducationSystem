//#region 设置题目标签
// 引入 httpPost请求
import { httpPost } from "@/utils/http";
// 引入 听力sst题配置接口
import { listen } from '@/api/questionListenAPI';
import { message } from "ant-design-vue";
// 导出
export function useSetLabels() {
  // 设置题目标签
  /**
   * 
   * @param {*} id 题目id
   * @param {*} category 分类
   * @param {*} checkedLabels 选中的题目
   * @param {*} allLabels 所有题目
   */
  const setLabels = (id, category, checkedLabels, allLabels) => {
    // 限制用户只能选择最多三个标签
    if (checkedLabels.length >= 4) {
      message.warn('每题最多可选三个标签');
      return checkedLabels.pop();
    };
    // 找出所选标签的ids
    let checkedIds = [];
    checkedLabels.forEach(ele => {
      // 如果 标签列表中的标签名 与 所选标签名一致，记录索引
      checkedIds.push(allLabels.findIndex((value) => value.name == ele).toString());
    });
    // 发起请求设置标签
    // httpPost(listen.SetLabels(category), {
    //   // 题目id
    //   id,
    //   // 选择的标签
    //   labelsId: checkedIds
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });
    console.log(httpPost, listen.SetLabels(category));
  }

  return {
    setLabels
  }
}
//#endregion