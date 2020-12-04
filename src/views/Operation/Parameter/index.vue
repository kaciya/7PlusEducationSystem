<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '参数管理', route: '/operation/param' },
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <a-tabs>
        <a-tab-pane key="1" tab="数据列表">数据列表</a-tab-pane>
        <a-tab-pane key="2" tab="广告位-PC" force-render>广告位-PC</a-tab-pane>
        <a-tab-pane key="3" tab="更多服务-移动端">更多服务-移动端</a-tab-pane>
        <a-tab-pane key="4" tab="广告位-移动端">广告位-移动端</a-tab-pane>
        <a-tab-pane key="5" tab="课程图-学习中心">课程图-学习中心</a-tab-pane>
        <a-tab-pane key="6" tab="联系管理-官网">联系管理-官网</a-tab-pane>
        <a-tab-pane key="7" tab="轮播图-官网">轮播图-官网</a-tab-pane>
        <a-tab-pane key="8" tab="学员海报-官网">学员海报-官网</a-tab-pane>
      </a-tabs>
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入http
import { httpGet } from "@/utils/http";
// 引入api
import OM from "@/api/Operation/Parameter";
export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    const getAdList = () => {
      // 发起ajax请求
      httpGet(OM.adList)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };

    getAdList();

    return {};
  }
};
</script>

<style lang="scss" scoped></style>
