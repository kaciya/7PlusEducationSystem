//#region 添加音频片段
import { message } from "ant-design-vue";

export function useAddAudioClip(fData, initAudioClip) {
  //#region 添加音频片段 功能
  const addAudioClip = () => {
    // 获取片段数量
    const fNum = fData.source.length;
    if (fNum == 5) {
      return message.warn("片段最多添加5段");
    } else {
      // 标记待添加片段num
      const aFNum = fNum + 1;
      // 待添加片段id
      const fId = `f${aFNum}`;
      // 获取片段 [主题]
      const fTheme = fData.fragments[fId];
      // 定义列表数据
      const fSource = {
        index: fNum,
        id: fId,
        color: fTheme.color,
        fileName: fTheme.name,
        extractTime: 0, //提取时长
        startTime: 0,
        endTime: 0,
        extractTimeText: "00:00:00", //提取时长-文本
        startTimeText: "00:00:00",
        endTimeText: "00:00:00"
      };
      // 定义片段数据
      const fAudio = {
        index: fNum,
        id: fId,
        color: fTheme.color,
        bLeft: `${aFNum * 10}%`,
        eLeft: `${aFNum * 10 + 5}%`,
        fWidth: "5%"
      };
      // 添加数据
      fData.source.push(fSource);
      fData.fAudio.push(fAudio);

      // 防止数据尚未更新出错
      setTimeout(() => {
        // 初始化片段
        initAudioClip(fNum);
      });
    }
  };
  //#endregion

  return { addAudioClip };
}
//#endregion
