<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '用户提交' }, { name: '反馈列表' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 日期 账号名称 查询内容 -->
      <a-form>
        <a-row>
          <a-col :span="7" :offset="1">
            <a-form-item label="时间范围">
              <a-range-picker
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                v-model:value="dateModel.data"
                :placeholder="['开始日期', '结束日期']"
                @change="dateChange"
                @ok="dateChangeOk"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="状态">
              <a-select
                v-model:value="selectModel"
                @change="selectChange"
                style="width: 120px"
              >
                <a-select-option value="2"> 全部 </a-select-option>
                <a-select-option value="1"> 已解决 </a-select-option>
                <a-select-option value="0"> 未解决 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="7">
            <a-button style="margin: 0 10px; float: right" @click="resetClick">
              <SyncOutlined /> 重置
            </a-button>
            <a-button
              type="primary"
              style="margin: 0 10px; float: right"
              @click="searchClick(getFeedbackData(params))"
            >
              <SearchOutlined /> 查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- 日期 账号名称 查询内容 end-->

      <!-- 权限组列表上标题 -->
      <a-row>
        <a-col :span="2">
          <h3 style="font-weight: 600">数据列表</h3>
        </a-col>
      </a-row>
      <!-- 权限组列表上标题 end -->

      <!-- 数据列表 -->
      <a-table
        :rowKey="(record) => record.id"
        :columns="feedbackTable.feedbackColums"
        :data-source="feedbackTable.feedbackData"
        :pagination="false"
        bordered
      >
        <!-- 列表索引 -->
        <template #index="{ index }">
          {{ index + 1 }}
        </template>
        <!-- 列表索引 end -->

        <!-- 图片 -->
        <template #picUrls="{ record }">
          <image :src="record.picUrls" />
        </template>
        <!-- 图片 end -->

        <!-- 状态 -->
        <template #status="{ record }">
          <span v-if="record.status == 1"> 已解决 </span>
          <span v-else-if="record.status == 0"> 未解决 </span>
        </template>
        <!-- 状态 end -->

        <!-- 操作 -->
        <template #operation="{ record }">
          <a-tag color="blue" v-if="record.status == 1">
            <LineOutlined />
          </a-tag>
          <a-tag
            color="blue"
            v-else-if="record.status == 0"
            @click="manageClick(record.id)"
            style="cursor: pointer"
          >
            处理
          </a-tag>
        </template>
        <!-- 操作 end -->
      </a-table>
      <!-- 数据列表 end -->
      <!-- 分页 -->
      <a-row>
        <a-col :span="24">
          <a-pagination
            show-size-changer
            v-model:current="pageInfo.pageNum"
            v-model:pageSize="pageInfo.pageSize"
            :page-size-options="pageInfo.pageSizeOptions"
            :defaultPageSize="10"
            :total="pageInfo.total"
            @change="pageChange"
            @showSizeChange="pageSizeChange"
            style="float: right; margin: 10px 0"
          />
        </a-col>
      </a-row>
      <!-- 分页 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

// 引入 钩子函数
import { onMounted } from "vue";

//导入 useSubFeedbackList 文件 获取相应的方法
import { showFeedbackList } from "./useSubFeedbackList";

//导入 useSubFeedbackHeader 文件 获取相应的方法
import { SubFeedbackHeader } from "./useSubFeedbackHeader";

//导入 图标样式
import {
  SearchOutlined,
  SyncOutlined,
  LineOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue";

//导入 reactive 对象
import { reactive, ref } from "vue";

export default {
  // 使用组件
  components: {
    Crumbs,
    SearchOutlined,
    SyncOutlined,
    LineOutlined,
    AlertOutlined,
  },

  //setup 编写 主要内容
  setup() {
    //获取 showFeedbackList 方法中的 参数
    let {
      feedbackTable,
      pageInfo,
      getFeedbackData,
      pageChange,
      pageSizeChange,
      manageClick,
    } = showFeedbackList();

    //获取 SubFeedbackHeader 方法中的 参数
    let {
      dateModel,
      selectModel,
      selectChange,
      dateChange,
      dateChangeOk,
      resetClick,
      searchClick,
    } = SubFeedbackHeader();

    //在Mounted 获取列表
    onMounted(() => {
      getFeedbackData({});
    });

    //返回参数
    return {
      //反馈列表
      feedbackTable,
      //分页数据对象
      pageInfo,
      //点击下一页方法
      pageChange,
      //每页显示多少条数据的方法
      pageSizeChange,
      //日期值
      dateModel,
      //日期选择器改变方法
      dateChange,
      //日期范围确定
      dateChangeOk,
      //默认选择项
      selectModel,
      //选择项改变方法
      selectChange,
      //重置状态 和 时间范围
      resetClick,
      //查询列表
      searchClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}
</style>
