<template>
  <!-- 查看RO题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.ro"
    @ok="confirmGetRO"
    @cancel="cancelGetRO"
  >
    <p>我是查看模态框RO</p>
  </a-modal>
</template>

<script>
// 引入 查看RO题目 功能
import { useGetRO } from "./useGetRO";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看RO题目
    const { confirmGetRO, cancelGetRO } = useGetRO(getModalVisible);
    return {
      // 查看RO题目
      confirmGetRO,
      // 取消查看RO题目
      cancelGetRO,
    };
  },
};
</script>

<style scoped lang="scss"></style>
