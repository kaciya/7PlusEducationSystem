//#region 查看fib题目详情
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetFIB(questionDetail, getModalVisible) {
  // fib题目详情
  const getFIB = ref({});

  // 监听获取的题目详情
  watch(questionDetail, val => {
    // 获取fib题目时赋值给getFIB
    if (getModalVisible.fib) {
      getFIB.value = val;
    }
  });

  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    getFIB,
    audioPlayerRef
  };
}
//#endregion
