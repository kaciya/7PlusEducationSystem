<template>
  <!-- 添加MCM题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.mcm"
    @ok="confirmAddMCM"
    @cancel="cancelAddMCM"
  >
    <p>我是添加模态框MCM</p>
  </a-modal>
</template>

<script>
// 引入 添加MCM题目 功能
import { useAddMCM } from "./useAddMCM";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加MCM题目
    const { confirmAddMCM, cancelAddMCM } = useAddMCM(addModalVisible);
    return {
      // 添加MCM题目
      confirmAddMCM,
      // 取消添加MCM题目
      cancelAddMCM,
    };
  },
};
</script>

<style scoped lang="scss"></style>
