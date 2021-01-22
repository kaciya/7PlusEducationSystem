<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '运营管理' }, { name: '文章列表(官网)' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-row>
        <a-col :span="24" style="margin-bottom: 15px">
          <a-button
            type="primary"
            style="float: right"
            @click="cheackAddArticle"
            >发布</a-button
          >
        </a-col>
      </a-row>
      <!-- 数据列表 start -->
      <a-table
        :columns="articlList.column"
        :data-source="articlList.data"
        :row-key="record => record.id"
        :pagination="articlPagination"
        @change="onTableChange"
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
        <template #operational="{ record }">

          <a-button size="small" type="primary" @click="showArticleModal(record)">查看</a-button>
          <a-button type="primary" size="small" style="margin: 0 10px" @click="cheackEditArticle(record)" class="modify-btn" v-has="'article:edit'">编辑</a-button>
          <a-popconfirm placement="topRight" title="您真的要删除吗?" @confirm="delSubmit(record.id)">
            <a-button type="danger" size="small" v-has="'article:delete'">删除</a-button>

          
          </a-popconfirm>
        </template>
      </a-table>
      <!-- 数据列表 end -->
      <!-- 查看文章模态框 start -->
      <a-modal
        v-model:visible="articleModalVisible"
        title="查看文章"
        @ok="addOk"
        width="950px"
      >
        <div>
          <span style="font-size: 18px;margin-bottom: 20px">文章标题:</span>
          <h1>{{ articlContent.title }}</h1>
        </div>
        <div>
          <span style="font-size: 18px;margin-bottom: 20px">文章内容:</span>
          <div v-html="articlContent.content"></div>
        </div>
      </a-modal>
      <!-- 查看文章模态框 end -->
    </a-card>
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
// 引入查看文章方法
import { useShowArticleList } from "./useShowArticleList";
// 引入删除文章方法
import { useDelArticleList } from "./useDelArticleList";
// 引入vue-router
import { useRouter } from "vue-router";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    // 使用vue-router
    const router = useRouter();

    //#region 获取数据列表方法
    const {
      articlList,
      getArticl,
      articlPagination,
      onTableChange
    } = useGetArticleList();
    // 设置表格列
    articlList.column = column;
    getArticl();
    //#endregion

    //#region 设置文章状态
    const { stateClick } = useStateArticle(getArticl);
    //#endregion

    // 点击跳转发布页
    const cheackAddArticle = () => {
      router.push("/operation/article/add");
    };

    // 跳转到编辑页
    const cheackEditArticle = record => {
      router.push({ name: "EditArticle", params: record });
    };

    //#region 查看文章
    const {
      articleModalVisible,
      showArticleModal,
      articlContent,
      addOk
    } = useShowArticleList();
    //#endregion

    //#region 删除文章方法
    const { delSubmit } = useDelArticleList(getArticl);
    //#endregion

    return {
      //#region 获取列表数据方法
      articlList,
      articlPagination,
      onTableChange,
      //#endregion
      //#region 设置文章状态
      stateClick,
      //#endregion
      //#region 点击跳转
      cheackAddArticle,
      cheackEditArticle,
      //#endregion
      //#region 查看文章
      articleModalVisible,
      showArticleModal,
      articlContent,
      addOk,
      //#endregion
      //#region 删除文章方法
      delSubmit
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped></style>
