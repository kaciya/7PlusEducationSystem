<template>
  <!-- 添加FIBW题目模态框 -->
  <a-modal
    class="add-modal"
    title="添加"
    :maskClosable="false"
    v-model:visible="addModalVisible.fibw"
    @ok="confirmAddFIBW"
    @cancel="cancelAddFIBW"
  >
    <!-- 添加fibw题目表单 start -->
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
      <!-- 题目原文 start -->
      <span class="install">题目原文：</span>
      <a-form-item
        label=" "
        :colon="false"
        v-for="(item, index) in addFIBW.model.titleText"
        :key="item.key"
      >
        <a-input v-model:value="item.content" style="width: 68%" />
        <a-tag
          v-if="index != addFIBW.model.titleText.length - 1"
          color="#108ee9"
          style="margin: 0 10px"
        >
          选项{{ item.key }}
        </a-tag>
        <MinusCircleOutlined
          style="margin-left: 10px"
          v-if="index != 0 && index == addFIBW.model.titleText.length - 1"
          @click="delCalking"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="dashed" style="width: 60%" @click="addCalking">
          <PlusOutlined />添加填空
        </a-button>
      </a-form-item>
      <!-- 题目选项 -->
      <a-form-item
        label=" "
        :colon="false"
        v-for="(item, index) in addFIBW.model.choices"
        :key="index"
      >
        <a-tag color="#108ee9" style="margin: 0 10px">
          选项{{ index + 1 }}
        </a-tag>
        <a-button
          type="dashed"
          style="width: 20%; margin-right: 10px"
          @click="addChoices(index)"
        >
          <PlusOutlined />添加选项
        </a-button>
        <a-button type="dashed" style="width: 20%" @click="delChoices(index)">
          <MinusCircleOutlined />移除选项
        </a-button>
        <br />
        <a-radio-group v-model:value="addFIBW.model.answer[index]">
          <a-row>
            <a-col
              style="max-width: 152px; margin-bottom: 10px"
              v-for="(item, index) in addFIBW.model.choices[index]"
              :key="index"
            >
              <a-radio :value="item.key">
                {{ item.key }}
              </a-radio>
              <a-input v-model:value="item.content" style="width: 60%"
            /></a-col>
          </a-row>
        </a-radio-group>
      </a-form-item>
      <!-- 题目原文 end -->
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
      addCalking,
      delCalking,
      addChoices,
      delChoices,
      confirmAddFIBW,
      cancelAddFIBW
    } = useAddFIBW(addModalVisible, getQuestion);
    return {
      // 标签列表
      labelList,
      addFIBW,
      addFIBWRef,
      changeLabels,
      addCalking,
      delCalking,
      addChoices,
      delChoices,
      // 添加FIBW题目
      confirmAddFIBW,
      // 取消添加FIBW题目
      cancelAddFIBW
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
</style>
<style lang="scss">
.add-modal,
.modify-modal,
.check-modal {
  width: 880px !important;
}
</style>
