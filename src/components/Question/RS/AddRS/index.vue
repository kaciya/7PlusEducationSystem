<template>
  <!-- 添加RS题目模态框 -->
  <a-modal
    v-model:visible="addModalVisible.rs"
    title="添加"
    class="add-modal"
    :maskClosable="false"
    @ok="confirmAddRS"
    @cancel="cancelAddRS"
  >
    <!-- 添加RS题目表单 start -->
    <a-form
      :model="addRS.model"
      :rules="addRS.rules"
      ref="addRSRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addRS.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addRS.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addRS.model.labelIds"
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
        <a-textarea v-model:value="addRS.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="addRS.model"
          v-if="addRS.model.titleAudio"
        />
      </a-form-item>

      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addRS.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加RS题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
// 引入 添加RS题目表单数据
import { useAddRSForm } from "./useAddRSForm";
// 引入 添加RS题目 功能
import { useAddRS } from "./useAddRS";
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

    // 添加RS题目表单数据
    const { addRS } = useAddRSForm();

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addRS,
      uploadAudioList
    );

    // 添加RS题目
    const { addRSRef, changeLabels, confirmAddRS, cancelAddRS } = useAddRS(
      addRS,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addRS,
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
      addRS,
      // 添加题目表单
      addRSRef,
      // 改变选择标签时
      changeLabels,
      // 添加RS题目
      confirmAddRS,
      // 取消添加RS题目
      cancelAddRS
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
