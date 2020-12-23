<template>
  <!-- 编辑SWT题目模态框 -->
  <a-modal
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.swt"
    @ok="confirmEditSWT"
    @cancel="cancelEditSWT"
  >
    <p>我是编辑模态框SWT</p>
  </a-modal>
</template>

<script>
// 引入 编辑SWT题目 功能
import { useEditSWT } from "./useEditSWT";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑SWT题目
    const { confirmEditSWT, cancelEditSWT } = useEditSWT(editModalVisible);
    return {
      // 编辑SWT题目
      confirmEditSWT,
      // 取消编辑SWT题目
      cancelEditSWT,
    };
  },
};
</script>

<style scoped lang="scss"></style>
