<template>
  <!-- 上传音频按钮 start -->
  <a-upload
    :show-upload-list="false"
    :action="uploadAudio.url"
    :headers="uploadAudio.headers"
    :file-list="uploadAudioList"
    @change="changeUploadAudio"
  >
    <a-button type="primary" size="small" style="margin-left: 10px"
      >上传音频</a-button
    >
  </a-upload>
  <!-- 上传音频按钮 end -->
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 导入上传音频功能
import { useUploadAudio } from "./useUploadAudio";

export default {
  props: ["id"],
  setup(props) {
    // 获取题目id
    const { id } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 上传音频功能
    const { uploadAudio, uploadAudioList, changeUploadAudio } = useUploadAudio(
      id,
      getQuestion
    );

    // 返回
    return {
      uploadAudio,
      uploadAudioList,
      changeUploadAudio,
    };
  },
};
</script>

<style>
</style>