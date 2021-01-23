<template>
  <!-- 查看RL题目详情模态框 -->
  <a-modal
    title="查看"
    :footer="null"
    :maskClosable="false"
    v-model:visible="getModalVisible.rl"
    class="check-modal"
    @cancel="closeModal"
  >
    <a-form v-bind="layout">
      <a-form-item label="题目音频">
        <AudioPlayerCK
          ref="audioPlayerRef"
          v-if="questionDetail['titleAudio']"
          :audioUrl="questionDetail['titleAudio']"
        />
        <a-tag color="purple" v-else>暂无音频</a-tag>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 导入注入
import { inject } from "vue";
// 导入音频播放器
import AudioPlayerCK from "@/components/Question/AudioPlayerCK";
// 导入获取模态框
import { useGetRL } from "./useGetRL";
// 导入关闭模态框
import { useCloseGetModel } from "@/components/Question/RA/GetRA/useCloseGetModel";
export default {
  props: ["getModalVisible"],
  setup() {
    // 获取题目详情
    const { layout, audioPlayerRef } = useGetRL();
    // 获取[注入]查看详情
    const questionDetail = inject("speak/questionDetail");
    // 关闭模态框
    const { closeModal } = useCloseGetModel(audioPlayerRef);

    return {
      // 表单布局
      layout,
      // 题目详情
      questionDetail,
      // 音频播放器ref
      audioPlayerRef,
      // 关闭模态框
      closeModal
    };
  },
  components: {
    // 音频播放器-查看
    AudioPlayerCK
  }
};
</script>

<style lang="scss"></style>
