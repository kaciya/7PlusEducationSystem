<template>
  <a-layout class="home-page">
    <!-- 侧边栏 start -->
    <SideBar />
    <!-- 侧边栏 end -->
    <!-- 展示栏 start -->
    <a-layout>
      <!-- 顶部栏 start -->
      <Header />
      <!-- 顶部栏 end -->
      <!-- 主体 start -->
      <router-view v-slot="{ Component }" style="padding: 0 10px">
        <!-- 动态缓存页面 -->
        <keep-alive>
          <component
            :is="Component"
            :key="$route.path"
            v-if="$route.meta.keepAlive"
          />
        </keep-alive>
        <!-- 非缓存页面 -->
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
      <!-- 主体 end -->
    </a-layout>
    <!-- 展示栏 end -->
  </a-layout>
</template>

<script>
// 导入侧边栏组件
import SideBar from "@/layouts/SideBar";
// 导入顶部栏组件
import Header from "@/layouts/Header";

export default {
  components: {
    SideBar, //侧边栏
    Header //顶部栏
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}
</style>
