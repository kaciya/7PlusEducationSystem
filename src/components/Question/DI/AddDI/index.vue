<template>
  <!-- 添加DI题目模态框 -->
  <a-modal
    v-model:visible="addModalVisible.di"
    title="添加"
    class="add-modal"
    :maskClosable="false"
    @ok="confirmAddDI"
    @cancel="cancelAddDI"
  >
    <!-- 添加DI题目表单 start -->
    <a-form
      :model="addDI.model"
      :rules="addDI.rules"
      ref="addDIRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addDI.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addDI.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addDI.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
        <!-- 题目标签复选框 end -->
      </a-form-item>
      <!-- 类型选择 -->
      <a-form-item label="类型" name="diType">
        <a-select v-model:value="addDI.model.diType">
          <a-select-option v-for="val in diTypeList" :key="val.toLowerCase()">
            {{ val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="题目图片" :key="Math.random()">
        <!-- 上传图片 -->
        <ImageUpload />
        <span class="pic-desc">图片上传5M以内</span>
      </a-form-item>
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="addDI.model.titleText" :rows="4" />
      </a-form-item>
      <a-form-item label="题目解析" name="titleAnalysis">
        <a-textarea v-model:value="addDI.model.titleAnalysis" :rows="3" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addDI.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 添加DI题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
// 引入 添加DI题目表单数据
import { useAddDIForm } from "./useAddDIForm";
// 引入 添加DI题目 功能
import { useAddDI } from "./useAddDI";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 图片上传
import ImageUpload from "@/components/ImageUpload";

export default {
  // 接收父组件传来的数据
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 标签列表
    const { labelList } = useGetLabels();

    // 使用表单数据
    const { diTypeList, addDI } = useAddDIForm();

    // 添加DI题目
    const { addDIRef, changeLabels, confirmAddDI, cancelAddDI } = useAddDI(
      addDI,
      addModalVisible,
      getQuestion
    );

    // 返回
    return {
      // 标签列表
      labelList,
      // di题型-选择
      diTypeList,
      // 添加题目的表单数据和校验规则
      addDI,
      // 添加题目表单
      addDIRef,
      // 改变选择标签时
      changeLabels,
      // 添加DI题目
      confirmAddDI,
      // 取消添加DI题目
      cancelAddDI
    };
  },
  components: {
    ImageUpload
  }
};
</script>

<style scoped lang="scss">
#labelIds {
  // 让本模态框中的标签复选框换行时保持对齐
  .ant-checkbox-wrapper:nth-child(6n) {
    margin-left: 0px;
  }
}

.add-modal .pic-desc {
  color: #aaa;
}
</style>
