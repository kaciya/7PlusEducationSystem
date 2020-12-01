<template>
  <a-layout-sider
    id="side-bar"
    theme="light"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <!-- logo标题 -->
    <div class="logo">
      <img src="../../assets/images/sideBar/logo.svg" alt="" />
      <span class="title">柒加教育</span>
    </div>
    <!-- 菜单栏 -->
    <a-menu :inlineIndent="30" theme="light" mode="inline">
      <!-- 首页 -->
      <a-menu-item class="menu-pri menu-home" :key="sideBarKeys[0]">
        <router-link to="/home" class="menu-link home-link">
          <HomeOutlined />
          <span class="home-text">首页</span>
        </router-link>
      </a-menu-item>
      <!-- 其他menu -->
      <a-sub-menu class="menu-pri" v-for="item in sideBarList" :key="item.id">
        <template #title v-if="item.path == 'users'">
          <span>
            <UserOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>
        <template #title v-else>
          <span>
            <UserOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>
        <a-menu-item
          class="menu-sec"
          v-for="subitem in item.children"
          :key="subitem.id"
        >
          <router-link :to="'/' + subitem.path" class="menu-link">
            <span>{{ subitem.authName }}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
// 导入侧边栏方法
import { useGetSideBar } from "../SideBar/useGetSideBar";
// 导入共享collapsed方法
import { useSetCollapsed } from "../Header/useSetCollapsed";
// 导入图标icons
import { HomeOutlined, UserOutlined } from "@ant-design/icons-vue";
export default {
  // 导入组件
  components: {
    HomeOutlined,
    UserOutlined
  },
  // setup响应api入口
  setup() {
    // 获取侧边栏数据
    let { sideBarList, sideBarKeys } = useGetSideBar();
    // 侧边栏伸缩状态
    let { collapsed } = useSetCollapsed();
    // 返回
    return {
      // 侧边栏列表
      sideBarList,
      // 侧边栏keys
      sideBarKeys,
      // 侧边栏伸缩状态
      collapsed
    };
  }
};
</script>

<style lang="scss" scoped>
#side-bar {
  border-right: 1px solid transparent;
  overflow-y: auto;

  /*滚动条样式*/
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(255, 255, 255, 0.9);
  }

  // logo
  .logo {
    height: 68px;
    background-color: #333;
    overflow: hidden;

    img {
      width: 40px;
      height: 40px;
      margin-left: 18px;
      margin-top: 14px;
    }

    .title {
      color: #ccc;
      font-size: 18px;
      font-weight: 700;
      line-height: 68px;
      padding-left: 12px;
      vertical-align: top;
    }
  }

  // menu
  .menu-pri {
    color: #888;
    background-color: rgba(0, 0, 0, 0.025);
  }

  .menu-sec {
    height: 51px;
    line-height: 51px;

    a {
      color: #333;
    }
  }

  .menu-home {
    height: 51px;
    line-height: 51px;
    margin-top: 0px !important;
  }

  .home-link {
    color: #888;
    display: inline-block;
  }

  .ant-menu-item {
    & > a:hover {
      color: #1890ff;
    }
  }
  .ant-menu-submenu-selected {
    color: #1890ff;
  }
  .ant-menu-item-selected {
    & > a {
      color: #1890ff;
    }
  }
}
</style>
<style scoped>
/* 样式穿透 */
#side-bar /deep/ .ant-menu-vertical-left .ant-menu-item,
#side-bar /deep/ .ant-menu-vertical-right .ant-menu-item,
#side-bar /deep/ .ant-menu-inline .ant-menu-item,
#side-bar /deep/ .ant-menu-vertical .ant-menu-submenu-title,
#side-bar /deep/ .ant-menu-vertical-left .ant-menu-submenu-title,
#side-bar /deep/ .ant-menu-vertical-right .ant-menu-submenu-title,
#side-bar /deep/ .ant-menu-inline .ant-menu-submenu-title {
  height: 51px;
  line-height: 51px;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid #f2f2f2;
}

#side-bar /deep/ .ant-menu-vertical .ant-menu-item:not(:last-child),
#side-bar /deep/ .ant-menu-vertical-left .ant-menu-item:not(:last-child),
#side-bar /deep/ .ant-menu-vertical-right .ant-menu-item:not(:last-child),
#side-bar /deep/ .ant-menu-inline .ant-menu-item:not(:last-child) {
  margin-bottom: 0px;
  border-bottom: 1px solid #f2f2f2;
}
</style>
