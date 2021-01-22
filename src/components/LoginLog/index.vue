<template>
  <!-- 表格 -->
  <a-table
    bordered
    :columns="columns"
    :data-source="loglData.data"
    :pagination="logPagination"
    :row-key="record => record.ip"
    @change="onTableChange"
  >
  </a-table>
</template>

<script>
// 登录日志数据
import { useGetLog } from "./useGetLog";
// 表格columns
import { useLogColumns } from "./useLogColumns";
export default {
  // 接收用户id
  props: ["userID"],
  setup(prop) {
    const {
      loglData, // 表格数据
      logPagination, //分页配置项
      onTableChange //页码改变回调
    } = useGetLog(prop.userID);
    // 表格columns
    const { columns } = useLogColumns();
    return {
      //#region 登录日志数据
      loglData,
      logPagination,
      onTableChange,
      //#endregion
      // 表格columns
      columns
    };
  }
};
</script>
