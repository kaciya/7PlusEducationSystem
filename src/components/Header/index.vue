<template>
  <a-layout-header id="header" style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="setCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="setCollapsed" />
    <!-- 退出按钮 -->
    <a-button
      class="logout-btn"
      @click="handleLogout"
      style="float: right; margin: 16px 24px"
    >
      退出
    </a-button>
    <!-- 用户账户 -->
    <div id="user">
      <UserOutlined />
      <span class="user-name">Admin</span>
    </div>
  </a-layout-header>
</template>

<script>
// 引入响应api
import { ref } from "vue";
// 导入共享collapsed方法
import { useSetCollapsed } from "./useSetCollapsed";
// 导入退出登录功能
import { useLogout } from "./useLogout";
// 引入图标icons
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
export default {
  // 导入组件
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
  },
  // setup响应api入口
  setup() {
    // 侧边栏状态
    let { collapsed, setCollapsed } = useSetCollapsed();
    // 退出登录
    let { handleLogout, spinning } = useLogout();

    // 返回
    return {
      collapsed, //侧边栏状态
      setCollapsed, //操作侧边栏状态
      handleLogout, //退出登录
    };
  },
};
</script>

<style lang="scss" scoped>
#header {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  #user {
    float: right;
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s;

    .user-name {
      font-size: 16px;
      padding-left: 8px;
      vertical-align: middle;
      position: relative;
      top: 1px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>