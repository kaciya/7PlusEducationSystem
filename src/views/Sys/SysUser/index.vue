<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '账号管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px;">
      <!-- 权限管理card -->
      <a-card title="账号列表">
        <!-- 权限组card 右侧内容 -->
        <template #extra>
          <a-button
            type="primary"
            @click="showAddModal"
            v-has="'sys:user:edit'"
          >
            添加账号
          </a-button>
        </template>
        <!-- 权限组card 右侧内容 end -->

        <!-- 添加账号 模态框表单 -->
        <a-modal
          title="添加账号"
          v-model:visible="addUserVisible"
          :maskClosable="false"
        >
          <!-- 自定义 页脚 -->
          <template #footer>
            <span style="float: left; margin-top: 5px; color: #c5c5c5"
              >创建子账号时默认密码为：QJ123.</span
            >
            <a-button key="back" @click="addUserCancel"> 取消 </a-button>
            <a-button
              key="submit"
              type="primary"
              @click="addUserConfirm(getSysUserList)"
            >
              确定
            </a-button>
          </template>
          <!-- 自定义 页脚end -->

          <!-- 添加账号表单 -->
          <a-form
            :model="sysUserForm"
            :rules="sysUserRules"
            ref="addUserFormRef"
          >
            <a-form-item
              label="操作员名称"
              required
              name="realName"
              :hasFeedback="true"
              :wrapper-col="{ span: 24 }"
            >
              <a-input
                v-model:value="sysUserForm.realName"
                placeholder="请填写操作员名称"
                size="large"
              />
            </a-form-item>
            <a-form-item
              label="账号"
              required
              name="username"
              :hasFeedback="true"
              :wrapper-col="{ span: 24 }"
            >
              <a-input
                v-model:value="sysUserForm.username"
                placeholder="请填写登录账号"
                size="large"
              />
            </a-form-item>
            <a-form-item
              label="权限组"
              name="roleIds"
              :wrapper-col="{ span: 24 }"
            >
              <a-select
                placeholder="请选择权限组"
                v-model:value="sysUserForm.roleIds"
                size="large"
              >
                <a-select-option
                  v-for="item in rolesPermissionsList.data"
                  :key="item.roleId"
                  :value="item.roleId"
                >
                  {{ item.roleName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
          <!-- 添加账号表单 end -->
        </a-modal>
        <!-- 添加账号 模态框表单 end -->
        <!-- 账号列表 -->
        <a-table
          bordered
          :columns="sysUsersTable.colums"
          :data-source="sysUsersTable.data"
          row-Key="userId"
          :loading="isLoading"
          :pagination="false"
        >
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <template #status="{ record }">
            <a-switch
              :checked="record.status == 1 ? true : false"
              @click="changeStatus(record.userId)"
            />
          </template>
          <template #operation="{ record }">
            <!-- 密码重置 -->
            <a-button
              type="primary"
              size="small"
              class="operation-btn modify-btn"
              @click="resetUserPwd(record.userId)"
            >
              密码重置
            </a-button>
            <!-- 密码重置 end -->
            <!-- 删除按钮 -->
            <a-popconfirm @confirm="showDelConfirm(record.userId)">
              <template #title>
                <p class="popconfirm-text-top">确定删除该操作员?</p>
                <p class="popconfirm-text-bottom">删除后无法恢复数据</p>
              </template>
              <a-button
                type="danger"
                size="small"
                class="operation-btn"
                v-has="'sys:user:delete'"
              >
                删除
              </a-button>
            </a-popconfirm>
            <!-- 删除按钮 end -->
          </template>
        </a-table>
        <!-- 账号列表 end -->
      </a-card>
      <!-- 权限管理card end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

// 引入 钩子函数
import { onMounted } from "vue";

//引入储存库
import { useStore } from "vuex";

// 获取 账号管理 后台请求的 列表数据
import { useGetUserList } from "./useGetUserList";

// 获取 账号管理 删除账号方法
import { useDelUser } from "./useDelUser";

// 获取 账号管理 删除账号方法
import { useEditUserStatus } from "./useEditUserStatus";

// 获取 账号管理 重置账号方法
import { useResetUserPwd } from "./useResetUserPwd";

// 获取 账号管理 添加账号方法
import { useAddUser } from "./useAddUser";

// 获取 账号管理 列表项
import { useUserColums } from "./useUserColums";

// 获取 账号管理 权限组列表
import { useGetUserPermissions } from "./useGetUserPermissions";

export default {
  components: {
    Crumbs
  },

  // setup响应api入口
  setup() {
    //设置储存库
    const store = useStore();

    //#region 获取 导入方法中返回的 子方法和参数
    /**
     * sysUsersTable 账号列表 表格数据
     */
    const { sysUsersTable } = useUserColums();

    /**
     * isLoading 加载状态
     * getUserList 渲染表格
     * userPagination 分页参数
     * pageChange 点击下一页方法
     */
    const { isLoading, getUserList, userInfos } = useGetUserList(
      sysUsersTable,
      store
    );

    /**
     * changeStatus 改变启用状态方法
     */
    const { changeStatus } = useEditUserStatus(getUserList);

    /**
     * showDelConfirm 显示删除模态框方法
     */
    const { showDelConfirm } = useDelUser(getUserList);

    /**
     * resetUserPwd 重置账号密码回调
     */
    const { resetUserPwd } = useResetUserPwd();

    /**
     * sysUserRules 账号添加表单校验规则
     * addUserVisible 显示添加账号模态框
     * sysUserForm 账号添加表单数据模型对象
     * showAddModal 显示添加账号模态框
     * addUserConfirm 添加账号确定回调
     * addUserCancel 添加账号取消时回调
     * addUserFormRef 添加表单
     */
    const {
      sysUserRules,
      addUserVisible,
      sysUserForm,
      showAddModal,
      addUserConfirm,
      addUserCancel,
      addUserFormRef
    } = useAddUser(getUserList);

    /**
     * rolesPermissionsList 权限列表
     * getPermissions 渲染权限列表
     */
    const { rolesPermissionsList, getPermissions } = useGetUserPermissions();

    //#endregion

    //在Mounted 获取列表
    onMounted(() => {
      getUserList();
      getPermissions();
      resetUserPwd(userInfos.value.userId);
    });

    //#region 返回参数
    return {
      //账号列表 表格数据
      sysUsersTable,
      //账号添加表单数据模型对象
      sysUserForm,
      //权限列表
      rolesPermissionsList,
      //加载状态
      isLoading,
      //添加表单
      addUserFormRef,
      //账号添加表单校验规则
      sysUserRules,
      //渲染表格
      getUserList,
      //显示删除模态框方法
      showDelConfirm,
      //改变启用状态方法
      changeStatus,
      //显示添加账号模态框
      addUserVisible,
      //显示添加账号模态框
      showAddModal,
      //添加账号确定回调
      addUserConfirm,
      //添加账号取消时回调
      addUserCancel,
      //重置账号密码回调
      resetUserPwd
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

.popconfirm-text-top {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
}

.popconfirm-text-bottom {
  font-size: 13px;
  color: #999999;
  margin-bottom: 5px;
}
</style>
