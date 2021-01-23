<template>
  <!-- 查看RA题目详情模态框 -->
  <a-modal
    title="查看"
    :footer="null"
    :maskClosable="false"
    v-model:visible="getModalVisible.di"
    class="check-modal"
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
      <a-form-item label="题目图片">
        <img
          :src="item"
          v-for="(item, index) in questionDetail['pics']"
          :key="index"
          class="describe-img"
        />
      </a-form-item>
      <a-form-item label="题目内容">
        <span>{{ questionDetail["titleText"] }}</span>
      </a-form-item>
      <a-form-item label="题目解析">
        <span>{{ questionDetail["titleAnalysis"] }}</span>
      </a-form-item>
      <a-form-item label="备注">
        <span>{{ questionDetail["remark"] || "－" }}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 导入注入方法
import { inject } from "vue";
// 导入获取模态框
import { useGetDI } from "./useGetDI";
export default {
  props: ["getModalVisible"],
  setup() {
    // 获取题目详情
    const { layout } = useGetDI();

    // 获取[注入]查看详情
    const questionDetail = inject("speak/questionDetail");

    return {
      // 表单布局
      layout,
      // 查看详情
      questionDetail
    };
  }
};
</script>

<style lang="scss" scoped>
.describe-img {
  width: 200px;
  margin-right: 10px;
}
</style>
