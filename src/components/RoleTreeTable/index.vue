<template>
  <!-- 权限设置列表 -->
  <a-table
    :columns="rolePermissionTable.colums"
    :data-source="rolePermissionTable.data"
    row-key="permissionId"
    :loading="isLoading"
    :pagination="false"
  >
    <!-- 渲染权限类型 -->
    <template #permissionType="{ record }">
      <!-- 一级渲染 -->
      <a-checkbox
        v-model:checked="record.isChecked"
        :value="record.permissionId"
        :indeterminate="record.indeterminate"
        @change="getleafChecked($event, record)"
      >
        {{ record.name }}
      </a-checkbox>
      <!-- 一级渲染 end -->
    </template>
    <!-- 渲染权限类型 end -->

    <!-- 渲染权限名称 -->
    <template #permissionName="{ record }">
      <!-- 二/三级渲染 -->
      <a-row
        v-for="(childItem, index) in record.child"
        :class="[
          index != 0 ? 'tree' : '',
          childItem.length != 1 ? 'tree-centre' : '',
          index == record.child.length - 1 ? 'tree-bottom' : ''
        ]"
        :key="childItem.permissionId"
      >
        <!-- 二级渲染 -->
        <a-col :span="6">
          <a-checkbox
            v-model:checked="childItem.isChecked"
            :value="childItem.permissionId"
            :indeterminate="childItem.indeterminate"
            @change="getChildChecked($event, childItem)"
          >
            {{ childItem.name }}
          </a-checkbox>
        </a-col>
        <!-- 二级渲染 end -->
        <!-- 三级渲染 -->
        <a-col :span="18">
          <a-checkbox
            v-for="childsItem in childItem.child"
            :key="childsItem.permissionId"
            v-model:checked="childsItem.isChecked"
            :value="childsItem.permissionId"
            @change="getRootChecked($event, childsItem)"
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
import { onMounted, watch } from "vue";

// 获取 权限组-添加 中后台返回的 权限组列表
import { useGetTable } from "./useGetTable";

// 获取 权限组-添加 中的 权限组列表项
import { useTableColums } from "./useTableColums";

// 获取 权限组-添加 中的 权限组选中方法
import { useGetTreeChecked } from "./useGetTreeChecked";

export default {
  //获取父级组件传入的参数
  props: {
    getTreeChecked: Boolean,
    getRoleId: String
  },

  // setup响应api入口
  setup(props, context) {
    //#region 获取 导入方法中返回的 子方法和参数
    /**
     * rolePermissionTable 权限列表参数
     */
    const { rolePermissionTable } = useTableColums();

    /**
     * isLoading 加载状态
     * getRolePermissions 渲染权限列表
     */
    const { isLoading, getRolePermissions } = useGetTable(
      rolePermissionTable,
      props
    );

    /**
     * checkedData 选中的权限id
     * getleafChecked 获取叶子节点选中状态
     * getChildChecked 获取子节点选中状态
     * getRootChecked 获取根节点选中状态
     * getTreeCheckedKeys 获取最后所有选中的权限id
     */
    const {
      checkedData,
      getleafChecked,
      getChildChecked,
      getRootChecked,
      getTreeCheckedKeys
    } = useGetTreeChecked(rolePermissionTable);
    //#endregion

    //在Mounted 获取列表
    onMounted(() => {
      getRolePermissions();
    });

    //监听父组件的参数
    watch(
      () => props.getTreeChecked,
      () => {
        //判断父组件传入的布尔值是否为true
        if (props.getTreeChecked) {
          //如果为true则执行查询方法
          getTreeCheckedKeys(
            rolePermissionTable.data,
            checkedData.resultDefKeys
          );

          //将值传递给父组件
          context.emit("getDefKeys", checkedData.resultDefKeys);
        }
      }
    );

    //返回参数
    return {
      //权限组 表格项
      rolePermissionTable,
      //权限组 复选框选中项对象
      checkedData,
      //递归实现 对子节点选中方法
      getChildChecked,
      //递归实现 对叶子节点选中方法
      getleafChecked,
      //递归实现 对根节点选中方法
      getRootChecked,
      //递归实现 获取选中的复选框的值
      getTreeCheckedKeys,
      //加载状态
      isLoading
    };
  }
};
</script>

<style lang="scss" scoped>
// 树形列表样式
.tree {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.tree-centre {
  padding-bottom: 16px;
}

// 列表末尾项边距
.tree-bottom {
  padding-bottom: 0px;
}
</style>
