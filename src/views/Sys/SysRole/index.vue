<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '权限组' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px;">
      <!-- 权限组card -->
      <a-card title="标签列表">
        <!-- 权限组card 右侧内容 -->
        <template #extra>
          <a-button type="primary" @click="addRouter">
            添加
          </a-button>
        </template>
        <!-- 权限组card 右侧内容 end -->
        <!-- 标签列表 -->
        <a-table
          bordered
          :columns="rolesTable.colums"
          :data-source="rolesTable.data"
          row-Key="roleId"
          :loading="isLoading"
          :pagination="false"
        >
          <!-- 配置 # index 索引 -->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <!-- 配置 # index索引 end-->

          <!-- 配置 status 用户状态 -->
          <template #status="{ record }">
            <div>
              <a-switch
                :checked="record.status == 1 ? true : false"
                @click="statusChange(record.roleId)"
              />
            </div>
          </template>
          <!-- 配置 用户状态 end -->

          <!-- 配置 operation 操作 -->
          <template #operation="{ record }">
            <a-button
              type="primary"
              size="small"
              class="operation-btn modify-btn"
              @click="editRouter(record.roleId)"
            >
              编辑
            </a-button>
            <a-popconfirm
              title="确定删除此权限组?"
              @confirm="showDelConfirm(record.roleId)"
            >
              <a-button
                type="danger"
                size="small"
                class="operation-btn"
                v-has="'role:delete'"
              >
                删除
              </a-button>
            </a-popconfirm>
          </template>
          <!-- 配置 operation 操作 end -->
        </a-table>
        <!-- 标签列表 end -->
      </a-card>
      <!-- 权限组card end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

// 引入 钩子函数
import { onMounted } from "vue";

// 获取 权限组 后台请求的 列表数据
import { useGetRolesList } from "./useGetRolesList";

// 获取 权限组 删除方法
import { useDelRoles } from "./useDelRoles";

// 获取 权限组 状态更改方法
import { useEditRoleStatus } from "./useEditRoleStatus";

// 获取 权限组 列表项
import { useRolesColums } from "./useRolesColums";

export default {
  // 组件
  components: {
    Crumbs
  },

  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数
    /**
     * rolesTable 权限组列表
     */
    const { rolesTable } = useRolesColums();

    /**
     * rolePagination 分页参数
     * getRolesData 渲染权限组列表方法
     * pageChange 点击下一页方法
     * addRouter 权限组添加路由跳转
     * editRouter 权限组编辑路由跳转
     * isLoading 加载状态
     */
    const {
      rolePagination,
      getRolesData,
      pageChange,
      addRouter,
      editRouter,
      isLoading
    } = useGetRolesList(rolesTable);

    /**
     * showDelConfirm 显示删除模态框方法
     */
    const { showDelConfirm } = useDelRoles(getRolesData);

    /**
     * statusChange 更改用户状态方法
     */
    const { statusChange } = useEditRoleStatus(getRolesData);
    //#endregion

    //在Mounted 获取列表
    onMounted(() => {
      getRolesData();
    });

    //#region 返回参数
    return {
      //权限组列表
      rolesTable,
      //渲染权限组列表方法
      getRolesData,
      //显示删除模态框方法
      showDelConfirm,
      //更改用户状态方法
      statusChange,
      //权限组添加路由跳转
      addRouter,
      //权限组编辑路由跳转
      editRouter,
      //加载状态
      isLoading
    };
    //#endregion
  }
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}

.operation-btn {
  margin: 0 5px;
}
</style>
