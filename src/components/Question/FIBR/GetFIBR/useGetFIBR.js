//#region 查看FIBR题型
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetFIBR(getModalVisible, questionDetail) {
  // FIBR题目详情
  const getFIBR = ref({});
  // 监听获取的题目详情
  watch(questionDetail, val => {
    console.log(val);
    if (getModalVisible.fibr) {
      getFIBR.value = val;
    }
  });
  return {
    getFIBR
  };
}
//#endregion
