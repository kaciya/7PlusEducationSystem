<template>
  <!-- 添加SWT题目模态框 -->
  <a-modal
    class="add-modal"
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible[questionType]"
    @ok="confirmAddSWT"
    @cancel="cancelAddSWT"
  >
    <!-- 添加SWT题目表单 start -->
    <a-form
      :model="addSWT.model"
      :rules="addSWT.rules"
      ref="addSWTRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addSWT.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addSWT.model.title" />
      </a-form-item>
      <!-- 标签选择 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="addSWT.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目原文 -->
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="addSWT.model.titleText" :rows="4" />
      </a-form-item>
      <!-- 题目解析 -->
      <a-form-item label="题目解析" name="titleAnalysis">
        <a-textarea v-model:value="addSWT.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <!-- 备注 -->
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addSWT.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加SWT题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 添加SWT题目 功能
import { useAddSWT } from "./useAddSWT";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
export default {
  // 接收父组件传来的数据
  props: ["addModalVisible", "questionType"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible, questionType } = props;
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
    // 标签列表
    const { labelList } = useGetLabels();
    // 添加SWT题目
    const {
      addSWT,
      addSWTRef,
      changeLabels,
      confirmAddSWT,
      cancelAddSWT
    } = useAddSWT(addModalVisible, questionType, getQuestion);
    return {
      // 标签列表
      labelList,
      addSWT,
      addSWTRef,
      changeLabels,
      // 添加SWT题目
      confirmAddSWT,
      // 取消添加SWT题目
      cancelAddSWT
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
