<template>
  <a-layout-header class="header" style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="setCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="setCollapsed" />
    <!-- 用户info -->
    <a-dropdown>
      <!-- 用户账户 -->
      <div class="user">
        <a-avatar size="small" :src="userInfos.avatar">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <span class="user-name">{{ userInfos.username }}</span>
      </div>
      <!-- 下拉menu -->
      <template #overlay>
        <a-menu theme="dark" @click="dropdownClick" style="text-align: center">
          <a-menu-item key="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 初始登录-修改密码-模态框 -->
    <a-modal
      title="修改初始密码"
      :maskClosable="false"
      :closable="false"
      :cancelButtonProps="{ disabled: true }"
      :visible="editPwdForm.visible"
      :confirm-loading="editPwdForm.loading"
      @ok="editPwdSubmit"
    >
      <!-- 修改密码-表单 start -->
      <a-form
        v-bind="editPwdForm.layout"
        :model="editPwdForm.model"
        :rules="editPwdForm.rules"
        ref="editPwdRef"
      >
        <a-form-item has-feedback label="旧密码" name="oldPwd">
          <a-input
            autocomplete="off"
            v-model:value="editPwdForm.model.oldPwd"
          />
        </a-form-item>
        <a-form-item has-feedback label="新密码" name="newPwd">
          <a-input
            type="password"
            autocomplete="off"
            v-model:value="editPwdForm.model.newPwd"
          />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPwd">
          <a-input
            type="password"
            autocomplete="off"
            v-model:value="editPwdForm.model.checkPwd"
            @keyup.enter="editPwdSubmit"
          />
        </a-form-item>
      </a-form>
      <!-- 修改密码-表单 end -->
    </a-modal>
  </a-layout-header>
</template>

<script>
// 导入共享collapsed方法
import { useSetCollapsed } from "./useSetCollapsed";
// 导入退出登录功能
import { useLogout } from "./useLogout";
// 导入用户信息
import { useGetUserInfo } from "./useGetUserInfo";
// 导入修改密码表单
import { useEditPwdForm } from "./useEditPwdForm";
// 导入修改密码表单提交
import { useEditPwdSubmit } from "./useEditPwdSubmit";
// 引入图标icons
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
export default {
  // 导入组件
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  },
  // setup响应api入口
  setup() {
    // 侧边栏状态
    const { collapsed, setCollapsed } = useSetCollapsed();
    // 退出登录
    const { handleLogout, dropdownClick, backLogin } = useLogout();
    // 用户信息
    const { userInfos } = useGetUserInfo();
    // 修改密码表单
    const { editPwdForm, editPwdRef } = useEditPwdForm();
    // 修改密码表单提交
    const { editPwdSubmit } = useEditPwdSubmit(
      editPwdForm,
      editPwdRef,
      backLogin
    );

    // 返回
    return {
      collapsed, //侧边栏状态
      setCollapsed, //操作侧边栏状态
      dropdownClick, //下拉菜单点击
      handleLogout, //退出登录
      userInfos, //用户信息
      editPwdForm, //修改密码表单
      editPwdRef, //修改密码Ref
      editPwdSubmit //修改密码提交
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
      // background-color: rgba(0, 0, 0, 0.025);
    }
  }

  .user {
    float: right;
    padding: 0 14px;
    margin-right: 30px;
    cursor: pointer;
    transition: backgroundColor 0.3s;

    .user-name {
      font-size: 16px;
      padding-left: 8px;
      vertical-align: middle;
      position: relative;
      top: 2px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
