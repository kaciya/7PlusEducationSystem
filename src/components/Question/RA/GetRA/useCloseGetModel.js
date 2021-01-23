//#region 关闭查看模态框
export function useCloseGetModel(audioPlayerRef) {
  // 关闭查看模态框 方法
  const closeModal = () => {
    // console.log(audioPlayerRef.value);
    // 调用播放组件方法 还原音频播放 ⚡️延时提高体验
    if (audioPlayerRef.value)
      setTimeout(() => {
        audioPlayerRef.value.audioEnded(true);
      }, 100);
  };

  return {
    closeModal
  };
}
//#endregion
