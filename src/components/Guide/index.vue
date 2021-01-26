<template>
  <div class="container-table">
    <!-- 备考指南表格 start-->
    <a-table
      bordered
      :columns="columns"
      :data-source="guideData.data"
      :pagination="false"
      :row-key="record => record.id"
    >
      <!-- 操作 -->
      <template #operation="{ record }">
        <!-- 编辑按钮 modify-btn:改变按钮颜色(黄色) -->
        <a-button
          type="primary"
          size="small"
          class="modify-btn"
          v-has="'guide:edit'"
          @click="editGuide(record)"
        >
          编辑
        </a-button>
      </template>
    </a-table>
    <!-- 备考指南表格 end-->
    <!-- 编辑模态框 start -->
    <!-- maskClosable 点击遮罩模态框不关闭 -->
    <a-modal
      title="内容设置"
      v-model:visible="editVisible"
      :maskClosable="false"
      :afterClose="editGuideEmpty"
      @ok="editGuideOk"
    >
      <!-- 输入框 -->
      <a-form
        :label-col="{ span: 4 }"
        :model="editGuideModel"
        ref="editGuideRef"
      >
        <!-- 考试要求 -->
        <a-form-item
          label="考试要求"
          :wrapperCol="{ span: 18 }"
          name="testRequires"
        >
          <!-- 多行文本框 -->
          <a-textarea
            :rows="4"
            v-model:value="editGuideModel.testRequires"
            showCount
            :maxlength="300"
          />
        </a-form-item>
        <!-- 评分项 -->
        <a-form-item label="评分项" :wrapperCol="{ span: 18 }" name="grade">
          <a-textarea
            :rows="4"
            v-model:value="editGuideModel.grade"
            showCount
            :maxlength="300"
          />
        </a-form-item>
        <!-- 题目个数 -->
        <a-form-item
          label="题目个数"
          :wrapperCol="{ span: 18 }"
          name="problemsNumber"
        >
          <a-textarea
            :rows="4"
            v-model:value="editGuideModel.problemsNumber"
            showCount
            :maxlength="300"
          />
        </a-form-item>
        <!-- 其他考核项 -->
        <a-form-item
          label="其他考核项"
          :wrapperCol="{ span: 18 }"
          name="examine"
        >
          <a-textarea
            :rows="4"
            v-model:value="editGuideModel.examine"
            showCount
            :maxlength="300"
          />
        </a-form-item>
        <!-- 答题时间 -->
        <a-form-item
          label="答题时间"
          :wrapperCol="{ span: 18 }"
          name="answerTime"
        >
          <a-textarea
            :rows="4"
            v-model:value="editGuideModel.answerTime"
            showCount
            :maxlength="300"
          />
        </a-form-item>
        <!-- 答题要点 -->
        <a-form-item
          label="答题要点"
          :wrapperCol="{ span: 18 }"
          name="keyPoints"
        >
          <a-textarea
            :rows="4"
            v-model:value="editGuideModel.keyPoints"
            showCount
            :maxlength="300"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑模态框 end -->
  </div>
</template>

<script>
// 备考指南列表
import { useGetGuide } from "./useGetGuide";
// 表格columns
import { useGuideColumns } from "./useGuideColumns";
// 编辑
import { useEditGuide } from "./useEditGuide";
export default {
  // 接收选择对应的题型Type值
  props: ["guideType"],
  setup(prop) {
    // 备考指南列表
    const { guideData, getGuideData } = useGetGuide(prop.guideType);
    // 表格columns
    const { columns } = useGuideColumns();
    // 编辑
    const {
      editGuide,
      editGuideModel,
      editVisible,
      editGuideRef,
      editGuideOk,
      editGuideEmpty
    } = useEditGuide(getGuideData, prop.guideType);
    return {
      guideData, // 表格数据
      columns, //表格columns
      getGuideData, // 获取后台数据
      editGuide, // 编辑
      editGuideModel, // 表格model
      editVisible, //控制模态框显示隐藏
      editGuideRef, // 表格ref
      editGuideOk, //点击确定回调
      editGuideEmpty // 模态框关闭的回调
    };
  }
};
</script>

<style lang="scss" scoped>
// 删除按钮
.guide-delete {
  margin-left: 8px;
}
// 输入框之间的距离
.ant-form .ant-form-item {
  margin-bottom: 0px;
}
</style>
