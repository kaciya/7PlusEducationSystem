//#region 上传音频列表
import { ref } from "vue";
// 导出
export function useUploadAudioList() {
  // 上传音频
  const uploadAudioList = ref([]);

  return {
    uploadAudioList
  };
}
//#endregion
