<template>
  <!-- 表格 -->
  <a-table
    bordered
    :columns="columns"
    :data-source="topicData.data"
    :pagination="topicPagination"
    :row-key="(record) => record.id"
    @change="onTableChange"
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
      <!-- 查看按钮 -->
      <span> <a-button type="primary"> 查看 </a-button></span>
      <!-- 显示按钮 -->
      <span v-if="record.status == 0" class="shield">
        <a-button type="primary"> 显示 </a-button>
      </span>
      <!-- 屏蔽按钮 -->
      <span v-else-if="record.status == 1" class="shield">
        <a-button type="danger"> 屏蔽 </a-button>
      </span>
    </template>
  </a-table>
</template>
<script>
// 柒加圈数据
import { useGetTopic } from "./useGetTopic";
// 柒加圈columns
import { useTopicColumns } from "./useTopicColumns";
export default {
  // 接收用户id
  props: ["userID"],
  setup(prop) {
    const {
      topicData, // 表格数据
      topicPagination, //分页配置项
      onTableChange, //页码改变回调
    } = useGetTopic(prop.userID);
    // 柒加圈columns
    const { columns } = useTopicColumns();
    return {
      topicData,
      columns,
      topicPagination,
      onTableChange,
    };
  },
};
</script>

<style lang="scss" scoped>
// 显示屏蔽按钮
.shield {
  margin-left: 20px;
}
</style>
