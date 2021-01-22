<template>
  <a-button type="primary" @click="exportQuestion(category)">导出</a-button>
</template>

<script>
// 引入导出题目列表功能
import { useExportQuestion } from "./useExportQuestion";

export default {
  // 接收参数
  props: ["questionType", "category"],
  setup(props) {
    // 题目类型   题型分类
    const { questionType } = props;

    // 导出题目列表
    const { exportQuestion } = useExportQuestion(questionType);

    return {
      // 导出题目列表
      exportQuestion
    };
  }
};
</script>

<style></style>
