<template>
  <!-- 编辑RO题目模态框 -->
  <a-modal
    class="modify-modal"
    title="编辑"
    :maskClosable="false"
    v-model:visible="editModalVisible.ro"
    @ok="confirmEditRO"
    @cancel="cancelEditRO"
  >
    <!-- 编辑ro题目表单 start -->
    <a-form
      :model="editRO.model"
      :rules="editRO.rules"
      ref="editRORef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 编号 -->
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="editRO.model.no" />
      </a-form-item>
      <!-- 题目 -->
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="editRO.model.title" />
      </a-form-item>
      <!-- 标签复选框 -->
      <a-form-item label="标签选择" name="labelIds">
        <a-checkbox-group
          v-model:value="editRO.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <!-- 题目设置 start -->
      <span class="install">设置</span>
      <a-form-item
        :label="item.key"
        v-for="(item, index) in editRO.model.choices"
        :key="item.key"
      >
        <a-input
          v-model:value="item.content"
          style="width: 85%; margin-right: 10px"
        />
        <MinusCircleOutlined
          v-if="index != 0 && index == editRO.model.choices.length - 1"
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
        <a-breadcrumb separator="-----">
          <a-breadcrumb-item
            v-for="(item, index) in editRO.model.choices"
            :key="item.key"
            ><a-select
              style="width: 20%; margin-bottom: 10px"
              v-model:value="editRO.model.answer[index]"
            >
              <a-select-option
                v-for="item in editRO.model.choices"
                :key="item.key"
                :value="item.key"
              >
                {{ item.key }}
              </a-select-option>
            </a-select></a-breadcrumb-item
          >
        </a-breadcrumb>
      </a-form-item>
      <a-form-item label="解析" name="titleAnalysis">
        <a-textarea v-model:value="editRO.model.titleAnalysis" :rows="4" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="editRO.model.remark" :rows="2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入注入方法
import { inject } from "vue";
// 引入图标
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
// 引入 编辑RO题目 功能
import { useEditRO } from "./useEditRO";
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
    // 编辑RO题目
    const {
      editRO,
      editRORef,
      changeLabels,
      editChoices,
      delChoices,
      confirmEditRO,
      cancelEditRO
    } = useEditRO(editModalVisible, editDetail, getQuestion);
    return {
      // 标签列表
      labelList,
      editRO,
      editRORef,
      changeLabels,
      editChoices,
      delChoices,
      // 编辑RO题目
      confirmEditRO,
      // 取消编辑RO题目
      cancelEditRO
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
  left: 88px;
}
</style>
<style lang="scss">
.add-modal,
.modify-modal,
.check-modal {
  width: 880px !important;
}
</style>
