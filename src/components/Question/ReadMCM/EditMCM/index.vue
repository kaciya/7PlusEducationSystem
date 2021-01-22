<template>
  <!-- 编辑MCM题目模态框 -->
  <a-modal
    class="modify-modal"
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.mcm"
    @ok="confirmEditMCM"
    @cancel="cancelEditMCM"
  >
    <a-form
      :model="editMCM.model"
      :rules="editMCM.rules"
      ref="editMCMRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editMCM.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editMCM.model.title" />
      </a-form-item>
      <!-- 标签复选框 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="editMCM.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目问题 -->
      <a-form-item label="题目问题" name="titleQuestion">
        <a-input v-model:value="editMCM.model.titleQuestion" />
      </a-form-item>
      <!-- 题目原文 -->
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="editMCM.model.titleText" :rows="4" />
      </a-form-item>
      <!-- 题目选项 start -->
      <a-form-item
        :label="item.key"
        v-for="(item, index) in editMCM.model.choices"
        :key="item.key"
      >
        <a-input
          v-model:value="item.content"
          style="width: 85%; margin-right: 10px"
        />
        <MinusCircleOutlined
          v-if="index != 0 && index == editMCM.model.choices.length - 1"
          @click="delChoices(index)"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="dashed" style="width: 60%" @click="editChoices">
          <PlusOutlined />添加选项
        </a-button>
      </a-form-item>
      <!-- 题目选项 end -->
      <!-- 参考答案 -->
      <a-form-item label="参考答案" name="answer">
        <a-select
          mode="multiple"
          placeholder="多选"
          v-model:value="editMCM.model.answer"
        >
          <a-select-option
            v-for="item in editMCM.model.choices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="讲解" name="titleAnalysis">
        <a-textarea v-model:value="editMCM.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editMCM.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 编辑MCM题目 功能
import { useEditMCM } from "./useEditMCM";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
export default {
  props: ["editModalVisible"],
  setup(props) {
    // 编辑模态框的显示与隐藏
    const { editModalVisible } = props;
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
    // 获取要编辑的题目详情
    const editDetail = inject("questionDetail");
    // 标签列表
    const { labelList } = useGetLabels();
    // 编辑MCM题目
    const {
      editMCM,
      editMCMRef,
      changeLabels,
      editChoices,
      delChoices,
      confirmEditMCM,
      cancelEditMCM
    } = useEditMCM(editModalVisible, editDetail, getQuestion);
    return {
      // 标签列表
      labelList,
      editMCM,
      editMCMRef,
      changeLabels,
      editChoices,
      delChoices,
      // 编辑MCM题目
      confirmEditMCM,
      // 取消编辑MCM题目
      cancelEditMCM
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
