//#region 查看wfd题目详情
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetWFD(questionDetail, getModalVisible) {
  // wfd题目详情
  const getWFD = ref({});

  // 监听获取的题目详情
  watch(questionDetail, val => {
    // 获取wfd题目时赋值给getWFD
    if (getModalVisible.wfd) {
      getWFD.value = val;
    }
  });

  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    getWFD,
    audioPlayerRef
  };
}
//#endregion
