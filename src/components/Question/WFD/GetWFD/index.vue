<template>
  <a-modal
    class="get-modal"
    v-model:visible="getModalVisible.wfd"
    title="查看"
    :maskClosable="false"
    @cancel="closeModal"
  >
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
      <a-form-item label="编号">{{ getWFD.no }}</a-form-item>
      <a-form-item label="题目">{{ getWFD.title }}</a-form-item>
      <!-- 题目标签 start -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getWFD.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getWFD.labels">无</a-tag>
      </a-form-item>
      <!-- 题目标签 end -->

      <!-- 题目音频 start -->
      <a-form-item label="题目音频">
        <AudioPlayerCK
          ref="audioPlayerRef"
          v-if="getWFD.titleAudio"
          :audioUrl="getWFD.titleAudio"
        />
        <a-tag v-else>无音频</a-tag>
      </a-form-item>
      <!-- 题目音频 end -->

      <!-- 题目原文 start -->
      <a-form-item label="题目原文">
        <p style="font-size: 16px; line-height: 24px; padding-top: 6px">
          {{ getWFD.answer }}
        </p>
      </a-form-item>
      <!-- 题目原文 end -->
      <a-form-item label="备注">{{ getWFD.remark }}</a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入查看题目详情功能
import { useGetWFD } from "./useGetWFD";
// 导入关闭模态框
import { useCloseGetModel } from "@/components/Question/RA/GetRA/useCloseGetModel";
// 导入音频播放器
import AudioPlayerCK from "@/components/Question/AudioPlayerCK";

export default {
  props: ["getModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { getModalVisible } = props;

    // 题目详情
    const questionDetail = inject("questionDetail");

    // 查看题目详情功能
    const { getWFD, audioPlayerRef } = useGetWFD(
      questionDetail,
      getModalVisible
    );

    // 关闭模态框
    const { closeModal } = useCloseGetModel(audioPlayerRef);

    return {
      getWFD,
      audioPlayerRef,
      closeModal
    };
  },
  components: {
    AudioPlayerCK
  }
};
</script>

<style></style>
