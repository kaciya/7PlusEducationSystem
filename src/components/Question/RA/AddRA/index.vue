<template>
  <!-- 添加RA题目模态框 -->
  <a-modal
    v-model:visible="addModalVisible.ra"
    title="添加"
    class="add-modal"
    :maskClosable="false"
    @ok="confirmAddRA"
    @cancel="cancelAddRA"
  >
    <!-- 添加ra题目表单 start -->
    <a-form
      :model="addRA.model"
      :rules="addRA.rules"
      ref="addRARef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addRA.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addRA.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addRA.model.labelIds"
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
        <a-textarea v-model:value="addRA.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="addRA.model"
          v-if="addRA.model.titleAudio"
        />
      </a-form-item>

      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addRA.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加ra题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
// 引入 添加RA题目表单数据
import { useAddRAForm } from "./useAddRAForm";
// 引入 添加RA题目 功能
import { useAddRA } from "./useAddRA";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "@/components/Question/SST/AddSST/useAudioSynthetic";
// 引入 音频播放器-转化
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";

export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 标签列表
    const { labelList } = useGetLabels();

    // 上传音频列表
    const { uploadAudioList } = useUploadAudioList();

    // 添加RA题目表单数据
    const { addRA } = useAddRAForm();

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addRA,
      uploadAudioList
    );

    // 添加RA题目
    const { addRARef, changeLabels, confirmAddRA, cancelAddRA } = useAddRA(
      addRA,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addRA,
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
      // 添加题目的表单数据和校验规则
      addRA,
      // 添加题目表单
      addRARef,
      // 改变选择标签时
      changeLabels,
      // 添加RA题目
      confirmAddRA,
      // 取消添加RA题目
      cancelAddRA
    };
  },
  components: {
    CheckCircleTwoTone,
    AudioPlayerZH
  }
};
</script>

<style lang="scss" scoped>
#labelIds {
  // 让本模态框中的标签复选框换行时保持对齐
  .ant-checkbox-wrapper:nth-child(6n) {
    margin-left: 0px;
  }
}
</style>
<style lang="scss">
.add-modal,
.modify-modal {
  width: 880px !important;
}
</style>
