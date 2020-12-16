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
      <router-view class="router-view" />
      <!-- 主体 end -->
    </a-layout>
    <!-- 展示栏 end -->
  </a-layout>
</template>

<script>
// 导入侧边栏组件
import SideBar from "@/components/SideBar";
// 导入顶部栏组件
import Header from "@/components/Header";

export default {
  components: {
    SideBar, //侧边栏
    Header //顶部栏
  },
  setup() {}
};
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}

.router-view {
  padding: 0 10px;
}
</style>
