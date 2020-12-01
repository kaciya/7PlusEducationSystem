//#region 选择题目分类
// 引入响应式API
import { ref } from "vue";

export function useGetQuestion() {
  // 当前题目分类
  const category = ref('SST');

  // 当前题目标签筛选（默认空字符串为全部）
  const labelId = ref('');

  return {
    category,
    labelId
  }
}
//#endregion