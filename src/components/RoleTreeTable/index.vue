<template>
  <!-- 权限设置列表 -->
  <a-table
    :columns="rolePermissionTable.colums"
    :data-source="rolePermissionTable.data"
    row-key="permissionId"
  >
    <!-- 渲染权限类型 -->
    <template #permissionType="{ record }">
      <!-- 一级渲染 -->
      <a-checkbox
        :value="record.permissionId"
        @change="getCheckedChild($event, record)"
      >
        {{ record.name }}
      </a-checkbox>
      <!-- 一级渲染 end -->
    </template>
    <!-- 渲染权限类型 end -->

    <!-- 渲染权限名称 -->
    <template #permissionName="{ record }">
      <!-- 二/三级渲染 -->
      <a-row v-for="childItem in record.child" :key="childItem.permissionId">
        <!-- 二级渲染 -->
        <a-col :span="6">
          <a-checkbox v-model:checked="checkedData.checkedOneChildModel">
            {{ childItem.name }}
          </a-checkbox>
        </a-col>
        <!-- 二级渲染 end -->
        <!-- 三级渲染 -->
        <a-col :span="12">
          <a-checkbox
            v-model:checked="childsItem.checkedSecondChildModel"
            v-for="childsItem in childItem.child"
            :key="childsItem.permissionId"
          >
            {{ childsItem.name }}
          </a-checkbox>
        </a-col>
        <!-- 三级渲染 end -->
      </a-row>
      <!-- 二/三级渲染 end -->
    </template>
    <!-- 渲染权限名称 end -->
  </a-table>
  <!-- 权限设置列表 end -->
</template>
<script>
// 引入 钩子函数
import { onMounted } from "vue";

// 获取 权限组-添加 中后台返回的 权限组列表
import { useGetTable } from "./useGetTable";

// 获取 权限组-添加 中的 权限组列表项
import { useTableColums } from "./useTableColums";

// 获取 权限组-添加 中的 权限组选中方法
import { useGetTreeChecked } from "./useGetTreeChecked";

export default {
  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数
    const { rolePermissionTable } = useTableColums();

    const { getRolePermissions } = useGetTable(rolePermissionTable);

    const { checkedData, getCheckedChild } = useGetTreeChecked();
    //#endregion

    //在Mounted 获取列表
    onMounted(() => {
      getRolePermissions();
    });

    //返回参数
    return {
      //权限组 表格项
      rolePermissionTable,
      //权限组 复选框选中项对象
      checkedData,
      //递归实现 对子数据选中方法
      getCheckedChild
    };
  }
};
</script>

<style></style>
