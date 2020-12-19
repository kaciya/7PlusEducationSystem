//#region 设置题目标签
// 引入 全局弹框提示
import { message } from "ant-design-vue";
// 引入 写作接口地址
import { write } from "@/api/questionWriteAPI";
// 引入 httpPost请求
import { httpPost } from "@/utils/http";
// 导出 设置题目标签
/**
 * @param {*} allLabels 所有标签
 */
export function useSetLabels(allLabels) {
  const setLabels = record => {
    // 限制用户只能选择最多三个标签
    if (record.labels.length >= 4) {
      message.warn("每题最多可选三个标签");
      return record.labels.pop();
    }
    // 找出所选标签的ids
    const checkedIds = [];
    record.labels.forEach(ele => {
      allLabels.value.findIndex(item => {
        if (item.name == ele) {
          checkedIds.push(item.id);
        }
      });
    });
    console.log(checkedIds);
    console.log(record);
    // 发起 设置标签 请求
    // httpPost(write.SetLabels(record.category), {
    //   // 题目id
    //   id: record.id,
    //   labelIds: checkedIds
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  return {
    setLabels
  };
}

//#endregion