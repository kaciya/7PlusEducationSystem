<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '权限组' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 权限组列表上标题 -->
      <a-row>
        <a-col :span="2">
          <h3 style="font-weight: 600">标签列表</h3>
        </a-col>
        <a-col :span="1" offset="20">
          <a-button type="primary" @click="handleAddRouter"> 添加 </a-button>
        </a-col>
      </a-row>
      <!-- 权限组列表上标题 end -->

      <!-- 权限组内容 -->
      <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <!-- 标签列表 -->
        <a-table
          :rowKey="(record) => record.roleId"
          :columns="rolesTable.rolesColums"
          :data-source="rolesTable.rolesData"
          :pagination="false"
          bordered
        >
          <!-- 配置 # index 索引 -->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <!-- 配置 # index索引 end-->

          <!-- 配置 status 用户状态 -->
          <template #status="{ record }">
            <div>
              <a-switch :checked="record.status == 1 ? true : false" @click="statusChange(record.roleId)"/>
            </div>
          </template>
          <!-- 配置 用户状态 end -->

          <!-- 配置 operation 操作 -->
          <template #operation="{ record }">
            <a-button type="primary" style="margin: 0 5px" @click="handleEditRouter(record.roleId)">
              编辑
            </a-button>
            <a-button type="danger" style="margin: 0 5px" @click="showDelConfirm(record.roleId)"
              >删除
            </a-button>
          </template>
          <!-- 配置 operation 操作 end -->
        </a-table>
        <!-- 标签列表 end -->
        <!-- 分页 -->
        <a-row>
          <a-col :span="24">
            <a-pagination
              show-size-changer
              v-model:current="pageInfo.pageNum"
              v-model:pageSize="pageInfo.pageSize"
              :page-size-options="pageInfo.pageSizeOptions"
              :defaultPageSize="10"
              :total="pageInfo.total"
              @change="pageChange"
              @showSizeChange="pageSizeChange"
              style="float: right; margin: 10px 0"
            />
          </a-col>
        </a-row>
        <!-- 分页 end -->
      </div>
      <!-- 权限组内容 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入图标组件
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

// 引入 钩子函数
import { onMounted } from "vue";

//导入rolesList中返回的数据
import { showRoleList } from "./useSysRolesList";

//导入rolesDel中返回的数据
import { removeSysRoles } from "./useSysRolesDel";

//导入rolesStatus中返回的数据
import { updateRoleStatus } from "./useSysRoleStatusEdit";

//导入useSysRolesColums中返回的列表数据
import { useSysRolesColums } from "./useSysRolesColums";

export default {
  // 组件
  components: {
    Crumbs,
  },

  setup() {
    //通过useSysRolesColums方法获取 列表数据
    let { rolesTable } = useSysRolesColums();

    //通过showRoleList方法 渲染列表和分页数据
    let {
      pageInfo,
      pageChange,
      getSysRolesData,
      pageSizeChange,
      handleAddRouter,
      handleEditRouter,
    } = showRoleList(rolesTable);

    //通过removeSysRoles获取删除模态框
    let { showDelConfirm } = removeSysRoles(getSysRolesData);

    //通过updateRoleStatus获取更改权限组启用状态方法
    let { statusChange } = updateRoleStatus(getSysRolesData);

    //在Mounted 获取列表
    onMounted(() => {
      getSysRolesData();
    });

    //返回参数
    return {
      //权限组列表
      rolesTable,
      //分页数据对象
      pageInfo,
      //渲染权限组列表方法
      getSysRolesData,
      //点击下一页方法
      pageChange,
      //每页显示多少条数据的方法
      pageSizeChange,
      //显示删除模态框方法
      showDelConfirm,
      //更改用户状态方法
      statusChange,
      //权限组添加路由跳转
      handleAddRouter,
      //权限组编辑路由跳转
      handleEditRouter,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-btn{
  width: auto;
}
</style>
