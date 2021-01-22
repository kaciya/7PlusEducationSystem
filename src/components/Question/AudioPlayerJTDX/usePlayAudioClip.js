//#region 播放音频片段
export function usePlayAudioClip(pauseAudioAll) {
  /**
   * 播放音频片段 功能
   * @param {*} r 指定片段对应数据
   */
  const playAudioClip = r => {
    // console.log(r);
    // 暂停所有音频
    pauseAudioAll();

    //#region 播放指定音频片段
    const fAudio = document.querySelector(`.fragment-item.${r.id} .f-audio`);
    // 设置播放起始位置
    fAudio.currentTime = r.startTime;

    // 监听音频播放位置更改
    fAudio.ontimeupdate = () => {
      // 设置播放终止位置
      if (fAudio.currentTime >= r.endTime) {
        fAudio.pause();
      }
    };

    // 开启播放
    fAudio.play();
    //#endregion
  };

  return { playAudioClip };
}

//#endregion
