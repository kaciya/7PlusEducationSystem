//#region 音频播放速度控制

export function usePlaybackSpeed(dom) {
  // 播放速度调节
  const speedChange = value => {
    // console.log(value); //要切换的播放速度
    // 设置当前播放速度
    dom.audio.value.playbackRate = parseFloat(value);
  };

  return {
    // 播放速度调节
    speedChange
  };
}
//#endregion
