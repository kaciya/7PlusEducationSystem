<template>
  <!-- 查看MCM题目模态框 -->
  <a-modal
    class="check-modal"
    title="查看"
    :maskClosable="false"
    :footer="null"
    v-model:visible="getModalVisible[questionType]"
  >
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 17, offset: 1 }">
      <a-form-item label="编号">{{ getMCS.no }}</a-form-item>
      <a-form-item label="题目">{{ getMCS.title }}</a-form-item>
      <!-- 题目标签 start -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getMCS.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getMCS.labels">无</a-tag>
      </a-form-item>
      <!-- 题目标签 end -->
      <!-- 题目问题 start -->
      <a-form-item label="题目问题">
        <p class="titleText">
          {{ getMCS.titleQuestion }}
        </p>
      </a-form-item>
      <!-- 题目问题 end -->
      <!-- 题目原文 start -->
      <a-form-item label="题目原文">
        <p class="titleText">
          {{ getMCS.titleText }}
        </p>
      </a-form-item>
      <!-- 题目原文 end -->

      <!-- 选项 start -->
      <a-form-item
        :label="'选项 ' + item.key"
        v-for="item in getMCS.choices"
        :key="item.key"
      >
        <p class="titleText">
          {{ item.content }}
        </p>
      </a-form-item>
      <!-- 选项 end -->
      <!-- 答案 start -->
      <a-form-item label="参考答案">
        <p class="titleText">
          <span v-if="getMCS.answer && getMCS.answer.toString">
            <a-tag v-for="item in getMCS.answer" :key="item" color="#108ee9">{{
              item
            }}</a-tag>
            <a-tag v-if="getMCS.answer.length == 0">无答案</a-tag>
          </span>
          <a-tag v-else-if="getMCS.answer" color="#108ee9">{{
            getMCS.answer
          }}</a-tag>
          <a-tag v-else>无答案</a-tag>
        </p>
      </a-form-item>
      <!-- 答案 end -->
      <!-- 讲解 start -->
      <a-form-item label="讲解">
        <p class="titleText">
          {{ getMCS.titleAnalysis }}
        </p>
      </a-form-item>
      <!-- 讲解 end -->
      <a-form-item label="备注">{{ getMCS.remark }}</a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入 查看MCM题目 功能
import { useGetMCM } from "./useGetMCM";
export default {
  props: ["getModalVisible", "questionType"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible, questionType } = props;
    // 题目详情
    const questionDetail = inject("questionDetail");
    // 查看MCM题目
    const { getMCS } = useGetMCM(getModalVisible, questionType, questionDetail);
    return {
      getMCS
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
