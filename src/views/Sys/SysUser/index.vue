<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '账号管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 权限管理列表上标题 -->
      <a-row>
        <a-col :span="2">
          <h3 style="font-weight: 600">账号列表</h3>
        </a-col>
        <a-col :span="2" offset="20">
          <a-button type="primary" @click="showAddModal">
            添加账号
          </a-button>
        </a-col>
      </a-row>
      <!-- 权限管理列表上标题 end -->

      <!-- 添加账号 模态框表单 -->
      <a-modal
        title="添加账号"
        v-model:visible="addUserVisible"
        :confirm-loading="confirmLoading"
        :maskClosable="false"
      >
        <!-- 自定义 页脚 -->
        <template #footer>
          <span style="float:left; margin-top:5px;color:#c5c5c5;"
            >创建子账号时默认密码为：QJ123.</span
          >
          <a-button key="back" @click="handleAddCancel"> 取消 </a-button>
          <a-button
            key="submit"
            type="primary"
            @click="handleAddOk(getSysUserList)"
          >
            确定
          </a-button>
        </template>
        <!-- 自定义 页脚end -->

        <!-- 添加账号表单 -->
        <a-form
          v-model:model="sysUserForm"
          :rules="sysUserRules"
          ref="addUserFormRef"
        >
          <a-form-item
            label="操作员名称"
            required
            name="realName"
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
            :wrapper-col="{ span: 24 }"
            name="roleIds"
          >
            <a-select
              placeholder="请选择权限组"
              v-model:value="sysUserForm.roleIds"
              size="large"
            >
              <a-select-option
                v-for="item in RolesPermissionsList.data"
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
      <!-- 权限管理内容 -->
      <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <!-- 账号列表 -->
        <a-table
          :rowKey="record => record.userId"
          :columns="sysUsersTable.sysUsersColums"
          :data-source="sysUsersTable.sysUsersData"
          :pagination="false"
          bordered
        >
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <template #status="{ record }">
            <a-switch
              :checked="record.status == 1 ? true : false"
              @click="statusChange(record.userId)"
            />
          </template>
          <template #operation="{ record }">
            <!-- 密码重置 -->
            <a-button
              type="primary"
              style="margin: 0 5px"
              @click="handleResetPwd(record.userId)"
            >
              密码重置
            </a-button>
            <!-- 密码重置 end -->
            <!-- 删除按钮 -->
            <a-button
              type="danger"
              style="margin: 0 5px"
              @click="showDelConfirm(record.userId)"
            >
              删除
            </a-button>
            <!-- 删除按钮 end -->
          </template>
        </a-table>
        <!-- 账号列表 end -->
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
      <!-- 权限管理内容 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入sysUserList中返回的方法
import { showSysUserList } from "./useSysUserList";

//导入sysUserDel中返回的方法
import { removeSysUser } from "./useSysUserDel";

//导入sysUserStatusEdit中返回的方法
import { updateUserStatus } from "./useSysUserStatusEdit";

//导入sysUserResetPwd中返回的方法
import { sysUserResetPwd } from "./useSysUserResetPwd";

//导入sysUserAdd中返回的方法
import { addSysUser, sysUserRules, getUserPermissions } from "./useSysUserAdd";

//导入sysuserColums中返回的列表
import { useSysuserColums } from "./useSysUserColums";

// 引入 钩子函数
import { onMounted } from "vue";

export default {
  components: {
    Crumbs
  },

  setup() {
    //通过sysUserColums方法获取列表
    let { sysUsersTable } = useSysuserColums();

    //通过sysUserList方法获取
    let {
      getSysUserList,
      pageInfo,
      pageChange,
      pageSizeChange
    } = showSysUserList(sysUsersTable);

    //通过updateUserStatus方法更改账号启用状态
    let { statusChange } = updateUserStatus(getSysUserList);

    //通过removeSysUser方法获取显示删除模态框方法
    let { showDelConfirm } = removeSysUser(getSysUserList);

    //通过UserPermissions获取权限组列表
    let { getPermissions, RolesPermissionsList } = getUserPermissions();

    //通过sysUserResetPwd获取重置密码方法
    let { handleResetPwd } = sysUserResetPwd();

    //通过addSysUser方法获取数据
    let {
      addUserVisible,
      confirmLoading,
      sysUserForm,
      showAddModal,
      handleAddOk,
      handleAddCancel,
      addUserFormRef
    } = addSysUser(getSysUserList);

    //在Mounted 获取列表
    onMounted(() => {
      getSysUserList();
      getPermissions();
      handleResetPwd(1);
    });

    //返回
    return {
      //账号列表 表格数据
      sysUsersTable,
      //分页数据对象
      pageInfo,
      //账号添加表单数据模型对象
      sysUserForm,
      //权限列表
      RolesPermissionsList,
      //添加表单
      addUserFormRef,
      //账号添加表单校验规则
      sysUserRules,
      //渲染表格
      getSysUserList,
      //点击下一页方法
      pageChange,
      //每页显示多少条数据的方法
      pageSizeChange,
      //显示删除模态框方法
      showDelConfirm,
      //改变启用状态方法
      statusChange,
      //显示添加账号模态框
      addUserVisible,
      //模态框确认时加载
      confirmLoading,
      //显示添加账号模态框
      showAddModal,
      //添加账号确定回调
      handleAddOk,
      //添加账号取消时回调
      handleAddCancel,
      //重置账号密码回调
      handleResetPwd
    };
  }
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}
</style>
