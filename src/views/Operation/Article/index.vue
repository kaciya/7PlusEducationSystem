<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '文章列表(官网)' }
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
        :columns="articlList.column"
        :data-source="articlList.data"
        :row-key="record => record.id"
        bordered
      >
        <template #cover="{ record }">
          <span v-if="record.picUrl === ''">
            <p>没有图片</p>
          </span>
          <span v-else>
            <img :src="record.picUrl" style="width:100px;heigth:100px" />
          </span>
        </template>
        <template #state="{ record }">
          <a-switch
            :checked="Boolean(record.state)"
            @click="stateClick(record)"
          />
        </template>
        <template #operational> </template>
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
import { useGetArticleList } from "./useGetArticleList";
// 引入设置文章状态
import { useStateArticle } from "./useStateArticle";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取数据列表方法
    const { articlList, getArticl } = useGetArticleList();
    // 设置表格列
    articlList.column = column;
    // 获取数据
    getArticl();
    //#endregion

    //#region 设置文章状态
    const { stateClick } = useStateArticle(getArticl);
    // 开关点击回调函数

    //#endregion

    return {
      //#region 获取列表数据方法
      articlList,
      //#endregion

      //#region 设置文章状态
      stateClick
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped></style>
