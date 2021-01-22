<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '运营管理' }, { name: '校区管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="柒加教育">
          <Introduce></Introduce>
        </a-tab-pane>
        <a-tab-pane key="2" tab="数据列表" force-render>
          <CampusTable></CampusTable>
        </a-tab-pane>
        <a-tab-pane key="3" tab="校区风采" force-render>
          <CampStyle></CampStyle>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <!-- 主题Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入校区介绍组件
import Introduce from "@/components/Operation/Campus/Introduce";
// 引入校区列表组件
import CampusTable from "@/components/Operation/Campus/CampuTable";
// 引入校区风采组件
import CampStyle from "@/components/Operation/Campus/CampStyle";

export default {
  // 使用组件
  components: {
    Crumbs,
    Introduce,
    CampusTable,
    CampStyle
  },
  setup() {}
};
</script>

<style lang="scss" scoped></style>
