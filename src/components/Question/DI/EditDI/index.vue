<template>
  <!-- 编辑DI题目模态框 -->
  <a-modal
    class="modify-modal"
    v-model:visible="editModalVisible.di"
    title="编辑"
    @ok="confirmEditDI"
    @cancel="cancelEditDI"
    :maskClosable="false"
  >
    <!-- 编辑DI题目表单 start -->
    <a-form
      :model="editDI.model"
      :rules="editDI.rules"
      ref="editDIRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editDI.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editDI.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="editDI.model.labelIds"
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
        <a-select v-model:value="editDI.model.diType">
          <a-select-option v-for="val in diTypeList" :key="val.toLowerCase()">
            {{ val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="题目图片" :key="Math.random()">
        <!-- 上传图片 -->
        <ImageUpload />
        <div class="pics" v-if="!fileUrl">
          <img
            :src="item"
            v-for="item in editDI.model.pics"
            :key="item"
            style="width: 200px"
          />
        </div>
        <span class="pic-desc">图片上传5M以内</span>
      </a-form-item>
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="editDI.model.titleText" :rows="4" />
      </a-form-item>
      <a-form-item label="题目解析" name="titleAnalysis">
        <a-textarea v-model:value="editDI.model.titleAnalysis" :rows="3" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editDI.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
    <!-- 编辑DI题目表单 end -->
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入 编辑DI题目 功能
import { useEditDI } from "./useEditDI";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 图片上传
import ImageUpload from "@/components/ImageUpload";

export default {
  // 接收父组件传来的数据
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;

    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");

    // 获取要编辑的题目详情
    const questionDetail = inject("speak/questionDetail");

    // 标签列表
    const { labelList } = useGetLabels();

    // 编辑DI题目
    const {
      fileUrl,
      diTypeList,
      editDI,
      editDIRef,
      changeLabels,
      confirmEditDI,
      cancelEditDI
    } = useEditDI(editModalVisible, getQuestion, questionDetail);

    // 返回
    return {
      // 标签列表
      labelList,
      // 图片url
      fileUrl,
      // di题型-选择
      diTypeList,
      // 编辑题目的表单数据和校验规则
      editDI,
      // 编辑题目表单
      editDIRef,
      // 改变选择标签时
      changeLabels,
      // 编辑DI题目
      confirmEditDI,
      // 取消编辑DI题目
      cancelEditDI
    };
  },
  components: {
    ImageUpload
  }
};
</script>

<style lang="scss">
.add-modal .pic-desc {
  color: #aaa;
}
</style>
