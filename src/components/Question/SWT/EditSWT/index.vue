<template>
  <!-- 编辑SWT题目模态框 -->
  <a-modal
    class="modify-modal"
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible[questionType]"
    @ok="confirmEditSWT"
    @cancel="cancelEditSWT"
  >
    <!-- 编辑SWT题目表单 start -->
    <a-form
      :model="editSWT.model"
      :rules="editSWT.rules"
      ref="editSWTRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editSWT.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editSWT.model.title" />
      </a-form-item>
      <!-- 标签选择 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="editSWT.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目原文 -->
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="editSWT.model.titleText" :rows="4" />
      </a-form-item>
      <!-- 题目解析 -->
      <a-form-item label="题目解析" name="titleAnalysis">
        <a-textarea v-model:value="editSWT.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <!-- 备注 -->
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editSWT.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 编辑SWT题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 编辑SWT题目 功能
import { useEditSWT } from "./useEditSWT";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
export default {
  // 接收父组件传来的数据
  props: ["editModalVisible", "questionType"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible, questionType } = props;
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
    // 获取要编辑的题目详情
    const editDetail = inject("questionDetail");
    // 标签列表
    const { labelList } = useGetLabels();
    // 编辑SWT题目
    const {
      editSWT,
      editSWTRef,
      changeLabels,
      confirmEditSWT,
      cancelEditSWT
    } = useEditSWT(editModalVisible, questionType, editDetail, getQuestion);
    return {
      // 标签列表
      labelList,
      editSWT,
      editSWTRef,
      changeLabels,
      // 编辑SWT题目
      confirmEditSWT,
      // 取消编辑SWT题目
      cancelEditSWT
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
