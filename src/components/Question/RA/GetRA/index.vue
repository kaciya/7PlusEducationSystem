<template>
  <!-- 查看RA题目详情模态框 -->
  <a-modal
    title="查看"
    :width="1080"
    :footer="null"
    :maskClosable="false"
    v-model:visible="getModalVisible.ra"
    class="check-modal"
    @cancel="closeModal"
  >
    <a-form v-bind="layout">
      <a-form-item label="编号">
        <span>{{ getModalVisible.detail["no"] }} </span>
      </a-form-item>
      <a-form-item label="题目">
        <span>{{ getModalVisible.detail["title"] }}</span>
      </a-form-item>
      <a-form-item label="标签">
        <a-tag
          color="blue"
          v-for="item in getModalVisible.detail['labels']"
          :key="item.id"
          >{{ item.name }}</a-tag
        >
      </a-form-item>
      <a-form-item label="题目音频">
        <AudioPlayer
          ref="audioPlayerRef"
          :audioUrl="getModalVisible.detail['titleAudio']"
        />
      </a-form-item>
      <a-form-item label="题目原文">
        <span>{{ getModalVisible.detail["titleText"] }}</span>
        <div>
          <a-tag color="#108ee9"> 已使用该音频 </a-tag>
        </div>
      </a-form-item>
      <a-form-item label="备注">
        <span>{{ getModalVisible.detail["remark"] || "－" }}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 导入音频播放器
import AudioPlayer from "@/components/Question/AudioPlayer";
// 导入获取模态框
import { useGetRA } from "./useGetRA";
// 导入关闭模态框
import { useCloseRA } from "./useCloseRA";
export default {
  props: ["getModalVisible"],
  setup() {
    // 获取题目详情
    const { layout, audioPlayerRef } = useGetRA();
    // 关闭模态框
    const { closeModal } = useCloseRA(audioPlayerRef);

    return {
      // 表单布局
      layout,
      // 音频播放器ref
      audioPlayerRef,
      // 关闭模态框
      closeModal,
    };
  },
  components: {
    // 音频播放器
    AudioPlayer,
  },
};
</script>

<style lang="scss">
// 查看模态框-common
.check-modal {
  // 模态框body
  .ant-modal-body {
    padding-top: 14px;
    padding-bottom: 40px;
    padding-left: 50px;
  }

  // 横向表格
  .ant-form-item {
    margin-bottom: 4px;
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
