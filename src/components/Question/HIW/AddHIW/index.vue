<template>
  <!-- 添加HIW题目模态框 -->
  <a-modal
    class="add-modal"
    v-model:visible="addModalVisible.hiw"
    title="添加"
    @ok="confirmAddHIW"
    @cancel="cancelAddHIW"
    :maskClosable="false"
  >
    <!-- 添加hiw题目表单 start -->
    <a-form
      :model="addHIW.model"
      :rules="addHIW.rules"
      ref="addHIWRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addHIW.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addHIW.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addHIW.model.labelIds"
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
      <!-- 题目原文 start -->
      <a-form-item label="题目原文" name="titleQuestion">
        <a-textarea v-model:value="addHIW.model.titleQuestion" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
        <!-- 音频播放器-转化 -->
        <AudioPlayerZH
          :audioModel="addHIW.model"
          v-if="addHIW.model.titleAudio"
        />
      </a-form-item>
      <!-- 题目原文 end -->

      <!-- 题目问题 start -->
      <a-form-item label="题目问题">
        <a-tag
          v-for="(item, index) in allTitleText"
          :key="index"
          :color="item.text ? 'red' : ''"
          @click="showSetModal(item)"
          >{{ item.text ? item.text : item.answer }}</a-tag
        >
      </a-form-item>
      <!-- 题目问题 end -->

      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addHIW.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加hiw题目表单 end -->

    <!-- 编辑错误展示模态框 start -->
    <a-modal
      title="编辑"
      :width="400"
      centered
      v-model:visible="setWrongVisible"
      @cancel="cancelSetWrong"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15, offset: 1 }">
        <!-- 正确答案 -->
        <a-form-item label="正确">
          <span style="color: blue">{{ settingText.answer }}</span>
        </a-form-item>
        <!-- 错误展示输入框 -->
        <a-form-item label="错误展示" required>
          <a-input v-model:value="settingText.text"></a-input>
        </a-form-item>
      </a-form>
      <!-- 自定义底部按钮 start -->
      <template #footer>
        <!-- 取消重新设置错误展示 -->
        <a-button @click="cancelSetWrong"> 取消 </a-button>
        <!-- 删除之前设置的错误展示 -->
        <a-button type="danger" @click="removeSetWrong">删除</a-button>
        <!-- 确定设置错误展示 -->
        <a-button type="primary" @click="confirmSetWrong"> 确定 </a-button>
      </template>
      <!-- 自定义底部按钮 end -->
    </a-modal>
    <!-- 编辑错误展示模态框 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 音频播放器 组件
import AudioPlayerZH from "@/components/Question/AudioPlayerZH";
// 引入 添加HIW题目表单数据
import { useAddHIWForm } from "./useAddHIWForm";
// 引入 添加HIW题目 功能
import { useAddHIW } from "./useAddHIW";
// 引入 上传音频列表
import { useUploadAudioList } from "@/components/Question/SST/AddSST/useUploadAudioList";
// 引入 上传音频 功能
import { useUploadAudio } from "@/components/Question/SST/AddSST/useUploadAudio";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 音频合成 功能
import { useAudioSynthetic } from "@/components/Question/SST/AddSST/useAudioSynthetic";
// 引入 设置错误展示 功能
import { useSetWrong } from "./useSetWrong";

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

    // 添加HIW题目表单数据
    const { addHIW } = useAddHIWForm();

    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addHIW,
      uploadAudioList,
      "titleQuestion"
    );

    // 添加HIW题目
    const {
      addHIWRef,
      allTitleText,
      changeLabels,
      confirmAddHIW,
      cancelAddHIW
    } = useAddHIW(
      addHIW,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );

    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addHIW,
      uploadAudioList
    );

    // 设置错误展示功能
    const {
      setWrongVisible,
      showSetModal,
      settingText,
      cancelSetWrong,
      confirmSetWrong,
      removeSetWrong
    } = useSetWrong();

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
      addHIW,
      // 添加题目表单
      addHIWRef,
      // 题目全部原文
      allTitleText,
      // 改变选择标签时
      changeLabels,
      // 添加hiw题目
      confirmAddHIW,
      // 取消添加hiw题目
      cancelAddHIW,

      //#region 设置错误展示功能
      // 设置错误展示模态框的显示与隐藏
      setWrongVisible,
      // 打开设置错误展示模态框
      showSetModal,
      // 正在设置的原文对象
      settingText,
      // 取消设置
      cancelSetWrong,
      // 确认设置
      confirmSetWrong,
      // 移除错误展示
      removeSetWrong
      //#endregion
    };
  },
  components: {
    AudioPlayerZH
  }
};
</script>
