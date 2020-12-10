<template>
  <div class="container-table">
    <!-- 备考指南表格 start-->
    <a-table
      bordered
      :columns="userGuideListData.Columns"
      :data-source="userGuideListData.Data"
      :pagination="false"
      :row-key="record => record.id"
    >
      <!-- 题型 -->
      <template #category="{ record }">
        <!-- 转换为大写 -->
        {{ record.category.toUpperCase() }}
      </template>
      <!-- 操作 -->
      <template #operation="{ record }">
        <!-- 编辑按钮 -->
        <a-button type="primary" size="small"> 编辑 </a-button>
        <!-- 删除按钮 传id进行删除-->
        <a-button
          type="danger"
          size="small"
          class="guide-delete"
          @click="handleRemoveGuide(record.id)"
        >
          删除
        </a-button>
      </template>
    </a-table>
    <!-- 备考指南表格 end-->
  </div>
</template>

<script>
// 备考指南列表
import { userGuideList } from "./userGetGuideList";
// 删除备考指南
import { userDelGuide } from "./userDelGuide";

export default {
  // 接收选择对应的题型Type值
  props: ["guideType"],
  setup(prop) {
    // 备考指南列表
    let { userGuideListData, getUserGuideList } = userGuideList(prop.guideType);
    // 删除
    let { handleRemoveGuide } = userDelGuide(getUserGuideList);
    return {
      userGuideListData,
      getUserGuideList,
      handleRemoveGuide
    };
  }
};
</script>

<style lang="scss" scoped>
// 表格 start

.container-table {
  position: relative;
  top: -17px;
  height: 1120px;
  border-top: 0px;
  padding: 16px 30px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  .guide-delete {
    margin-left: 8px;
  }
}
.ant-form .ant-form-item {
  margin-bottom: 0px !important;
}
//表格end
</style>
