import { Upload } from "ant-design-vue";

//#region 上传音频功能
export function useUploadAudio() {
  /**
   * 上传音频
   * @param {*} id 题目id
   * @param {*} audioUrl 音频路径
   */
  const uploadAudio = (id, audioUrl) => {
    console.log(id, audioUrl);
  }

  return {
    uploadAudio
  }
}
//#endregion