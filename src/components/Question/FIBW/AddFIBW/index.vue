<template>
  <!-- 添加FIBW题目模态框 -->
  <a-modal
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.fibw"
    @ok="confirmAddFIBW"
    @cancel="cancelAddFIBW"
  >
    <!-- 添加ro题目表单 start -->
    <a-form
      :model="addFIBW.model"
      :rules="addFIBW.rules"
      ref="addFIBWRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addFIBW.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addFIBW.model.title" />
      </a-form-item>
      <!-- 标签复选框 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="addFIBW.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目选项 start -->
      <a-form-item
        :label="item.key"
        v-for="(item, index) in addFIBW.model.choices"
        :key="item.key"
      >
        <a-input
          v-model:value="item.content"
          style="width: 85%; margin-right: 10px"
        />
        <MinusCircleOutlined
          v-if="index != 0 && index == addFIBW.model.choices.length - 1"
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
        <a-select v-model:value="addFIBW.model.answer">
          <a-select-option
            v-for="item in addFIBW.model.choices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="题目解析" name="titleAnalysis">
        <a-textarea v-model:value="addFIBW.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addFIBW.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 标签列表 功能
import { useGetLabels } from "@/views/Question/QuestionLabel/useGetLables";
// 引入 添加FIBW题目 功能
import { useAddFIBW } from "./useAddFIBW";
export default {
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
    // 标签列表
    const { labelList } = useGetLabels();
    // 添加FIBW题目
    const {
      addFIBW,
      addFIBWRef,
      changeLabels,
      addChoices,
      delChoices,
      confirmAddFIBW,
      cancelAddFIBW,
    } = useAddFIBW(addModalVisible, getQuestion);
    return {
      // 标签列表
      labelList,
      addFIBW,
      addFIBWRef,
      changeLabels,
      addChoices,
      delChoices,
      // 添加FIBW题目
      confirmAddFIBW,
      // 取消添加FIBW题目
      cancelAddFIBW,
    };
  },
  components: {
    // 删除选项按钮
    MinusCircleOutlined,
    // 添加选项按钮
    PlusOutlined,
  },
};
</script>

<style scoped lang="scss"></style>
