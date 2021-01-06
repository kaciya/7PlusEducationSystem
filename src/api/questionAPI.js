// 题库基础接口配置
export default {
  // 获取题目列表
  GetQuestion: "/question/page",
  // 删除题目
  DelQuestion: "/question",
  // 上传音频
  UploadAudio: "/oss/upload",
  // 上传音频至题目
  UploadAudioUrl: "/question/upload/audio",
  // 导出题目
  ExportQuestion: "/question/export",
  // 语音合成
  AudioSynthetic: "/question/audio/synthetic",
  // 修改标签
  EditLabels: "/question/updateLabel"
};
