<template>
  <!-- 添加SWT题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.swt"
    @ok="confirmAddSWT"
    @cancel="cancelAddSWT"
  >
    <p>我是添加模态框SWT</p>
  </a-modal>
</template>

<script>
// 引入 添加SWT题目 功能
import { useAddSWT } from "./useAddSWT";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加SWT题目
    const { confirmAddSWT, cancelAddSWT } = useAddSWT(addModalVisible);
    return {
      // 添加SWT题目
      confirmAddSWT,
      // 取消添加SWT题目
      cancelAddSWT,
    };
  },
};
</script>

<style scoped lang="scss"></style>
