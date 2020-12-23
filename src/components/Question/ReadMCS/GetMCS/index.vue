<template>
  <!-- 查看MCS题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.mcs"
    @ok="confirmGetMCS"
    @cancel="cancelGetMCS"
  >
    <p>我是查看模态框MCS</p>
  </a-modal>
</template>

<script>
// 引入 查看MCS题目 功能
import { useGetMCS } from "./useGetMCS";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看MCS题目
    const { confirmGetMCS, cancelGetMCS } = useGetMCS(getModalVisible);
    return {
      // 查看MCS题目
      confirmGetMCS,
      // 取消查看MCS题目
      cancelGetMCS,
    };
  },
};
</script>

<style scoped lang="scss"></style>
