<template>
  <!-- 编辑FIBR题目模态框 -->
  <a-modal
    class="modify-modal"
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.fibr"
    @ok="confirmEditFIBR"
    @cancel="cancelEditFIBR"
  >
    <!-- 编辑ro题目表单 start -->
    <a-form
      :model="editFIBR.model"
      :rules="editFIBR.rules"
      ref="editFIBRRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editFIBR.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editFIBR.model.title" />
      </a-form-item>
      <!-- 标签复选框 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="editFIBR.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目原文 start -->
      <span class="install">题目原文：</span>
      <a-form-item
        label=" "
        :colon="false"
        v-for="(item, index) in editFIBR.model.titleText"
        :key="index"
      >
        <a-input
          v-model:value="editFIBR.model.titleText[index]"
          style="width: 68%"
        />
        <a-select
          v-if="index != editFIBR.model.titleText.length - 1"
          style="width: 20%; margin: 0 10px"
          v-model:value="editFIBR.model.answer[index]"
        >
          <a-select-option
            v-for="item in editFIBR.model.choices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.key }}
          </a-select-option>
        </a-select>
        <MinusCircleOutlined
          v-if="index != 0 && index != editFIBR.model.titleText.length - 1"
          @click="delCalking(index)"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="dashed" style="width: 60%" @click="editCalking">
          <PlusOutlined />添加填空
        </a-button>
      </a-form-item>
      <!-- 题目原文 end -->
      <!-- 参考答案 -->
      <a-form-item label="参考答案：" name="answer">
        <a-tag v-for="(item, index) in editFIBR.model.choices" :key="item.key"
          ><span style="margin-right: 8px">{{ item.key + " :" }}</span
          ><a-input
            style="width: 80%"
            v-model:value="editFIBR.model.choices[index].content"
        /></a-tag>
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button
          type="dashed"
          style="width: 40%; margin-right: 30px"
          @click="editChoices"
        >
          <PlusOutlined />添加选项
        </a-button>
        <a-button type="dashed" style="width: 40%" @click="delChoices">
          <MinusCircleOutlined />移除选项
        </a-button>
      </a-form-item>
      <a-form-item label="解析" name="titleAnalysis">
        <a-textarea v-model:value="editFIBR.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editFIBR.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 编辑FIBR题目 功能
import { useEditFIBR } from "./useEditFIBR";
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
    // 编辑FIBR题目
    const {
      editFIBR,
      editFIBRRef,
      changeLabels,
      editCalking,
      delCalking,
      editChoices,
      delChoices,
      confirmEditFIBR,
      cancelEditFIBR
    } = useEditFIBR(editModalVisible, editDetail, getQuestion);
    return {
      // 标签列表
      labelList,
      editFIBR,
      editFIBRRef,
      changeLabels,
      editCalking,
      delCalking,
      editChoices,
      delChoices,
      // 编辑FIBR题目
      confirmEditFIBR,
      // 取消编辑FIBR题目
      cancelEditFIBR
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

<style scoped lang="scss">
.ant-form {
  position: relative;
}
.install {
  position: absolute;
  top: 200px;
  left: 70px;
  color: rgba(0, 0, 0, 0.85);
}
.ant-tag {
  width: 40%;
  background-color: #fff;
  font-weight: 700;
  border: none;
}
</style>
<style lang="scss">
.add-modal,
.modify-modal,
.check-modal {
  width: 880px !important;
}
</style>
