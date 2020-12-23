<template>
  <!-- 添加FIBR题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.fibr"
    @ok="confirmAddFIBR"
    @cancel="cancelAddFIBR"
  >
    <p>我是添加模态框FIBR</p>
  </a-modal>
</template>

<script>
// 引入 添加FIBR题目 功能
import { useAddFIBR } from "./useAddFIBR";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加FIBR题目
    const { confirmAddFIBR, cancelAddFIBR } = useAddFIBR(addModalVisible);
    return {
      // 添加FIBR题目
      confirmAddFIBR,
      // 取消添加FIBR题目
      cancelAddFIBR,
    };
  },
};
</script>

<style scoped lang="scss"></style>
