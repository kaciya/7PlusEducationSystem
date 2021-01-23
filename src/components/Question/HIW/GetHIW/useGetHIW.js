//#region 查看hiw题目详情
// 引入vueAPI
import { ref, watch } from "vue";
export function useGetHIW(questionDetail, getModalVisible) {
  // hiw题目详情
  const getHIW = ref({});

  // 监听获取的题目详情
  watch(questionDetail, val => {
    // 获取hiw题目时赋值给getHIW
    if (getModalVisible.hiw) {
      getHIW.value = val;
      let arr = getHIW.value.titleQuestion.split(" ");
      // 以红色字体展示错误文本
      getHIW.value.titleText.forEach(titleText => {
        arr.forEach((val, index) => {
          if (val == titleText.answer) {
            arr[index] = `<span style="color: red">${titleText.text}</span>`;
          }
        });
      });
      getHIW.value.titleQuestion = arr.join(" ");
      // 处理答案
      if (getHIW.value.answer) {
        getHIW.value.answer = getHIW.value.answer.join(", ");
      }
    }
  });

  // 音频播放器ref
  const audioPlayerRef = ref(null);

  return {
    getHIW,
    audioPlayerRef
  };
}
//#endregion
