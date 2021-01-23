<template>
  <!-- 添加ASQ题目模态框 -->
  <a-modal
    v-model:visible="addModalVisible.asq"
    title="添加"
    class="add-modal"
    :maskClosable="false"
    @ok="confirmAddASQ"
    @cancel="cancelAddASQ"
  >
    <!-- 添加ASQ题目表单 start -->
    <a-form
      :model="addASQ.model"
      :rules="addASQ.rules"
      ref="addASQRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addASQ.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addASQ.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addASQ.model.labelIds"
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
      <a-form-item label="原文" name="titleText">
        <a-textarea v-model:value="addASQ.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="addASQ.model"
          v-if="addASQ.model.titleAudio"
        />
      </a-form-item>
      <a-form-item label="答案" name="answer">
        <a-textarea v-model:value="addASQ.model.answer" :rows="5" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addASQ.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加ASQ题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
// 引入 添加ASQ题目表单数据
import { useAddASQForm } from "./useAddASQForm";
// 引入 添加ASQ题目 功能
import { useAddASQ } from "./useAddASQ";
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

    // 添加ASQ题目表单数据
    const { addASQ } = useAddASQForm();

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addASQ,
      uploadAudioList
    );

    // 添加ASQ题目
    const { addASQRef, changeLabels, confirmAddASQ, cancelAddASQ } = useAddASQ(
      addASQ,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addASQ,
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
      addASQ,
      // 添加题目表单
      addASQRef,
      // 改变选择标签时
      changeLabels,
      // 添加ASQ题目
      confirmAddASQ,
      // 取消添加ASQ题目
      cancelAddASQ
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
