<template>
  <div class="container-table">
    <!-- 表格 -->
    <a-table
      bordered
      :columns="loginJournalData.journalColumns"
      :data-source="loginJournalData.journalData.records"
      :pagination="false"
      :row-key="(record) => record.ip"
    >
    </a-table>
    <!-- 分页 -->
    <a-pagination
      show-size-changer
      v-model:current="pagination.pageNum"
      v-model:pageSize="pagination.pageSize"
      @change="handleJournalPageChange"
      @showSizeChange="handleJournalSizeChange"
      :page-size-options="pagination.pageSizeOptions"
      :total="pagination.total"
    >
    </a-pagination>
  </div>
</template>

<script>
import { LoginJournal } from "./userLoginJournal";
export default {
  // 接收用户id
  props: ["userID"],
  setup(prop) {
    const {
      loginJournalData, // 表格数据
      pagination, //分页数据
      handleJournalPageChange, // 点击页码跳转事件
      handleJournalSizeChange, // 选择每页显示条数事件
    } = LoginJournal(prop.userID);
    return {
      loginJournalData,
      pagination,
      handleJournalPageChange,
      handleJournalSizeChange,
    };
  },
};
</script>

<style lang="scss" scoped>
// 表单容器
.container-table {
  position: relative;
  top: -17px;
  height: 1120px;
  border-top: 0px;
  padding: 16px 30px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  // 分页
  .ant-pagination {
    float: right;
    padding-top: 16px;
  }
}
</style>