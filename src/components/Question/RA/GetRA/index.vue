<template>
  <!-- 查看RA题目详情模态框 -->
  <a-modal
    title="查看"
    :footer="null"
    :maskClosable="false"
    v-model:visible="getModalVisible.ra"
    class="check-modal"
    @cancel="closeModal"
  >
    <a-form v-bind="layout">
      <a-form-item label="编号">
        <span>{{ questionDetail["no"] }} </span>
      </a-form-item>
      <a-form-item label="题目">
        <span>{{ questionDetail["title"] }}</span>
      </a-form-item>
      <a-form-item label="标签">
        <a-tag
          color="blue"
          v-for="item in questionDetail['labels']"
          :key="item.id"
          >{{ item.name }}</a-tag
        >
      </a-form-item>
      <a-form-item label="题目音频">
        <AudioPlayerCK
          ref="audioPlayerRef"
          v-if="questionDetail['titleAudio']"
          :audioUrl="questionDetail['titleAudio']"
        />
        <a-tag color="purple" v-else>暂无音频</a-tag>
      </a-form-item>
      <a-form-item label="题目原文">
        <span>{{ questionDetail["titleText"] }}</span>
      </a-form-item>
      <a-form-item label="备注">
        <span>{{ questionDetail["remark"] || "－" }}</span>
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
import { useGetRA } from "./useGetRA";
// 导入关闭模态框
import { useCloseGetModel } from "./useCloseGetModel";
export default {
  props: ["getModalVisible"],
  setup() {
    // 获取题目详情
    const { layout, audioPlayerRef } = useGetRA();
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

<style lang="scss">
// 查看模态框-common
.check-modal {
  width: 880px !important;

  // 模态框body
  .ant-modal-body {
    padding-top: 16px;
    padding-bottom: 40px;
    padding-left: 40px;
  }

  // 横向表格
  .ant-form-item {
    margin-bottom: 16px;
  }

  // 表单label
  .ant-form-item-label {
    padding-right: 10px;
  }

  // 标签
  .ant-tag-blue {
    padding: 2px 24px;
  }

  // 使用该音频
  .ant-tag-has-color {
    padding: 4px 14px;
    border-radius: 6px;
  }
}
</style>
