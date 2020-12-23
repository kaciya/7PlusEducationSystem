<template>
  <!-- 添加RO题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.ro"
    @ok="confirmAddRO"
    @cancel="cancelAddRO"
  >
    <p>我是添加模态框RO</p>
  </a-modal>
</template>

<script>
// 引入 添加RO题目 功能
import { useAddRO } from "./useAddRO";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加RO题目
    const { confirmAddRO, cancelAddRO } = useAddRO(addModalVisible);
    return {
      // 添加RO题目
      confirmAddRO,
      // 取消添加RO题目
      cancelAddRO,
    };
  },
};
</script>

<style scoped lang="scss"></style>
