//#region 查看SWT题型
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetSWT(getModalVisible, questionType, getDetail) {
  const getSWT = ref({});
  // 监听获取的题目详情
  watch(getDetail, val => {
    if (getModalVisible[questionType]) {
      getSWT.value = val;
    }
  });
  return {
    getSWT
  };
}
//#endregion
