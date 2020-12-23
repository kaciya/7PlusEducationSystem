<template>
  <!-- 编辑MCS题目模态框 -->
  <a-modal
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.mcs"
    @ok="confirmEditMCS"
    @cancel="cancelEditMCS"
  >
    <p>我是编辑模态框MCS</p>
  </a-modal>
</template>

<script>
// 引入 编辑MCS题目 功能
import { useEditMCS } from "./useEditMCS";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑MCS题目
    const { confirmEditMCS, cancelEditMCS } = useEditMCS(editModalVisible);
    return {
      // 编辑MCS题目
      confirmEditMCS,
      // 取消编辑MCS题目
      cancelEditMCS,
    };
  },
};
</script>

<style scoped lang="scss"></style>
