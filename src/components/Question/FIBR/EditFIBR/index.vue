<template>
  <!-- 编辑FIBR题目模态框 -->
  <a-modal
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.fibr"
    @ok="confirmEditFIBR"
    @cancel="cancelEditFIBR"
  >
    <p>我是编辑模态框FIBR</p>
  </a-modal>
</template>

<script>
// 引入 编辑FIBR题目 功能
import { useEditFIBR } from "./useEditFIBR";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑FIBR题目
    const { confirmEditFIBR, cancelEditFIBR } = useEditFIBR(editModalVisible);
    return {
      // 编辑FIBR题目
      confirmEditFIBR,
      // 取消编辑FIBR题目
      cancelEditFIBR,
    };
  },
};
</script>

<style scoped lang="scss"></style>
