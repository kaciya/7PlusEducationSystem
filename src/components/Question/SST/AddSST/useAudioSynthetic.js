//#region 音频合成功能
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入 音频合成 接口配置
import questionAPI from '@/api/questionAPI';
import { message } from "ant-design-vue";

/**
 * 音频合成功能
 * @param {*} addSST 添加SST题目的表单数据
 * @param {*} uploadAudioList 上传音频列表
 */
export function useAudioSynthetic(addSST, uploadAudioList) {
  // 音频合成
  const audioSynthetic = () => {
    // 判断题目文本是否有内容
    if (addSST.model.titleText.trim().length != 0) {
      // 有内容
      // 发起合成音频的请求
      httpPost(questionAPI.AudioSynthetic, {
        // 题目文本
        text: addSST.model.titleText
      }).then((res) => {
        if (res.success) {
          // 提示用户转换音频成功
          message.success("转换音频成功, 此音频将为题目音频");
          // 保存题目音频
          addSST.model.titleAudio = res.data.fileUrl;
          // 清空上传音频列表
          uploadAudioList.value = []
        }
        else {
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    else {
      // 提示用户输入题目原文内容才可以转换音频
      message.error("请您输入题目原文")
    }
  }

  return {
    audioSynthetic
  }
}
//#endregion