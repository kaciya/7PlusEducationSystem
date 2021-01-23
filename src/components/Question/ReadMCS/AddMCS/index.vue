<template>
  <!-- 添加MCS题目模态框 -->
  <a-modal
    class="add-modal"
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.mcs"
    @ok="confirmAddMCS"
    @cancel="cancelAddMCS"
  >
    <!-- 添加mcs题目表单 start -->
    <a-form
      :model="addMCS.model"
      :rules="addMCS.rules"
      ref="addMCSRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addMCS.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addMCS.model.title" />
      </a-form-item>
      <!-- 标签复选框 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="addMCS.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目问题 -->
      <a-form-item label="题目问题" name="titleQuestion">
        <a-input v-model:value="addMCS.model.titleQuestion" />
      </a-form-item>
      <!-- 题目原文 -->
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="addMCS.model.titleText" :rows="4" />
      </a-form-item>
      <!-- 题目选项 start -->
      <a-form-item
        :label="item.key"
        v-for="(item, index) in addMCS.model.choices"
        :key="item.key"
      >
        <a-input
          v-model:value="item.content"
          style="width: 85%; margin-right: 10px"
        />
        <MinusCircleOutlined
          v-if="index != 0 && index == addMCS.model.choices.length - 1"
          @click="delChoices(index)"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="dashed" style="width: 60%" @click="addChoices">
          <PlusOutlined />添加选项
        </a-button>
      </a-form-item>
      <!-- 题目选项 end -->
      <!-- 参考答案 -->
      <a-form-item label="参考答案" name="answer">
        <a-select placeholder="单选" v-model:value="addMCS.model.answer">
          <a-select-option
            v-for="item in addMCS.model.choices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="讲解" name="titleAnalysis">
        <a-textarea v-model:value="addMCS.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addMCS.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 添加MCS题目 功能
import { useAddMCS } from "./useAddMCS";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
    // 标签列表
    const { labelList } = useGetLabels();
    // 添加MCM题目
    const {
      addMCS,
      addMCSRef,
      changeLabels,
      addChoices,
      delChoices,
      confirmAddMCS,
      cancelAddMCS
    } = useAddMCS(addModalVisible, getQuestion);
    return {
      // 标签列表
      labelList,
      addMCS,
      addMCSRef,
      changeLabels,
      addChoices,
      delChoices,
      // 添加MCS题目
      confirmAddMCS,
      // 取消添加MCS题目
      cancelAddMCS
    };
  },
  components: {
    // 删除选项按钮
    MinusCircleOutlined,
    // 添加选项按钮
    PlusOutlined
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
