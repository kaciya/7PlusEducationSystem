//#region 添加WFD题型
// 引入响应式API
import { ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加WFD题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} emit setup中触发事件的方法
 */
export function useAddWFD(
  addWFD,
  addModalVisible,
  getQuestion,
  uploadAudioList,
  audioSynthetic
) {
  // 表单ref
  const addWFDRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 添加WFD题目
  const confirmAddWFD = () => {
    // 先校验
    addWFDRef.value
      .validate()
      .then(async () => {
        // 有原文内容且没有上传音频
        if (
          addWFD.model.answer.trim().length > 0 &&
          addWFD.model.titleAudio.length == 0
        ) {
          // 自动将原文转音频
          await audioSynthetic();
        }
        // 发送添加题目请求
        httpPost(listen.AddQuestion("wfd"), addWFD.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭wfd模态框
              addModalVisible.wfd = false;
              // 重置表单
              addWFDRef.value.resetFields();
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

  // 取消添加wfd题目
  const cancelAddWFD = () => {
    // 提示用户
    message.warn("取消添加wfd题目");
    // 重置表单
    addWFDRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    addWFD,
    addWFDRef,
    changeLabels,
    confirmAddWFD,
    cancelAddWFD
  };
}
//#endregion
