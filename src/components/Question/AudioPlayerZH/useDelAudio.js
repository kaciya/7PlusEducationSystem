//#region 音频播放器移除
// 引入全局提示
import { message } from "ant-design-vue";
export function useDelAudio(audioModel) {
  // 移除音频 功能
  const delAudio = () => {
    if (audioModel.titleAudio) {
      audioModel.titleAudio = "";
      message.success("音频删除成功");
    }
  };

  return {
    delAudio
  };
}

//#endregion
