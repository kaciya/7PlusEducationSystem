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
        <a-avatar
          size="small"
          src="https://img2.woyaogexing.com/2020/12/09/cbfae31998fb4c50ae3981274a7551d8!400x400.jpeg"
        >
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <span class="user-name">Admin</span>
      </div>
      <!-- 下拉menu -->
      <template #overlay>
        <a-menu theme="dark" @click="dropdownClick" style="text-align: center">
          <a-menu-item key="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
// 导入共享collapsed方法
import { useSetCollapsed } from "./useSetCollapsed";
// 导入退出登录功能
import { useLogout } from "./useLogout";
// 导入用户信息
import { useGetUserInfo } from "./useGetUserInfo";
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
    const { handleLogout } = useLogout();
    // 用户信息
    const { userInfos } = useGetUserInfo();

    //#region 下拉菜单
    function dropdownClick({ key }) {
      if (key == "logout") {
        handleLogout();
      }
    }
    //#endregion

    // 返回
    return {
      collapsed, //侧边栏状态
      setCollapsed, //操作侧边栏状态
      dropdownClick, //下拉菜单点击
      handleLogout //退出登录
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
