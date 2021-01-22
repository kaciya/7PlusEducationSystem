<template>
  <!-- 编辑MCS题目模态框 -->
  <a-modal
    class="modify-modal"
    v-model:visible="editModalVisible[questionType]"
    title="编辑"
    @ok="confirmEditMCS"
    @cancel="cancelEditMCS"
    :maskClosable="false"
  >
    <!-- 编辑mcs题目表单 start -->
    <a-form
      :model="editMCS.model"
      :rules="editMCS.rules"
      ref="editMCSRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editMCS.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editMCS.model.title" />
      </a-form-item>
      <!-- 题目标签复选框 start -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="editMCS.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目标签复选框 end -->

      <!-- 上传音频 start -->
      <a-form-item label="题目音频" name="titleAudio">
        <a-upload
          :action="uploadAudio.url"
          :headers="uploadAudio.headers"
          :file-list="uploadAudioList"
          @change="changeUploadAudio"
        >
          <a-button type="primary">上传音频</a-button>
        </a-upload>
      </a-form-item>
      <!-- 上传音频 end -->

      <!-- 题目原文 start -->
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="editMCS.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="editMCS.model"
          v-if="editMCS.model.titleAudio"
        />
      </a-form-item>
      <!-- 题目原文 end -->

      <!-- 题目问题 start -->
      <a-form-item label="题目问题" name="titleQuestion">
        <a-input v-model:value="editMCS.model.titleQuestion" />
      </a-form-item>
      <!-- 题目问题 end -->

      <!-- 题目选项 start -->
      <a-form-item
        :label="item.key"
        v-for="(item, index) in editMCS.model.choices"
        :key="item.key"
      >
        <a-input
          v-model:value="item.content"
          style="width: 85%; margin-right: 10px"
        />
        <MinusCircleOutlined
          v-if="index != 0 && index == editMCS.model.choices.length - 1"
          @click="delChoices(index)"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="dashed" style="width: 60%" @click="editChoices">
          <PlusOutlined />编辑选项
        </a-button>
      </a-form-item>
      <!-- 题目选项 end -->

      <!-- 答案参考 start -->
      <a-form-item label="参考答案" name="answer">
        <a-select v-model:value="editMCS.model.answer">
          <a-select-option
            v-for="item in editMCS.model.choices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 答案参考 end -->
      <a-form-item label="讲解" name="titleAnalysis">
        <a-textarea v-model:value="editMCS.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editMCS.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 编辑mcs题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
// 引入 音频播放器 组件
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 编辑MCS题目 功能
import { editMCS, useEditMCS } from "./useEditMCS";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "@/components/Question/SST/AddSST/useAudioSynthetic";

export default {
  // 接收父组件传来的数据
  props: ["editModalVisible", "questionType"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible, questionType } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 获取要编辑的题目详情
    const questionDetail = inject("questionDetail");

    // 标签列表
    const { labelList } = useGetLabels();

    // 上传音频列表
    const { uploadAudioList } = useUploadAudioList();

    // 编辑MCS题目
    const {
      editMCS,
      editMCSRef,
      changeLabels,
      editChoices,
      delChoices,
      confirmEditMCS,
      cancelEditMCS
    } = useEditMCS(
      editModalVisible,
      getQuestion,
      questionDetail,
      questionType,
      uploadAudioList
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      editMCS,
      uploadAudioList
    );

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      editMCS,
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
      editMCS,
      // 编辑题目表单
      editMCSRef,
      // 改变选择标签时
      changeLabels,
      // 编辑题目选项
      editChoices,
      // 删除题目选项
      delChoices,
      // 编辑mcs题目
      confirmEditMCS,
      // 取消编辑mcs题目
      cancelEditMCS
    };
  },
  components: {
    AudioPlayerZH,
    PlusOutlined,
    MinusCircleOutlined
  }
};
</script>
