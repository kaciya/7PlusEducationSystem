<template>
  <!-- 添加FIB题目模态框 -->
  <a-modal
    class="add-modal"
    v-model:visible="addModalVisible.fib"
    title="添加"
    @ok="confirmAddFIB"
    @cancel="cancelAddFIB"
    :maskClosable="false"
  >
    <!-- 添加fib题目表单 start -->
    <a-form
      :model="addFIB.model"
      :rules="addFIB.rules"
      ref="addFIBRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addFIB.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addFIB.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addFIB.model.labelIds"
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
        <div v-for="(item, index) in addFIB.model.titleText" :key="index">
          <!-- 题目原文 -->
          <a-input
            placeholder="文本"
            style="width: 60%; margin-right: 8px"
            v-model:value="item.text"
          />
          <!-- 填空答案 -->
          <a-input
            v-if="index != addFIB.model.titleText.length - 1"
            v-model:value="item.answer"
            placeholder="填空答案"
            style="width: 30%; margin-right: 8px"
          />
          <!-- 移除图标 -->
          <MinusCircleOutlined
            v-if="index != 0 && index != addFIB.model.titleText.length - 1"
            @click="delTitleText(index)"
          />
        </div>
        <!-- 题目原文及填空答案 end -->

        <!-- 添加原文填空 -->
        <a-button type="dashed" style="width: 60%" @click="addTitleText">
          <PlusOutlined />添加原文填空
        </a-button>
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="addFIB.model"
          v-if="addFIB.model.titleAudio"
        />
      </a-form-item>
      <!-- 备注 -->
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addFIB.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加fib题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 音频播放器 组件
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 添加FIB题目表单数据
import { useAddFIBForm } from "./useAddFIBForm";
// 引入 添加FIB题目 功能
import { addFIB, useAddFIB } from "./useAddFIB";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
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

    // 添加FIB题目表单数据
    const { addFIB } = useAddFIBForm();

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addFIB,
      uploadAudioList
    );

    // 添加FIB题目
    const {
      addFIBRef,
      changeLabels,
      addTitleText,
      delTitleText,
      confirmAddFIB,
      cancelAddFIB
    } = useAddFIB(
      addFIB,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addFIB,
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
      addFIB,
      // 添加题目表单
      addFIBRef,
      // 改变选择标签时
      changeLabels,
      // 添加题目原文填空
      addTitleText,
      // 移除题目原文填空
      delTitleText,
      // 添加fib题目
      confirmAddFIB,
      // 取消添加fib题目
      cancelAddFIB
    };
  },
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    AudioPlayerZH
  }
};
</script>
