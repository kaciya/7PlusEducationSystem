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
        }
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 查询 start -->
      <div class="query border">
        <a-row>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>用户名称：</span>
              </a-col>
              <a-col :span="17">
                <a-input v-model:value="topicUserName" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>分类：</span>
              </a-col>
              <a-col :span="17">
                <a-select v-model:value="topicSortStatus" placeholder="全部">
                  <a-select-option
                    :value="item.id"
                    v-for="item in categoryList"
                    :key="item.id"
                  >
                    {{ item.name.substring(1) }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="3" :offset="8">
            <a-row>
              <a-col :span="12">
                <a-button type="primary" @click="topicInquire"> 查询 </a-button>
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
        <div class="border-bottom">
          <span>标签列表</span>
          <!-- 添加模态框 end -->
        </div>
        <!-- 表格 start -->
        <a-table
          bordered
          :columns="columns"
          :data-source="topicData"
          :row-key="record => record.id"
          :pagination="false"
        >
          <template #index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #content="{ text }">
            <span v-if="text.content">
              {{ text.content.substring(0, 10) + "..." }}
            </span>
            <span v-else></span>
          </template>
          <template #category="{ text }">
            <span>{{ text.category.substring(1) }}</span>
          </template>
          <template #about="{ text }">
            <p>收藏：{{ text.favoriteCount }}</p>
            <p>阅读：{{ text.readCount }}</p>
            <p>评论：{{ text.commentCount }}</p>
          </template>
          <template #operation="{ text }">
            <div v-if="text.status == 1">
              <a-button
                type="primary"
                style="margin-right: 10px"
                @click="check(text.id)"
              >
                查看
              </a-button>
              <a-button type="danger" @click="topicShield(text.id)">
                屏蔽
              </a-button>
            </div>
            <div v-else>
              <a-button
                type="primary"
                style="margin-right: 10px"
                @click="check(text.id)"
              >
                查看
              </a-button>
              <a-button type="danger" @click="topicShow(text.id, pageNum)">
                显示
              </a-button>
            </div>
          </template>
        </a-table>
        <!-- 表格 end -->
        <!-- 屏蔽模态框 start -->
        <a-modal
          v-model:visible="topicShieldVisible"
          title="屏蔽"
          @ok="confirmShieldModal(pageNum)"
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
          @change="topicDataListPaging"
          show-size-changer
          :page-size-options="['10']"
          v-model:current="pageNum"
          :pageSize="10"
          :total="topicDataListTotal"
        />
        <!-- 分页 end -->
      </div>
      <!-- 数据列表 end -->
    </div>
  </a-layout-content>
  <!-- 主体 end -->
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格配置
import { useTopicDataList } from "./useTopicDataList";
import { useTopicGetColumns } from "./useTopicGetColumns";
// 引入查询重置
import { useTopicQuery } from "./useTopicQuery";
// 引入屏蔽显示功能
import { useTopicShieldShow } from "./useTopicShieldShow";
// 引入获取分类列表
import { useTopicGetCategory } from "./useTopicGetCategory";
import { ref } from "vue";
// 导入router
import { useRouter } from "vue-router";
export default {
  setup() {
    // 数据列表
    // topicGetData：获取数据
    // topicData：表格内容
    // topicDataListTotal：表格数据总数量
    const { topicGetData, topicData, topicDataListTotal } = useTopicDataList();

    // 表格列的配置
    const { columns } = useTopicGetColumns();

    // 换页存的页码(当前页)
    const pageNum = ref(1);

    // 点击换页
    const topicDataListPaging = (page, pageSize) => {
      pageNum.value = page;
      topicGetData(page, pageSize);
    };

    // 查询重置
    const {
      topicUserName, // 用户名称输入框双向绑定
      topicSortStatus, // 分类双向绑定
      topicReset, // 重置
      topicInquire // 查询
    } = useTopicQuery(pageNum, topicGetData);

    // 屏蔽显示
    const {
      topicShieldVisible, // 屏蔽模态框
      topicShield, // 显示屏蔽模态框
      shielFrameValue, // 双向绑定屏蔽理由输入框
      confirmShieldModal, // 屏蔽框确认
      topicShow, // 显示框
      cancelShieldModal // 关闭模态框清空并提示
    } = useTopicShieldShow(topicGetData);

    // getCategory：获取分类下拉列表
    // categoryList:分类下拉列表数据
    const { getCategory, categoryList } = useTopicGetCategory();

    // 使用router
    const router = useRouter();

    // 点击查看跳转页面
    const check = id => {
      // 跳转
      router.push("/topic/article/" + id);
    };
    return {
      topicGetData,
      topicData,
      topicDataListTotal,
      columns,
      pageNum,
      topicDataListPaging,
      topicUserName,
      topicSortStatus,
      topicReset,
      topicInquire,
      topicShieldVisible,
      topicShield,
      shielFrameValue,
      confirmShieldModal,
      topicShow,
      cancelShieldModal,
      getCategory,
      categoryList,
      check
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
  .border-bottom {
    height: 50px;
    border-bottom: 1px solid #ddd;
    > span {
      line-height: 50px;
      color: #333;
      font-weight: 700;
      margin-left: 11px;
    }
  }
  .ant-table-wrapper {
    padding: 16px;
  }
  .ant-pagination {
    text-align: right;
    padding: 16px;
  }
  .ant-pagination-next {
    margin-right: 8px;
  }
  .ant-table {
    p {
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>
