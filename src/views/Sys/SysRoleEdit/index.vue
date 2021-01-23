<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '权限管理' },
        { name: '权限组', route: '/sys/role/' + new Date().getTime() },
        { name: '编辑' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px;">
      <!-- 基本信息 -->
      <a-card title="基本信息">
        <!-- 添加表单 -->
        <a-form
          :model="editRoleForm"
          :rules="editRoleRules"
          ref="editRoleFormRef"
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
                  v-model:value="editRoleForm.roleName"
                  placeholder="运营"
                  size="large"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" :offset="15">
              <a-button
                type="primary"
                class="header-btn"
                @click="editRoleConfirm"
                v-has="'role:edit'"
              >
                提交
              </a-button>
            </a-col>
          </a-row>
        </a-form>
        <!-- 添加表单 end -->
      </a-card>
      <!-- 基本信息 end -->
      <!-- 权限设置 -->
      <a-card title="权限设置">
        <RoleTreeTable
          :getTreeChecked="getTreeChecked"
          :getRoleId="roleId"
          @getDefKeys="getDefKeys"
        />
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

// 引入 钩子函数
import { onMounted } from "vue";

// 获取 权限组-编辑 中的 方法
import { useEditRole } from "./useEditRole";

export default {
  // 使用组件
  components: {
    Crumbs,
    RoleTreeTable
  },
  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数

    /**
     * getTreeData 判断是否获取选中的权限ID
     * editRoleRules 编辑表单校验规则
     * editRoleForm 表单数据模型对象
     * editRoleConfirm 提交表单事件
     * editRoleFormRef 定义表单
     * getDefKeys 获取子组件传入的值
     */
    const {
      getTreeChecked,
      editRoleRules,
      editRoleForm,
      editRoleConfirm,
      editRoleFormRef,
      getRolesDetail,
      getDefKeys,
      roleId
    } = useEditRole();
    //#endregion

    //在Mounted 获取回显信息
    onMounted(() => {
      getRolesDetail();
    });

    //#region 返回参数
    return {
      //编辑项id
      roleId,
      //判断是否获取选中的权限ID
      getTreeChecked,
      //编辑表单校验规则
      editRoleRules,
      //表单数据模型对象
      editRoleForm,
      //定义表单
      editRoleFormRef,
      //提交事件
      editRoleConfirm,
      //获取子组件传入的值方法
      getDefKeys
    };
    //#endregion
  }
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
