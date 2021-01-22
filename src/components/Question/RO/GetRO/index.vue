<template>
  <!-- 查看RO题目模态框 -->
  <a-modal
    class="check-modal"
    title="查看"
    :maskClosable="false"
    :footer="null"
    v-model:visible="getModalVisible.ro"
  >
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 17, offset: 1 }">
      <a-form-item label="题目">{{ getRO.title }}</a-form-item>
      <!-- 题目段落 start -->
      <a-form-item
        :label="'段落 ' + item.key"
        v-for="item in getRO.choices"
        :key="item.key"
      >
        <p class="titleText">
          {{ item.content }}
        </p>
      </a-form-item>
      <!-- 题目段落 end -->
      <!-- 答案 start -->
      <a-form-item label="参考答案">
        <p class="titleText">
          <span v-if="getRO.answer && getRO.answer.toString">
            <a-tag v-for="item in getRO.answer" :key="item" color="#108ee9">{{
              item
            }}</a-tag>
            <a-tag v-if="getRO.answer.length == 0">无答案</a-tag>
          </span>
          <a-tag v-else-if="getRO.answer" color="#108ee9">{{
            getRO.answer
          }}</a-tag>
          <a-tag v-else>无答案</a-tag>
        </p>
      </a-form-item>
      <!-- 答案 end -->
      <!-- 讲解 start -->
      <a-form-item label="讲解">
        <p class="titleText">
          {{ getRO.titleAnalysis }}
        </p>
      </a-form-item>
      <!-- 讲解 end -->
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入 查看RO题目 功能
import { useGetRO } from "./useGetRO";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 题目详情
    const questionDetail = inject("questionDetail");
    // 查看RO题目
    const { getRO } = useGetRO(getModalVisible, questionDetail);
    return {
      getRO
    };
  }
};
</script>

<style lang="scss">
.add-modal,
.modify-modal,
.check-modal {
  width: 880px !important;
}
</style>
