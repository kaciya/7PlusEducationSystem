//#region 删除音频片段
export function useDelAudioClip(fData) {
  /**
   * 删除音频片段 功能
   * @param {*} r 指定片段对应数据
   */
  const delAudioClip = r => {
    // 获取当前片段索引
    const index = r.index;
    // 移除音频片段数据
    fData.source.splice(index, 1);
    fData.fAudio.splice(index, 1);

    //#region 更新音频片段数据
    fData.source.forEach((item, i) => {
      const fId = `f${i + 1}`;
      const fTheme = fData.fragments[fId];
      item.index = i;
      item.id = fId;
      item.color = fTheme.color;
      item.fileName = fTheme.name;
    });
    fData.fAudio.forEach((item, i) => {
      const fId = `f${i + 1}`;
      const fTheme = fData.fragments[fId];
      item.index = i;
      item.id = fId;
      item.color = fTheme.color;
    });
    //#endregion
  };

  return { delAudioClip };
}
//#endregion
