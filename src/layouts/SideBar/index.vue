<template>
  <a-layout-sider
    class="side-bar"
    theme="light"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <!-- logo标题 -->
    <div class="logo">
      <img src="@/assets/images/sideBar/logo.svg" alt="" />
      <span class="title">柒加教育</span>
    </div>
    <!-- 菜单栏 -->
    <a-menu
      :inlineIndent="30"
      theme="light"
      mode="inline"
      :open-keys="sideBarUnfoldKeys.openKeys"
      :selectedKeys="sideBarUnfoldKeys.selectKeys"
      @openChange="onOpenChange"
    >
      <!-- 首页 -->
      <a-menu-item class="menu-pri menu-home" :key="'/' + sideBarKeys[0]">
        <router-link to="/home/main" class="menu-link home-link">
          <HomeOutlined />
          <span class="home-text">首页</span>
        </router-link>
      </a-menu-item>
      <!-- 其他menu -->
      <a-sub-menu class="menu-pri" v-for="item in sideBarList" :key="item.path">
        <template #title v-if="item.path == 'user'">
          <span>
            <TeamOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>
        <template #title v-else-if="item.path == 'word'">
          <span>
            <ScheduleOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>
        <template #title v-else-if="item.path == 'question'">
          <span>
            <BarsOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <template #title v-else-if="item.path == 'topic'">
          <span>
            <CompassOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <template #title v-else-if="item.path == 'sub'">
          <span>
            <ContactsOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <template #title v-else-if="item.path == 'platform'">
          <span>
            <ControlOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <template #title v-else-if="item.path == 'operation'">
          <span>
            <InteractionOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <template #title v-else-if="item.path == 'sys'">
          <span>
            <ApartmentOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <template #title v-else>
          <span>
            <ScheduleOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>

        <a-menu-item
          class="menu-sec"
          :class="subitem.permission"
          v-for="subitem in item.children"
          :key="'/' + subitem.path"
        >
          <router-link :to="'/' + subitem.path" class="menu-link">
            <AppstoreOutlined /> <span>{{ subitem.authName }}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
// 导入获取侧边栏方法
import { useGetSideBar } from "./useGetSideBar";
// 导入设置侧边栏方法
import { useSetSideBar } from "./useSetSideBar";
// 导入共享collapsed方法
import { useSetCollapsed } from "../Header/useSetCollapsed";
// 导入图标icons
import {
  HomeOutlined,
  TeamOutlined,
  ScheduleOutlined,
  BarsOutlined,
  CompassOutlined,
  ContactsOutlined,
  ControlOutlined,
  InteractionOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
export default {
  // 导入组件
  components: {
    HomeOutlined,
    TeamOutlined,
    ScheduleOutlined,
    BarsOutlined,
    CompassOutlined,
    ContactsOutlined,
    ControlOutlined,
    InteractionOutlined,
    ApartmentOutlined,
    AppstoreOutlined,
  },
  // setup响应api入口
  setup() {
    // 获取侧边栏数据
    const { sideBarList, sideBarKeys } = useGetSideBar();
    // 侧边栏伸缩状态
    const { collapsed } = useSetCollapsed();
    // 设置侧边栏导航
    const { sideBarUnfoldKeys, onOpenChange } = useSetSideBar();

    // 返回
    return {
      // 侧边栏列表
      sideBarList,
      // 侧边栏keys
      sideBarKeys,
      // 侧边栏伸缩状态
      collapsed,
      // 侧边栏的展开keys
      sideBarUnfoldKeys,
      // 只展开当前父菜单栏
      onOpenChange
    };
  }
};
</script>

<style lang="scss" scoped>
.side-bar {
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.1s;

  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0;
  }

  /*滚动条样式*/
  &::-webkit-scrollbar {
    width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
    display: none;
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
  .ant-menu {
    transition: backgroundColor 0.3s, width 0.1s cubic-bezier(0.2, 0, 0, 1) 0s;
  }

  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
      margin 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .ant-menu-item .anticon + span,
  .ant-menu-submenu-title .anticon + span {
    transition: opacity 0.2s cubic-bezier(0.25, 0.8, 0.5, 1),
      width 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

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
.side-bar ::v-deep(.ant-menu-vertical-left .ant-menu-item),
.side-bar ::v-deep(.ant-menu-vertical-right .ant-menu-item),
.side-bar ::v-deep(.ant-menu-inline .ant-menu-item),
.side-bar ::v-deep(.ant-menu-vertical .ant-menu-submenu-title),
.side-bar ::v-deep(.ant-menu-vertical-left .ant-menu-submenu-title),
.side-bar ::v-deep(.ant-menu-vertical-right .ant-menu-submenu-title),
.side-bar ::v-deep(.ant-menu-inline .ant-menu-submenu-title) {
  height: 51px;
  line-height: 51px;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid #f2f2f2;
}

.side-bar ::v-deep(.ant-menu-vertical .ant-menu-item:not(:last-child)),
.side-bar ::v-deep(.ant-menu-vertical-left .ant-menu-item:not(:last-child)),
.side-bar ::v-deep(.ant-menu-vertical-right .ant-menu-item:not(:last-child)),
.side-bar ::v-deep(.ant-menu-inline .ant-menu-item:not(:last-child)) {
  margin-bottom: 0px;
  border-bottom: 1px solid #f2f2f2;
}
</style>
