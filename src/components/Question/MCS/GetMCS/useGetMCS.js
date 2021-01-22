//#region 查看mcs题目详情
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetMCS(questionDetail, getModalVisible, questionType) {
  // mcs题目详情
  const getMCS = ref({});

  // 监听获取的题目详情
  watch(questionDetail, val => {
    // 获取mcs题目时赋值给getMCS
    if (getModalVisible[questionType]) {
      getMCS.value = val;
    }
  });

  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    getMCS,
    audioPlayerRef
  };
}
//#endregion
