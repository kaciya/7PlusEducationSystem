//#region 查看FIBW题型
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetFIBW(getModalVisible, questionDetail) {
  // 查看FIBW题目
  const getFIBW = ref({});
  // 监听获取的题目详情
  watch(questionDetail, val => {
    console.log(val);
    if (getModalVisible.fibw) {
      getFIBW.value = val;
    }
  });
  return {
    getFIBW
  };
}
//#endregion
