<template>
  <a-modal
    class="get-modal"
    v-model:visible="getModalVisible.sst"
    title="查看"
    :maskClosable="false"
    @cancel="closeModal"
  >
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
      <a-form-item label="编号">{{ getSST.no }}</a-form-item>
      <a-form-item label="题目">{{ getSST.title }}</a-form-item>
      <!-- 题目标签 start -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getSST.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getSST.labels">无</a-tag>
      </a-form-item>
      <!-- 题目标签 end -->

      <!-- 题目音频 start -->
      <a-form-item label="题目音频">
        <AudioPlayerCK
          ref="audioPlayerRef"
          v-if="getSST.titleAudio"
          :audioUrl="getSST.titleAudio"
        ></AudioPlayerCK>
        <a-tag v-else>无音频</a-tag>
      </a-form-item>
      <!-- 题目音频 end -->

      <!-- 题目原文 start -->
      <a-form-item label="题目原文">
        <p class="titleText">
          {{ getSST.titleText }}
        </p>
      </a-form-item>
      <!-- 题目原文 end -->

      <!-- 题目问题 start -->
      <a-form-item label="答案参考">
        <p class="titleText">
          {{ getSST.answer }}
        </p>
      </a-form-item>
      <!-- 题目问题 end -->

      <a-form-item label="备注">{{ getSST.remark }}</a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入查看题目详情功能
import { useGetSST } from "./useGetSST";
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
    const { getSST, audioPlayerRef } = useGetSST(
      questionDetail,
      getModalVisible
    );

    // 关闭模态框
    const { closeModal } = useCloseGetModel(audioPlayerRef);

    return {
      getSST,
      audioPlayerRef,
      closeModal
    };
  },
  components: {
    AudioPlayerCK
  }
};
</script>

<style scoped>
.titleText {
  font-size: 16px;
  line-height: 24px;
  padding-top: 6px;
  margin: 0;
}
</style>
