<template>
  <!-- 添加FIBR题目模态框 -->
  <a-modal
    class="add-modal"
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.fibr"
    @ok="confirmAddFIBR"
    @cancel="cancelAddFIBR"
  >
    <!-- 添加ro题目表单 start -->
    <a-form
      :model="addFIBR.model"
      :rules="addFIBR.rules"
      ref="addFIBRRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addFIBR.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addFIBR.model.title" />
      </a-form-item>
      <!-- 标签复选框 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="addFIBR.model.labelIds"
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
        v-for="(item, index) in addFIBR.model.titleText"
        :key="index"
      >
        <a-input
          v-model:value="addFIBR.model.titleText[index]"
          style="width: 68%"
        />
        <a-select
          v-if="index != addFIBR.model.titleText.length - 1"
          style="width: 20%; margin: 0 10px"
          v-model:value="addFIBR.model.answer[index]"
        >
          <a-select-option
            v-for="item in addFIBR.model.choices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.key }}
          </a-select-option>
        </a-select>
        <MinusCircleOutlined
          v-if="index != 0 && index != addFIBR.model.titleText.length - 1"
          @click="delCalking(index)"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="dashed" style="width: 60%" @click="addCalking">
          <PlusOutlined />添加填空
        </a-button>
      </a-form-item>
      <!-- 题目原文 end -->
      <!-- 参考答案 -->
      <a-form-item label="参考答案：" name="answer">
        <a-tag v-for="(item, index) in addFIBR.model.choices" :key="item.key"
          ><span style="margin-right: 8px">{{ item.key + " :" }}</span
          ><a-input
            style="width: 80%"
            v-model:value="addFIBR.model.choices[index].content"
        /></a-tag>
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button
          type="dashed"
          style="width: 40%; margin-right: 30px"
          @click="addChoices"
        >
          <PlusOutlined />添加选项
        </a-button>
        <a-button type="dashed" style="width: 40%" @click="delChoices">
          <MinusCircleOutlined />移除选项
        </a-button>
      </a-form-item>
      <a-form-item label="解析" name="titleAnalysis">
        <a-textarea v-model:value="addFIBR.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addFIBR.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 添加FIBR题目 功能
import { useAddFIBR } from "./useAddFIBR";
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
    // 添加FIBR题目
    const {
      addFIBR,
      addFIBRRef,
      changeLabels,
      addCalking,
      delCalking,
      addChoices,
      delChoices,
      confirmAddFIBR,
      cancelAddFIBR
    } = useAddFIBR(addModalVisible, getQuestion);
    return {
      // 标签列表
      labelList,
      addFIBR,
      addFIBRRef,
      changeLabels,
      addCalking,
      delCalking,
      addChoices,
      delChoices,
      // 添加FIBR题目
      confirmAddFIBR,
      // 取消添加FIBR题目
      cancelAddFIBR
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
