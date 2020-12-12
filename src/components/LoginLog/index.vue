<template>
  <div class="container-table">
    <!-- 表格 -->
    <a-table
      bordered
      :columns="logColumns"
      :data-source="loginLoglData.Data.records"
      :pagination="false"
      :row-key="(record) => record.ip"
    >
    </a-table>
    <!-- 分页 -->
    <a-pagination
      show-size-changer
      v-model:current="pagination.pageNum"
      v-model:pageSize="pagination.pageSize"
      @change="handleLogPageChange"
      @showSizeChange="handleLogSizeChange"
      :page-size-options="pagination.pageSizeOptions"
      :total="pagination.total"
    >
    </a-pagination>
  </div>
</template>

<script>
import { LoginLog } from "./userLoginLog";
import { userLogColumns } from "./userLogColumns";
export default {
  // 接收用户id
  props: ["userID"],
  setup(prop) {
    const {
      loginLoglData, // 表格数据
      pagination, //分页数据
      handleLogPageChange, // 点击页码跳转事件
      handleLogSizeChange, // 选择每页显示条数事件
    } = LoginLog(prop.userID);
    const { logColumns } = userLogColumns();
    return {
      loginLoglData,
      pagination,
      handleLogPageChange,
      handleLogSizeChange,
      logColumns,
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
  padding: 16px 30px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-top: 0px;
  // 分页
  .ant-pagination {
    float: right;
    padding-top: 16px;
  }
}
</style>
