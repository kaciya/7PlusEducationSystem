<template>
  <!-- 编辑RO题目模态框 -->
  <a-modal
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.ro"
    @ok="confirmEditRO"
    @cancel="cancelEditRO"
  >
    <p>我是编辑模态框RO</p>
  </a-modal>
</template>

<script>
// 引入 编辑RO题目 功能
import { useEditRO } from "./useEditRO";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑RO题目
    const { confirmEditRO, cancelEditRO } = useEditRO(editModalVisible);
    return {
      // 编辑RO题目
      confirmEditRO,
      // 取消编辑RO题目
      cancelEditRO,
    };
  },
};
</script>

<style scoped lang="scss"></style>
