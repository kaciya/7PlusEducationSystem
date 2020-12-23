<template>
  <!-- 查看FIBR题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.fibr"
    @ok="confirmGetFIBR"
    @cancel="cancelGetFIBR"
  >
    <p>我是查看模态框FIBR</p>
  </a-modal>
</template>

<script>
// 引入 查看FIBR题目 功能
import { useGetFIBR } from "./useGetFIBR";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看FIBR题目
    const { confirmGetFIBR, cancelGetFIBR } = useGetFIBR(getModalVisible);
    return {
      // 查看FIBR题目
      confirmGetFIBR,
      // 取消查看FIBW题目
      cancelGetFIBR,
    };
  },
};
</script>

<style scoped lang="scss"></style>
