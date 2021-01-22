<template>
  <!-- 编辑RA题目模态框 -->
  <a-modal
    v-model:visible="editModalVisible.ra"
    title="编辑"
    class="modify-modal"
    @ok="confirmEditRA"
    @cancel="cancelEditRA"
    :maskClosable="false"
  >
    <!-- 编辑RA题目表单 start -->
    <a-form
      :model="editRA.model"
      :rules="editRA.rules"
      ref="editRARef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editRA.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editRA.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="editRA.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
        <!-- 题目标签复选框 end -->
      </a-form-item>
      <a-form-item label="题目音频" name="titleAudio">
        <!-- 上传音频 start -->
        <a-upload
          :action="uploadAudio.url"
          :headers="uploadAudio.headers"
          :file-list="uploadAudioList"
          @change="changeUploadAudio"
        >
          <a-button type="primary">上传音频</a-button>
        </a-upload>
        <!-- 上传音频 end -->
      </a-form-item>
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="editRA.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="editRA.model"
          v-if="editRA.model.titleAudio"
        />
      </a-form-item>

      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editRA.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 编辑RA题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 音频播放器 组件
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 编辑RA题目 功能
import { editRA, useEditRA } from "./useEditRA";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "@/components/Question/SST/AddSST/useAudioSynthetic";

export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 获取要编辑的题目详情
    const questionDetail = inject("speak/questionDetail");

    // 标签列表
    const { labelList } = useGetLabels();

    // 上传音频列表
    const { uploadAudioList } = useUploadAudioList();

    // 编辑RA题目
    const {
      editRA,
      editRARef,
      changeLabels,
      confirmEditRA,
      cancelEditRA
    } = useEditRA(
      editModalVisible,
      getQuestion,
      questionDetail,
      uploadAudioList
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      editRA,
      uploadAudioList
    );

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      editRA,
      uploadAudioList
    );

    // 返回
    return {
      // 标签列表
      labelList,
      // 上传音频功能
      uploadAudio,
      // 上传音频列表
      uploadAudioList,
      // 改变上传音频
      changeUploadAudio,
      // 音频合成状态
      synthesizing,
      // 音频合成功能
      audioSynthetic,
      // 编辑题目的表单数据和校验规则
      editRA,
      // 编辑题目表单
      editRARef,
      // 改变选择标签时
      changeLabels,
      // 编辑RA题目
      confirmEditRA,
      // 取消编辑RA题目
      cancelEditRA
    };
  },
  components: {
    AudioPlayerZH
  }
};
</script>
