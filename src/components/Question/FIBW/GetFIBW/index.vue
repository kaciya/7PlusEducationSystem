<template>
  <!-- 查看FIBW题目模态框 -->
  <a-modal
    class="check-modal"
    title="查看"
    :maskClosable="false"
    :footer="null"
    v-model:visible="getModalVisible.fibw"
  >
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 17, offset: 1 }">
      <a-form-item label="编号">{{ getFIBW.no }}</a-form-item>
      <a-form-item label="题目">{{ getFIBW.title }}</a-form-item>
      <!-- 题目标签 start -->
      <a-form-item label="标签">
        <a-tag color="cyan" v-for="item in getFIBW.labels" :key="item.id">
          {{ item.name }}
        </a-tag>
        <a-tag v-if="!getFIBW.labels">无</a-tag>
      </a-form-item>
      <!-- 题目标签 end -->
      <!-- 题目原文 start -->
      <span class="install">题目原文：</span>
      <a-form-item
        label=" "
        :colon="false"
        v-for="(item, index) in getFIBW.titleText"
        :key="index"
      >
        {{ item.content }}
        <a-select
          style="width: 30%; margin: 0 10px"
          v-if="index != getFIBW.titleText.length - 1"
        >
          <a-select-option
            disabled
            v-for="item in getFIBW.choices[index]"
            :key="item.key"
          >
            {{ item.content }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 题目原文 end -->

      <!-- 讲解 start -->
      <a-form-item label="题目解析">
        <p>
          {{ getFIBW.titleAnalysis }}
        </p>
      </a-form-item>
      <!-- 讲解 end -->
      <a-form-item label="备注">{{ getFIBW.remark }}</a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// 引入vueAPI
import { inject } from "vue";
// 引入 查看FIBW题目 功能
import { useGetFIBW } from "./useGetFIBW";
export default {
  props: ["getModalVisible"],
  setup(props) {
    // 查看模态框的显示与隐藏
    const { getModalVisible } = props;
    // 题目详情
    const questionDetail = inject("questionDetail");
    // 查看FIBW题目
    const { getFIBW } = useGetFIBW(getModalVisible, questionDetail);
    return {
      getFIBW
    };
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
