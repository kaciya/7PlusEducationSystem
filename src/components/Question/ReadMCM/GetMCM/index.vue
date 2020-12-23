<template>
  <!-- 查看MCM题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.mcm"
    @ok="confirmGetMCM"
    @cancel="cancelGetMCM"
  >
    <p>我是查看模态框MCM</p>
  </a-modal>
</template>

<script>
// 引入 查看MCM题目 功能
import { useGetMCM } from "./useGetMCM";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看RO题目
    const { confirmGetMCM, cancelGetMCM } = useGetMCM(getModalVisible);
    return {
      // 查看MCM题目
      confirmGetMCM,
      // 取消查看MCM题目
      cancelGetMCM,
    };
  },
};
</script>

<style scoped lang="scss"></style>
