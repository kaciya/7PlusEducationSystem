<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '权限管理' },
        { name: '权限组', route: '/sys/role' },
        { name: '添加' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '93%'
      }"
    >
     
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入 SysRoleAdd 中的方法
import {} from "./useRoleAdd";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
      
  }
};
</script>

<style lang="scss" scoped></style>