<template>
<a-layout>
  <a-table
  :columns="campStyleList.column"
  :data-source="campStyleList.data"
  :pagination="false"
  bordered
  ></a-table>
</a-layout>
</template>

<script>
// 引入表格样式
import { useCampStyleColumn } from "./useCampStyleColumn";
// 引入获取表格数据
import { useGetCampStyleList } from "./useGetCampStyleList";

export default {
  setup() {
    //#region 校区风采表格样式
    const { campStyleColumn } = useCampStyleColumn();
    //#endregion

    //#region 获取校区风采表格数据
    const { campStyleList,getCampStyleList } = useGetCampStyleList();
    // 设置表格样式
    campStyleList.column = campStyleColumn;
    //#endregion

    return {
      //#region 获取校区风采表格数据
      campStyleList,
      getCampStyleList
      //#endregion
    }
  }
};
</script>

<style scoped>

</style>