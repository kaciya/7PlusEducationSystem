//#region 查看RO题型
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetRO(getModalVisible, questionDetail) {
  // mcs题目详情
  const getRO = ref({});
  // 监听获取的题目详情
  watch(questionDetail, val => {
    // console.log(val);
    // 获取mcs题目时赋值给getMCS
    if (getModalVisible.ro) {
      getRO.value = val;
    }
  });
  return {
    getRO
  };
}
//#endregion
