<template>
  <!-- 查看RA题目详情模态框 -->
  <a-modal
    title="查看"
    :width="888"
    :footer="null"
    :maskClosable="false"
    class="check-modal"
    v-model:visible="getModalVisible.di"
  >
    <a-form v-bind="layout">
      <a-form-item label="编号">
        <span>{{ getDetail["no"] }} </span>
      </a-form-item>
      <a-form-item label="题目">
        <span>{{ getDetail["title"] }}</span>
      </a-form-item>
      <a-form-item label="标签">
        <a-tag
          color="cyan"
          v-for="item in getDetail['labels']"
          :key="item.id"
          >{{ item.name }}</a-tag
        >
      </a-form-item>
      <a-form-item label="题目图片">
        <img
          src="item"
          v-for="(item, index) in getDetail['pics']"
          :key="index"
        />
      </a-form-item>
      <a-form-item label="题目内容">
        <span>{{ getDetail["titleText"] }}</span>
      </a-form-item>
      <a-form-item label="题目解析">
        <span>{{ getDetail["titleAnalysis"] }}</span>
      </a-form-item>
      <a-form-item label="备注">
        <span>{{ getDetail["remark"] || "－" }}</span>
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
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;

    // 获取题目详情
    const { layout, getDetail } = useGetDI();

    return {
      // 表单布局
      layout,
      // 查看详情
      getDetail,
    };
  },
};
</script>

<style lang="scss">
</style>
