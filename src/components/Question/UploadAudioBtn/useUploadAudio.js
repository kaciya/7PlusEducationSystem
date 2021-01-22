//#region 上传音频
// 引入响应式API
import { reactive, ref } from "vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 引入上传音频接口配置
import questionAPI from "@/api/questionAPI";
// 引入提示框
import { message } from "ant-design-vue";

/**
 * 上传音频
 * @param {*} id 题目id
 * @param {*} getQuestion 刷新题目列表
 */
export function useUploadAudio(id, getQuestion) {
  // 上传音频
  const uploadAudio = reactive({
    // 地址
    url: "/api" + questionAPI.UploadAudio,
    // 请求头
    headers: { Token: window.localStorage.getItem("token") }
  });

  // 上传音频
  const uploadAudioList = ref([]);

  // 切换上传音频
  const changeUploadAudio = info => {
    let fileList = [...info.fileList];
    // 限制上传音频数量为 1
    fileList = fileList.slice(-1);
    uploadAudioList.value = fileList;
    // 上传音频完成且成功
    if (info.file.status == "done" && info.file.response.success) {
      // 保存音频路径
      const audioUrl = info.file.response.data.fileUrl;
      // 将音频路径上传给对应题目
      httpPost(questionAPI.UploadAudioUrl, {
        // 题目id
        id,
        // 音频路径
        audioUrl
      })
        .then(res => {
          if (res.success) {
            // 提示用户
            message.success("音频上传成功");
            // 刷新题目列表
            getQuestion();
          } else {
            message.error(res.message);
          }
        })
        .catch(err => {
          throw err;
        });
    }
  };

  // 导出
  return {
    uploadAudio,
    uploadAudioList,
    changeUploadAudio
  };
}
//#endregion
