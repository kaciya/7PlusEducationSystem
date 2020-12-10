<template>
  <div class="container-table">
    <a-table
      bordered
      :columns="userTopicData.topicColumns"
      :data-source="userTopicData.topicData.records"
      :pagination="false"
      :row-key="(record) => record.id"
    >
      <!-- 序号 -->
      <template #index="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
      <!-- 相关 -->
      <template #relevant="{ record }">
        <div>收藏:{{ record.favoriteCount }}</div>
        <div>阅读:{{ record.readCount }}</div>
        <div>评论:{{ record.commentCount }}</div>
      </template>
      <!-- 操作 -->
      <template #operation="{ record }">
        <span> <a-button type="primary"> 查看 </a-button></span>
        <span v-if="record.status == 0" class="shield">
          <a-button type="danger"> 显示 </a-button>
        </span>
        <span v-else-if="record.status == 1" class="shield">
          <a-button type="danger"> 屏蔽 </a-button>
        </span>
      </template>
    </a-table>
    <!-- 分页 -->
    <a-pagination
      show-size-changer
      v-model:current="pagination.pageNum"
      v-model:pageSize="pagination.pageSize"
      @change="handleTopicPageChange"
      @showSizeChange="handelTopicSizeChange"
      :page-size-options="pagination.pageSizeOptions"
      :total="pagination.total"
    >
    </a-pagination>
  </div>
</template>

<script>
import { userTopic } from "./userTopic";
export default {
  // 接收用户id
  props: ["userID"],
  setup(prop) {
    const {
      userTopicData, // 表格数据
      pagination, // 分页数据
      handelTopicSizeChange, // 点击页码跳转事件
      handleTopicPageChange, // 选择每页显示条数事件
    } = userTopic(prop.userID);
    return {
      userTopicData,
      pagination,
      handelTopicSizeChange,
      handleTopicPageChange,
    };
  },
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
  // 显示屏蔽按钮
  .shield {
    margin-left: 20px;
  }
  // 分页
  .ant-pagination {
    float: right;
    padding-top: 16px;
  }
}
//表格end
</style>
