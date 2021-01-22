//#region 添加RA题型
// 引入响应式API
import { ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入口语题库接口配置
import { speak } from "@/api/questionSpeakAPI";

/**
 * 导出添加RA题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} emit setup中触发事件的方法
 */
export function useAddRA(
  addRA,
  addModalVisible,
  getQuestion,
  uploadAudioList,
  audioSynthetic
) {
  // 表单ref
  const addRARef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 添加RA题目
  const confirmAddRA = () => {
    // 先校验
    addRARef.value
      .validate()
      .then(async () => {
        // 有原文内容且没有上传音频
        if (
          addRA.model.titleText.trim().length > 0 &&
          addRA.model.titleAudio.length == 0
        ) {
          // 自动将原文转音频
          await audioSynthetic();
        }
        // 发送添加题目请求
        httpPost(speak.AddQuestion("ra"), addRA.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭ra模态框
              addModalVisible.ra = false;
              // 重置表单
              addRARef.value.resetFields();
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

  // 取消添加ra题目
  const cancelAddRA = () => {
    // 提示用户
    message.warn("取消添加ra题目");
    // 重置表单
    addRARef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    addRA,
    addRARef,
    changeLabels,
    confirmAddRA,
    cancelAddRA
  };
}
//#endregion
