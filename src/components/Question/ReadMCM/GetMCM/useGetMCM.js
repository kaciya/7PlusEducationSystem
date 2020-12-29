//#region 查看mcs题目详情
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetMCM(getModalVisible, questionType, questionDetail) {
  // mcs题目详情
  const getMCS = ref({});

  // 监听获取的题目详情
  watch(questionDetail, val => {
    // 获取mcs题目时赋值给getMCS
    if (getModalVisible[questionType]) {
      getMCS.value = val;
    }
  });

  return {
    getMCS
  };
}
//#endregion
