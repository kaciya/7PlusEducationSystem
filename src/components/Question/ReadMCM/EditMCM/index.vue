<template>
  <!-- 编辑MCM题目模态框 -->
  <a-modal
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.mcm"
    @ok="confirmEditMCM"
    @cancel="cancelEditMCM"
  >
    <p>我是编辑模态框MCM</p>
  </a-modal>
</template>

<script>
// 引入 编辑MCM题目 功能
import { useEditMCM } from "./useEditMCM";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 编辑MCM题目
    const { confirmEditMCM, cancelEditMCM } = useEditMCM(editModalVisible);
    return {
      // 编辑MCM题目
      confirmEditMCM,
      // 取消编辑MCM题目
      cancelEditMCM,
    };
  },
};
</script>

<style scoped lang="scss"></style>
