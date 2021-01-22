//#region 查看sst题目详情
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetSST(questionDetail, getModalVisible) {
  // sst题目详情
  const getSST = ref({});

  // 监听获取的题目详情
  watch(questionDetail, val => {
    // 获取sst题目时赋值给getSST
    if (getModalVisible.sst) {
      console.log(val);
      getSST.value = val;
    }
  });
  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    getSST,
    audioPlayerRef
  };
}
//#endregion
