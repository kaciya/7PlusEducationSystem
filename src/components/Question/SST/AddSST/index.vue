<template>
  <!-- 添加SST题目模态框 -->
  <a-modal
    class="add-modal"
    v-model:visible="addModalVisible.sst"
    title="添加"
    @ok="confirmAddSST"
    @cancel="cancelAddSST"
    :maskClosable="false"
  >
    <!-- 添加sst题目表单 start -->
    <a-form
      :model="addSST.model"
      :rules="addSST.rules"
      ref="addSSTRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addSST.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addSST.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addSST.model.labelIds"
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
        <a-textarea v-model:value="addSST.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="addSST.model"
          v-if="addSST.model.titleAudio"
        />
      </a-form-item>
      <a-form-item label="答案参考" name="answer">
        <a-textarea v-model:value="addSST.model.answer" :rows="3" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addSST.model.remark" :rows="2" />
      </a-form-item>
      <a-divider />
      <a-row>
        <a-col>
          <a-checkbox v-model:checked="addSST.model.isJtdx"></a-checkbox>
          静听读写
        </a-col>
      </a-row>
      <a-form-item label="音频片段" v-if="addSST.model.isJtdx"></a-form-item>
    </a-form>
    <!-- 添加sst题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 音频播放器 组件
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 添加SST题目表单数据
import { useAddSSTForm } from "./useAddSSTForm";
// 引入 添加SST题目 功能
import { useAddSST } from "./useAddSST";
// 引入 上传音频列表
import { useUploadAudioList } from "./useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "./useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "./useAudioSynthetic";

export default {
  // 接收父组件传来的数据
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

    // 使用表单数据
    const { addSST } = useAddSSTForm();

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addSST,
      uploadAudioList
    );

    // 添加SST题目
    const { addSSTRef, changeLabels, confirmAddSST, cancelAddSST } = useAddSST(
      addSST,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addSST,
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
      addSST,
      // 添加题目表单
      addSSTRef,
      // 改变选择标签时
      changeLabels,
      // 添加sst题目
      confirmAddSST,
      // 取消添加sst题目
      cancelAddSST
    };
  },
  components: {
    AudioPlayerZH
  }
};
</script>

<style lang="scss">
.add-modal,
.modify-modal,
.get-modal {
  width: 880px !important;
}
</style>
