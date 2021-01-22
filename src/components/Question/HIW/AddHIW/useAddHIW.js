//#region 添加HIW题型
// 引入响应式API
import { computed, ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加HIW题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} emit setup中触发事件的方法
 */
export function useAddHIW(
  addHIW,
  addModalVisible,
  getQuestion,
  uploadAudioList,
  audioSynthetic
) {
  // 表单ref
  const addHIWRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 题目原文及答案
  const allTitleText = computed(() =>
    addHIW.model.titleQuestion.split(" ").map(val => ({
      text: "",
      answer: val
    }))
  );

  // 添加HIW题目
  const confirmAddHIW = () => {
    // 先校验
    addHIWRef.value
      .validate()
      .then(async () => {
        // 有原文内容且没有上传音频
        if (
          addHIW.model.titleQuestion.trim().length > 0 &&
          addHIW.model.titleAudio.length == 0
        ) {
          // 自动将原文转音频
          await audioSynthetic();
        }
        // 整理表单 titleText字段，题目原文及对应错误展示信息
        addHIW.model.titleText = allTitleText.value.filter(val => val.text);
        // 发送添加题目请求
        httpPost(listen.AddQuestion("hiw"), addHIW.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭hiw模态框
              addModalVisible.hiw = false;
              // 重置表单
              addHIWRef.value.resetFields();
              // 清除音频上传列表
              uploadAudioList.value = [];
            } else {
              // 添加失败，提示用户失败原因
              message.error(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 取消添加hiw题目
  const cancelAddHIW = () => {
    // 提示用户
    message.warn("取消添加hiw题目");
    // 重置表单
    addHIWRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    addHIWRef,
    allTitleText,
    changeLabels,
    confirmAddHIW,
    cancelAddHIW
  };
}
//#endregion
