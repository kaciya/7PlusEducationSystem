<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '用户管理' },
        { name: '用户列表', route: '#' },
        { name: '详情' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      【使用说明】 我是每个页面主体内容的模板，使用方式如下:
      0.注意"我"是被a-card包裹的 1.直接ctrl+A,然后ctrl+C
      最后ctrl+V粘贴到自己页面当中 2.修改面包屑组件中传递的数据
      3.把这段【使用说明】删掉 4.书写自己页面对应的主体内容
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {}
};
</script>

<style lang="scss" scoped></style>
