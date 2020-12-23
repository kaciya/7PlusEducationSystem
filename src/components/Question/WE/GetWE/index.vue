<template>
  <!-- 查看WE题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.we"
    @ok="confirmGetWE"
    @cancel="cancelGetWE"
  >
    <p>我是查看模态框WE</p>
  </a-modal>
</template>

<script>
// 引入 查看WE题目 功能
import { useGetWE } from "./useGetWE";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看WE题目
    const { confirmGetWE, cancelGetWE } = useGetWE(getModalVisible);
    return {
      // 查看WE题目
      confirmGetWE,
      // 取消查看WE题目
      cancelGetWE,
    };
  },
};
</script>

<style scoped lang="scss"></style>
