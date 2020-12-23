<template>
  <!-- 编辑WE题目模态框 -->
  <a-modal
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.we"
    @ok="confirmEditWE"
    @cancel="cancelEditWE"
  >
    <p>我是编辑模态框WE</p>
  </a-modal>
</template>

<script>
// 引入 编辑WE题目 功能
import { useEditWE } from "./useEditWE";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑WE题目
    const { confirmEditWE, cancelEditWE } = useEditWE(editModalVisible);
    return {
      // 编辑WE题目
      confirmEditWE,
      // 取消编辑WE题目
      cancelEditWE,
    };
  },
};
</script>

<style scoped lang="scss"></style>
