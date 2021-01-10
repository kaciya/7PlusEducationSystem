//#region 添加RL题型
// 引入响应式API
import { ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入口语题库接口配置
import { speak } from '@/api/questionSpeakAPI';

/**
 * 导出添加RL题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddRL(addRL, addModalVisible, getQuestion, uploadAudioList, audioSynthetic) {
  // 表单ref
  const addRLRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 添加RL题目
  const confirmAddRL = () => {
    // 先校验
    addRLRef.value.validate().then(async () => {
      // 有原文内容且没有上传音频
      if (addRL.model.titleText.trim().length > 0 && addRL.model.titleAudio.length == 0) {
        // 自动将原文转音频
        await audioSynthetic();
      }
      // 发送添加题目请求
      httpPost(speak.AddQuestion('rl'), addRL.model).then((res) => {
        if (res.success == true) {
          // 提示用户添加成功
          message.success("添加题目成功");
          // 刷新页面
          getQuestion()
          // 关闭RL模态框
          addModalVisible.rl = false;
          // 重置表单
          addRLRef.value.resetFields();
          // 清除音频上传列表
          uploadAudioList.value = []
        }
        else {
          // 添加失败，提示用户失败原因
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  };

  // 取消添加RL题目
  const cancelAddRL = () => {
    // 提示用户
    message.warn("取消添加rl题目");
    // 重置表单
    addRLRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = []
  };

  return {
    addRL,
    addRLRef,
    changeLabels,
    confirmAddRL,
    cancelAddRL
  };
}
//#endregion
