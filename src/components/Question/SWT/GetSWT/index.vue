<template>
  <!-- 查看SWT题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible.swt"
    @ok="confirmGetSWT"
    @cancel="cancelGetSWT"
  >
    <p>我是查看模态框SWT</p>
  </a-modal>
</template>

<script>
// 引入 查看SWT题目 功能
import { useGetSWT } from "./useGetSWT";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 查看SWT题目
    const { confirmGetSWT, cancelGetSWT } = useGetSWT(getModalVisible);
    return {
      // 查看SWT题目
      confirmGetSWT,
      // 取消查看SWT题目
      cancelGetSWT,
    };
  },
};
</script>

<style scoped lang="scss"></style>
