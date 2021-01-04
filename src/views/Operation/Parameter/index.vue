<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '参数管理'}
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="数据列表">
          <DataList> </DataList>
        </a-tab-pane>
        <a-tab-pane key="2" tab="广告位-PC" force-render>广告位-PC</a-tab-pane>
        <a-tab-pane key="3" tab="更多服务-移动端">更多服务-移动端</a-tab-pane>
        <a-tab-pane key="4" tab="广告位-移动端">广告位-移动端</a-tab-pane>
        <a-tab-pane key="5" tab="课程图-学习中心">课程图-学习中心</a-tab-pane>
        <a-tab-pane key="6" tab="联系管理-官网">联系管理-官网</a-tab-pane>
        <a-tab-pane key="7" tab="轮播图-官网">轮播图-官网</a-tab-pane>
        <a-tab-pane key="8" tab="学员海报-官网">学员海报-官网</a-tab-pane>
      </a-tabs>
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入数据列表组件
import DataList from "@/components/Operation/Param/Data"


export default {
  // 使用组件
  components: {
    Crumbs,
    DataList
  },
  // setup响应api入口
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
