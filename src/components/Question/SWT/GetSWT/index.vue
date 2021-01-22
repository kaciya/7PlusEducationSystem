<template>
  <!-- 查看SWT题目模态框 -->
  <a-modal
    class="check-modal"
    title="查看"
    :maskClosable="false"
    :footer="null"
    v-model:visible="getModalVisible[questionType]"
  >
    <!-- 查看表单 start -->
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 17, offset: 1 }">
      <!-- 编号 -->
      <a-form-item label="编号">{{ getSWT.no }}</a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目">{{ getSWT.title }}</a-form-item>
      <!-- 题目标签 -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getSWT.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getSWT.labels">无</a-tag>
      </a-form-item>
      <!-- 题目内容 -->
      <a-form-item label="题目内容"
        ><p style="font-size: 14px; line-height: 24px; padding-top: 6px">
          {{ getSWT.titleText }}
        </p></a-form-item
      >
      <!-- 题目解析 -->
      <a-form-item label="题目解析">{{ getSWT.titleAnalysis }}</a-form-item>
      <!-- 备注 -->
      <a-form-item label="备注">{{ getSWT.remark }}</a-form-item>
    </a-form>
    <!-- 查看表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 查看SWT题目 功能
import { useGetSWT } from "./useGetSWT";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
export default {
  // 接收父组件传来的数据
  props: ["getModalVisible", "questionType"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible, questionType } = props;
    // 获取要查看的题目详情
    const getDetail = inject("questionDetail");
    // 标签列表
    const { labelList } = useGetLabels();
    // 查看SWT题目
    const { getSWT } = useGetSWT(getModalVisible, questionType, getDetail);

    return {
      // 标签列表
      labelList,
      // 查看数据
      getSWT
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
