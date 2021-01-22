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
          route: '',
          name: '发布列表'
        }
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <a-card style="min-height: 93%">
      <!-- 查询 start -->
      <div class="query border">
        <a-row>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>用户名称：</span>
              </a-col>
              <a-col :span="17">
                <a-input v-model:value="topicUserName" placeholder="用户名称" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>分类：</span>
              </a-col>
              <a-col :span="17">
                <a-select v-model:value="topicSortStatus">
                  <a-select-option value=""> 全部 </a-select-option>
                  <a-select-option
                    :value="item.id"
                    v-for="item in categoryList"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="3" :offset="8">
            <a-row>
              <a-col :span="12">
                <a-button type="primary" @click="topicRead"> 查询 </a-button>
              </a-col>
              <a-col :span="12">
                <a-button @click="topicReset">重置</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <!-- 查询 end -->
      <!-- 数据列表 start -->
      <div class="border">
        <a-page-header style="border-bottom: 1px solid #ddd" title="标签列表" />
        <!-- 表格 start -->
        <a-table
          bordered
          :columns="columns"
          :data-source="topicData"
          row-key="id"
          :pagination="tablePagination"
          @change="tablePageChange"
        >
          <template #index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #content="{ record }">
            <span v-if="record.content">
              {{ record.content }}
            </span>
            <span v-else></span>
          </template>
          <template #category="{ record }">
            <span>{{ record.category }}</span>
          </template>
          <template #about="{ record }">
            <p>收藏：{{ record.favoriteCount }}</p>
            <p>阅读：{{ record.readCount }}</p>
            <p>评论：{{ record.commentCount }}</p>
          </template>
          <template #operation="{ record }">
            <a-button
              v-has="'topic:detail'"
              size="small"
              type="primary"
              style="margin-right: 10px"
              @click="checkArticle(record.id)"
            >
              查看
            </a-button>
            <a-button
              v-if="record.status == 1"
              v-has="'topic:edit'"
              size="small"
              type="danger"
              @click="topicShieldModal(record.id)"
            >
              屏蔽
            </a-button>
            <a-button
              v-else
              v-has="'topic:edit'"
              size="small"
              type="primary"
              class="pass-btn"
              @click="topicShowModal(record.id)"
            >
              显示
            </a-button>
          </template>
        </a-table>
        <!-- 表格 end -->
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
      </div>
      <!-- 数据列表 end -->
    </a-card>
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格配置
import { useTopicDataList } from "./useTopicDataList";
import { useGetTopicColumns } from "./useGetTopicColumns";
// 引入查询重置
import { useGetTopicList } from "./useGetTopicList";
// 引入屏蔽显示功能
import { useSetTopicShieldShow } from "./useSetTopicShieldShow";
// 引入获取分类列表
import { useGetTopicCategory } from "./useGetTopicCategory";
// 导入router
import { useRouter } from "vue-router";
export default {
  setup() {
    const {
      topicData, // 表格内容
      topicUserName, // 用户名称
      topicSortStatus, // 分类
      tablePagination, // 分页
      clearInput, // 清空输入框
      getTopicData // 获取数据
    } = useTopicDataList();

    // 表格列的配置
    const { columns } = useGetTopicColumns();

    // 点击切换页面
    const tablePageChange = pagination => {
      tablePagination.current = pagination.current;
      tablePagination.pageSize = pagination.pageSize;
      // 重新渲染
      getTopicData();
    };

    // 查询重置
    const {
      topicReset, // 重置
      topicRead // 查询
    } = useGetTopicList(getTopicData, clearInput, tablePagination);

    // 屏蔽显示
    const {
      topicShieldVisible, // 屏蔽模态框
      topicShieldModal, // 显示屏蔽模态框
      shielFrameValue, // 双向绑定屏蔽理由输入框
      confirmShieldModal, // 屏蔽框确认
      topicShowModal, // 显示框
      cancelShieldModal // 关闭模态框清空并提示
    } = useSetTopicShieldShow(getTopicData);

    // getCategory：获取分类下拉列表
    // categoryList:分类下拉列表数据
    const { getCategory, categoryList } = useGetTopicCategory();

    // 使用router
    const router = useRouter();

    // 点击查看跳转页面
    const checkArticle = id => {
      // 跳转
      router.push("/topic/article/" + id);
    };

    return {
      // 数据列表
      topicData,
      topicUserName,
      topicSortStatus,
      tablePagination,
      getTopicData,
      columns,
      tablePageChange,
      // 查询重置
      topicReset,
      topicRead,
      // 屏蔽显示
      topicShieldVisible,
      topicShieldModal,
      shielFrameValue,
      confirmShieldModal,
      topicShowModal,
      cancelShieldModal,
      // 获取分类
      getCategory,
      categoryList,
      // 点击查看跳转页面
      checkArticle
    };
  },
  // 使用组件
  components: {
    Crumbs
  }
};
</script>

<style lang="scss" scoped>
.query {
  height: 100px;
  margin-bottom: 15px;
  > .ant-row {
    margin-top: 30px;
    line-height: 40px;
  }
  span {
    font-size: 12px;
  }
  .ant-select {
    width: 100%;
  }
  .ant-btn {
    width: 70px;
  }
  .right {
    text-align: right;
  }
}

.border {
  border: 1px solid #ddd;
  .ant-table-wrapper {
    padding: 24px;
  }
  .ant-table {
    p {
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>
