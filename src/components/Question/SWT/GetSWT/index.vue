<template>
  <!-- 查看SWT题目模态框 -->
  <a-modal
    title="查看"
    :maskClosable="false"
    v-model:visible="getModalVisible[questionType]"
    @ok="confirmGetSWT"
    @cancel="cancelGetSWT"
  >
    <p>{{ `我是查看模态框${questionType}` }}</p>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 查看SWT题目 功能
import { useGetSWT } from "./useGetSWT";
export default {
  // 接收父组件传来的数据
  props: ["getModalVisible", "questionType"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible, questionType } = props;
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
    // 查看SWT题目
    const { confirmGetSWT, cancelGetSWT } = useGetSWT(
      getModalVisible,
      questionType,
      getQuestion,
    );
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
