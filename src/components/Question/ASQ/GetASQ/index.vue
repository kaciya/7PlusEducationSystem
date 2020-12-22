<template>
  <!-- 查看RA题目详情模态框 -->
  <a-modal
    title="查看"
    :width="888"
    :footer="null"
    :maskClosable="false"
    dialogClass="check-modal"
    v-model:visible="getModalVisible.ra"
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
          color="cyan"
          v-for="item in getModalVisible.detail['labels']"
          :key="item.id"
          >{{ item.name }}</a-tag
        >
      </a-form-item>
      <a-form-item label="题目音频"></a-form-item>
      <a-form-item label="原文">
        <span>{{ getModalVisible.detail["titleText"] }}</span>
        <div>
          <a-tag color="#108ee9"> 已使用该音频 </a-tag>
        </div>
      </a-form-item>
      <a-form-item label="答案">
        <span>{{ getModalVisible.detail["answer"] }}</span>
      </a-form-item>
      <a-form-item label="备注">
        <span>{{ getModalVisible.detail["remark"] || "－" }}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 导入获取模态框
import { useGetASQ } from "./useGetASQ";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;

    // 获取题目详情
    const { layout } = useGetASQ();

    return {
      // 表单布局
      layout,
    };
  },
};
</script>

<style lang="scss">
</style>
