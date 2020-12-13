<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '关于PTE', route: '#' },
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
    <a-table
      :columns="aboutList.column"
      :data-source="aboutList.data"
    ></a-table>
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格列
import { column } from "./useAboutColumn";
// 引入获取数据方法
import { getAboutList } from "./useAboutGetList";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取数据方法
    const { aboutList,getAboutData } = getAboutList();
    // 设置表格列
    aboutList.column = column;
    getAboutData();
    //#endregion

    return {
      //#region 获取数据方法
      aboutList
      //#endregion
    }
  }
};
</script>

<style lang="scss" scoped></style>
