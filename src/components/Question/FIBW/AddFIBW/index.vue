<template>
  <!-- 添加FIBW题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.fibw"
    @ok="confirmAddFIBW"
    @cancel="cancelAddFIBW"
  >
    <p>我是添加模态框FIBW</p>
  </a-modal>
</template>

<script>
// 引入 添加FIBW题目 功能
import { useAddFIBW } from "./useAddFIBW";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 添加FIBW题目
    const { confirmAddFIBW, cancelAddFIBW } = useAddFIBW(addModalVisible);
    return {
      // 添加FIBW题目
      confirmAddFIBW,
      // 取消添加FIBW题目
      cancelAddFIBW,
    };
  },
};
</script>

<style scoped lang="scss"></style>
