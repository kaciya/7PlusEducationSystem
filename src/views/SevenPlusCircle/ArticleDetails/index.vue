<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        {
          route: '',
          name: '柒加圈'
        },
        {
          route: '/topic/page',
          name: '发布列表'
        },
        {
          route: '',
          name: '详情'
        }
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <a-card style="min-height: 93%">
      <!-- 文章内容 start -->
      <a-row>
        <a-col :span="5" class="information">
          <a-row :style="{ height: '100%' }">
            <a-col :span="7">
              <div class="publisher-img">
                <img :src="publisher.avatar" alt="" />
              </div>
            </a-col>
            <a-col :span="17">
              <p>{{ publisher.userName }}</p>
              <p><span>日期：</span> {{ publisher.createTime }}</p>
              <p><span>IP地址:</span> {{ publisher.ip }}</p>
              <div class="tag">
                <span>{{ publisher.category }}</span>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="19" class="article-content">
          <p>
            <span><StarOutlined /> 收藏 {{ publisher.favouriteCount }}</span>
            <span><ReadOutlined /> 阅读 {{ publisher.readCount }}</span>
          </p>
          <div v-html="publisher.content"></div>
        </a-col>
      </a-row>
      <!-- 文章内容 end  -->
      <a-row class="article-comment">
        <a-col :span="24">
          <div>
            <span
              ><CommentOutlined /> 全部评论 {{ publisher.commentCount }}</span
            >
          </div>
        </a-col>
      </a-row>
      <!-- 评论 start -->
      <a-row class="comment-content" v-for="item in commentList" :key="item.id">
        <a-col :span="2">
          <div class="reviewers">
            <img :src="item.avatar" alt="" />
          </div>
        </a-col>
        <a-col :span="22">
          <p>{{ item.originalUserName }}</p>
          <p>回复{{ item.userName }}：{{ item.content }}</p>
          <p>
            {{ item.createTime }}
            <a
              v-if="item.status == 1"
              style="margin-left: 10px; color: red"
              @click="topicShieldModal(item.id)"
            >
              屏蔽
            </a>
            <a
              v-else
              style="margin-left: 10px; color: red"
              @click="topicShowModal(item.id)"
            >
              显示
            </a>
          </p>
        </a-col>
      </a-row>
      <!-- 评论 end -->
      <!-- 屏蔽模态框 start -->
      <a-modal
        v-model:visible="topicShieldVisible"
        title="屏蔽"
        @ok="confirmShieldModal"
        @cancel="cancelShieldModal"
      >
        <a-row>
          <a-col :span="24">
            <span> 请输入屏蔽理由 </span>
          </a-col>
        </a-row>
        <a-row :style="{ marginTop: '15px' }">
          <a-col :span="24">
            <a-input v-model:value="shielFrameValue"></a-input>
          </a-col>
        </a-row>
      </a-modal>
      <!-- 屏蔽模态框 end  -->
      <!-- 分页 start -->
      <a-pagination
        showSizeChanger
        v-model:current="pageNum"
        :total="commentTotal"
        :pageSizeOptions="pageSizeOptions"
        @change="commentPaging"
      />
      <!-- 分页 end -->
    </a-card>
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入文章详情
import { useGetArticle } from "./useGetArticle";
// 引入文章评论
import { useGetComment } from "./useGetComment";
import { useCommentPaging } from "./useCommentPaging";
// 引入屏蔽显示功能
import { useSetCommentShieldShow } from "./useSetCommentShieldShow";
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
      getArticleDetails, // 获取文章详情
      publisher // 获取文章内容对象
    } = useGetArticle(route.params.id);

    // getComment：获取评论数据请求方法
    // commentList：请求到的数据
    const { getComment, commentList, commentTotal, pageNum } = useGetComment(
      route.params.id
    );

    // pageSizeOptions：可改变的pageSize
    // commentPaging：点击分页
    const { pageSizeOptions, commentPaging } = useCommentPaging(
      getComment,
      pageNum
    );

    // 屏蔽显示评论内容
    const {
      topicShieldVisible, // 屏蔽模态框
      topicShieldModal, // 显示屏蔽模态框
      shielFrameValue, // 双向绑定屏蔽理由输入框
      confirmShieldModal, // 屏蔽框确认
      cancelShieldModal, // 关闭模态框清空并提示
      topicShowModal // 显示框及确认
    } = useSetCommentShieldShow(getComment);

    return {
      getArticleDetails,
      publisher,
      getComment,
      commentList,
      commentTotal,
      pageNum,
      pageSizeOptions,
      commentPaging,
      // 屏蔽显示评论内容
      topicShieldVisible,
      shielFrameValue,
      topicShieldModal,
      confirmShieldModal,
      cancelShieldModal,
      topicShowModal
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
  > p {
    height: 30px;
    border-bottom: 1px solid #eee;
    span:last-child {
      margin-left: 10px;
    }
  }
  > div {
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
.comment-content {
  height: 120px;
  border-bottom: 1px solid #eee;
  .reviewers {
    position: relative;
    top: 50px;
    left: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-bottom: 0;
    height: 40px;
    line-height: 40px;
  }
}
.ant-pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
