<template>
  <!-- 编辑FIB题目模态框 -->
  <a-modal
    class="modify-modal"
    v-model:visible="editModalVisible.fib"
    title="编辑"
    @ok="confirmEditFIB"
    @cancel="cancelEditFIB"
    :maskClosable="false"
  >
    <!-- 编辑fib题目表单 start -->
    <a-form
      :model="editFIB.model"
      :rules="editFIB.rules"
      ref="editFIBRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editFIB.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editFIB.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="editFIB.model.labelIds"
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
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 题目原文及填空答案 start -->
        <div v-for="(item, index) in editFIB.model.titleText" :key="index">
          <!-- 题目原文 -->
          <a-input
            placeholder="文本"
            style="width: 60%; margin-right: 8px"
            v-model:value="item.text"
          />
          <!-- 填空答案 -->
          <a-input
            v-if="index != editFIB.model.titleText.length - 1"
            v-model:value="item.answer"
            placeholder="填空答案"
            style="width: 30%; margin-right: 8px"
          />
          <!-- 移除图标 -->
          <MinusCircleOutlined
            v-if="index != 0 && index != editFIB.model.titleText.length - 1"
            @click="delTitleText(index)"
          />
        </div>
        <!-- 题目原文及填空答案 end -->

        <!-- 添加原文填空 -->
        <a-button type="dashed" style="width: 60%" @click="editTitleText">
          <PlusOutlined />添加原文填空
        </a-button>
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="editFIB.model"
          v-if="editFIB.model.titleAudio"
        />
      </a-form-item>
      <!-- 备注 -->
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editFIB.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 编辑fib题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 音频播放器 组件
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 编辑FIB题目 功能
import { editFIB, useEditFIB } from "./useEditFIB";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "../AddFIB/useAudioSynthetic";

export default {
  // 接收父组件传来的数据
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 获取要编辑的题目详情
    const questionDetail = inject("questionDetail");

    // 标签列表
    const { labelList } = useGetLabels();

    // 上传音频列表
    const { uploadAudioList } = useUploadAudioList();

    // 编辑FIB题目
    const {
      editFIB,
      editFIBRef,
      changeLabels,
      editTitleText,
      delTitleText,
      confirmEditFIB,
      cancelEditFIB
    } = useEditFIB(
      editModalVisible,
      getQuestion,
      questionDetail,
      uploadAudioList
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      editFIB,
      uploadAudioList
    );

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      editFIB,
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
      editFIB,
      // 编辑题目表单
      editFIBRef,
      // 改变选择标签时
      changeLabels,
      // 编辑题目原文填空
      editTitleText,
      // 移除题目原文填空
      delTitleText,
      // 编辑fib题目
      confirmEditFIB,
      // 取消编辑fib题目
      cancelEditFIB
    };
  },
  components: {
    AudioPlayerZH,
    MinusCircleOutlined,
    PlusOutlined
  }
};
</script>
