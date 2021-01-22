//#region 音频合成功能
import { ref } from "vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入 音频合成 接口配置
import questionAPI from "@/api/questionAPI";
import { message } from "ant-design-vue";
/**
 * 音频合成功能
 * @param {*} addFIB 添加FIB题目的表单数据
 * @param {*} uploadAudioList 上传音频列表
 */
export function useAudioSynthetic(addFIB, uploadAudioList) {
  // 音频合成状态
  const synthesizing = ref(false);

  // 音频合成
  const audioSynthetic = () => {
    return new Promise(resolve => {
      // 获取全部题目原文
      let titleText = "";
      addFIB.model.titleText.forEach(ele => {
        titleText += ele.text.trim() + " " + ele.answer.trim() + " ";
      });
      // 判断题目文本是否有内容
      if (titleText.trim().length != 0) {
        // 有内容
        synthesizing.value = true;
        // 发起合成音频的请求
        httpPost(questionAPI.AudioSynthetic, {
          // 题目文本
          text: titleText
        })
          .then(res => {
            if (res.success) {
              synthesizing.value = false;
              // 提示用户转换音频成功
              message.success("转换音频成功, 此音频将为题目音频");
              // 保存题目音频
              addFIB.model.titleAudio = res.data.fileUrl;
              resolve();
              // 清空上传音频列表
              uploadAudioList.value = [];
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // 提示用户输入题目原文内容才可以转换音频
        message.error("请您输入题目原文");
      }
    });
  };

  return {
    synthesizing,
    audioSynthetic
  };
}
//#endregion
