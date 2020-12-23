<template>
  <!-- 添加WE题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.we"
    @ok="confirmAddWE"
    @cancel="cancelAddWE"
  >
    <p>我是添加模态框WE</p>
  </a-modal>
</template>

<script>
// 引入 添加WE题目 功能
import { useAddWE } from "./useAddWE";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加WE题目
    const { confirmAddWE, cancelAddWE } = useAddWE(addModalVisible);
    return {
      // 添加WE题目
      confirmAddWE,
      // 取消添加WE题目
      cancelAddWE,
    };
  },
};
</script>

<style scoped lang="scss"></style>
