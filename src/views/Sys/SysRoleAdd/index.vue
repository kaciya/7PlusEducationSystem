<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '权限管理' },
        { name: '权限组', route: '/sys/role' },
        { name: '添加' },
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 基本信息 -->
      <a-card title="基本信息">
        <!-- 添加表单 -->
        <a-form
          v-model:value="addRoleForm"
          :rules="addRoleRules"
          ref="addRoleFormRef"
        >
          <a-row>
            <a-col :span="6">
              <a-form-item
                label="权限组名称"
                required
                name="roleName"
                :hasFeedback="true"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-model:value="addRoleForm.roleName"
                  placeholder="运营"
                  size="large"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" :offset="15">
              <a-button class="header-btn"> 重置 </a-button>
              <a-button type="primary" class="header-btn"> 提交 </a-button>
            </a-col>
          </a-row>
        </a-form>
        <!-- 添加表单 end -->
      </a-card>
      <!-- 基本信息 end -->
      <!-- 权限设置 -->
      <a-card title="权限设置">
        <RoleTreeTable />
      </a-card>
      <!-- 权限设置 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

// 引入 树形列表 组件
import RoleTreeTable from "@/components/RoleTreeTable";

// 获取 权限组-添加 中的 添加方法
import { useAddRole } from "./useAddRole";

export default {
  // 使用组件
  components: {
    Crumbs,
    RoleTreeTable
  },

  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数
    const { addRoleRules, addRoleForm } = useAddRole();

    //#endregion

    //#region 返回参数
    return {
      //添加表单校验规则
      addRoleRules,
      //表单数据模型对象
      addRoleForm,
    };
    //#endregion
  },
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}

.header-btn {
  margin: 3px 10px;
  float: right;
}
</style>
