<template>
  <!-- 主体 start -->
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        {
          route: '',
          name: '柒加圈'
        },
        {
          route: '',
          name: '发布列表'
        },
        {
          route: '',
          name: '详情'
        }
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
        color: 'rgb(153, 153, 153)'
      }"
    >
      <!-- 文章内容 start -->
      <a-row>
        <a-col :span="5" class="information">
          <a-row :style="{ height: '100%' }">
            <a-col :span="7">
              <div class="publisher-img">
                <img :src="publisherAvatar" alt="" />
              </div>
            </a-col>
            <a-col :span="17">
              <p>{{ publisherUserName }}</p>
              <p><span>日期：</span> {{ publisherCreateTime }}</p>
              <p><span>IP地址:</span> {{ publisherIp }}</p>
              <div class="tag">
                <span>{{ publisherCategory }}</span>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="19" class="article-content">
          <div>
            <span><StarOutlined /> 收藏 {{ publisherFavoriteCount }}</span>
            <span><ReadOutlined /> 阅读 {{ publisherReadCount }}</span>
          </div>
          <p v-html="publisherContent"></p>
        </a-col>
      </a-row>
      <!-- 文章内容 end  -->

      <!-- 评论 start -->
      <a-row class="article-comment">
        <a-col :span="24">
          <div>
            <span
              ><CommentOutlined /> 全部评论 {{ publisherCommentCount }}</span
            >
          </div>
        </a-col>
      </a-row>
      <!-- 评论 end -->
    </div>
  </a-layout-content>
  <!-- 主体 end -->
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入文章详情
import { useGetArticle } from "./useGetArticle";
// 导入router
import { useRoute } from "vue-router";
// 引入icon图标
import {
  StarOutlined,
  ReadOutlined,
  CommentOutlined
} from "@ant-design/icons-vue";
export default {
  setup() {
    // 使用route
    const route = useRoute();

    const {
      getArticle, // 获取文章详情
      publisherAvatar, // 用户头像图片地址
      publisherUserName, // 用户名
      publisherCreateTime, // 创建时间
      publisherIp, // ip地址
      publisherCategory, // 文章分类
      publisherFavoriteCount, // 文章收藏数量
      publisherReadCount, // 文章阅读数量
      publisherContent, // 文章内容
      publisherCommentCount // 文章评论数量
    } = useGetArticle(route.params.id);
    return {
      getArticle,
      publisherAvatar,
      publisherUserName,
      publisherCreateTime,
      publisherIp,
      publisherCategory,
      publisherFavoriteCount,
      publisherReadCount,
      publisherContent,
      publisherCommentCount
    };
  },
  // 使用组件
  components: {
    Crumbs,
    StarOutlined,
    ReadOutlined,
    CommentOutlined
  }
};
</script>

<style lang="scss" scoped>
.information {
  p {
    font-size: 12px;
    > span {
      font-weight: 700;
    }
  }
  .tag {
    width: 150px;
    height: 44px;
    border-radius: 20px;
    margin-top: 20px;
    background-image: linear-gradient(
      to right,
      rgb(215, 138, 255),
      rgb(158, 87, 255)
    );
    text-align: center;
    transition: all 0.3s;
    span {
      line-height: 44px;
      color: #fff;
    }
  }
  .tag:hover {
    filter: brightness(1.05);
  }
  .publisher-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.article-content {
  div {
    height: 30px;
    border-bottom: 1px solid #eee;
    span:last-child {
      margin-left: 10px;
    }
  }
  > p {
    margin-top: 10px;
  }
}
.article-comment {
  margin-top: 30px;
  div {
    height: 30px;
    border-bottom: 1px solid #eee;
  }
}
</style>
