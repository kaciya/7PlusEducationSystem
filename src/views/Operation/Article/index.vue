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
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 数据列表 start -->
      <a-table
      :columns="ArticlList.column"
      :data-source="ArticlList.data"
      :row-key="record => record.id"
      bordered
      >
        <template #cover="{ record }">
          <span v-if="record.picUrl === '' ">
            <p>没有图片</p>
          </span>
          <span v-else>
            <img :src="record.picUrl" style="width:100px;heigth:100px">
          </span>
        </template>
        <template #state="{ record }">
          <a-switch :checked="Boolean(record.state)" @click="stateClick(record)"/>
        </template>
        <template #operational>

        </template>
      </a-table>
      <!-- 数据列表 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入列表格式
import { column } from "./useArticleColumn";
// 引入获取数据方法
import { getArticleList } from "./useArticleGetList";
// 引入设置文章状态
import { setArticleState } from "./useArticleState";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取数据列表方法
    const { ArticlList,getArticl } = getArticleList();
    // 设置表格列
    ArticlList.column = column;
    // 获取数据
    getArticl();
    //#endregion

    //#region 设置文章状态
    const { stateClick } = setArticleState(getArticl);
    // 开关点击回调函数
    
    //#endregion

    return {
      //#region 获取列表数据方法
      ArticlList,
      //#endregion

      //#region 设置文章状态
      stateClick
      //#endregion
    }
  }
};
</script>

<style lang="scss" scoped></style>
