//#region 设置错误展示
import { ref } from "vue";
export function useSetWrong() {
  // 设置错误展示模态框的显示与隐藏
  const setWrongVisible = ref(false);

  // 正在设置的原文单词
  const settingText = ref({
    answer: "",
    text: ""
  });

  // 记录原本的设置
  const settingRecord = ref("");

  // 打开模态框
  const showSetModal = text => {
    setWrongVisible.value = true;
    // 将模态框中的原文单词对象指向被点击的原文单词对象
    settingText.value = text;
    // 记录原本的设置，方便用户点击取消时恢复
    settingRecord.value = text.text;
  };

  // 取消设置错误示例
  const cancelSetWrong = () => {
    // 恢复原设置
    settingText.value.text = settingRecord.value;
    // 关闭模态框
    setWrongVisible.value = false;
  };

  // 确认设置
  const confirmSetWrong = () => {
    // 关闭模态框
    setWrongVisible.value = false;
  };

  // 移除错误示例
  const removeSetWrong = () => {
    // 移除错误示例
    settingText.value.text = "";
    // 关闭模态框
    setWrongVisible.value = false;
  };

  return {
    setWrongVisible,
    showSetModal,
    settingText,
    cancelSetWrong,
    confirmSetWrong,
    removeSetWrong
  };
}
//#endregion
