<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '用户提交' }, { name: '反馈列表' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px">
      <!-- 日期 账号名称 查询内容 -->
      <a-form>
        <a-row>
          <a-col :span="9" :offset="1">
            <a-form-item label="时间范围">
              <a-range-picker
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                v-model:value="headerData.dateModel"
                :placeholder="['开始日期', '结束日期']"
                @change="changeDate"
                @ok="changeDateConfirm"
                style="max-width: 300px"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-form-item label="状态">
              <a-select
                v-model:value="headerData.selectModel"
                @change="changeStatus"
                style="width: 120px"
              >
                <a-select-option value="2"> 全部 </a-select-option>
                <a-select-option value="1"> 已解决 </a-select-option>
                <a-select-option value="0"> 未解决 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="4">
            <a-button class="header-btn" @click="resetClick"> 重置 </a-button>
            <a-button type="primary" class="header-btn" @click="searchClick">
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- 日期 账号名称 查询内容 end-->

      <!-- 反馈列表card -->
      <a-card title="数据列表">
        <!-- 数据列表 -->
        <a-table
          bordered
          :columns="feedbackTable.colums"
          :data-source="feedbackTable.data"
          row-Key="id"
          :loading="isLoading"
          :pagination="feedbackPagination"
          @change="pageChange"
        >
          <!-- 列表索引 -->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <!-- 列表索引 end -->

          <!-- 内容 -->
          <template #content="{ record }">
            <a-tooltip placement="bottomLeft">
              <template #title>
                {{ record.content }}
              </template>
              {{ record.content }}
            </a-tooltip>
          </template>
          <!-- 内容 end -->

          <!-- 图片 -->
          <template #pics="{ record }">
              <div
                class="feedback-img"
                v-for="(item, index) in record.pics"
                :key="index"
              >
                <img :src="item" />
              </div>
          </template>
          <!-- 图片 end -->

          <!-- 状态 -->
          <template #status="{ record }">
            <a-tag color="blue" v-if="record.status == 1"> 已解决 </a-tag>
            <a-tag color="cyan" v-else-if="record.status == 0"> 未解决 </a-tag>
          </template>
          <!-- 状态 end -->

          <!-- 操作 -->
          <template #operation="{ record }">
            <a-button
              type="primary"
              size="small"
              v-if="record.status == 1"
              disabled
            >
              <LineOutlined />
            </a-button>

            <a-button
              type="primary"
              size="small"
              v-else-if="record.status == 0"
              @click="editManage(record.id)"
              v-has="'feedback:handle'"
            >
              处理
            </a-button>
          </template>
          <!-- 操作 end -->
        </a-table>
        <!-- 数据列表 end -->
      </a-card>
      <!-- 反馈列表card end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入 面包屑组件
import Crumbs from "@/components/Crumbs";

// 引入 钩子函数
import { onMounted } from "vue";

// 获取 反馈列表 后台请求的 列表数据
import { useGetFeedbackList } from "./useGetFeedbackList";

// 获取 反馈列表 顶部 日期 和 选择器 方法
import { useFeedbackHeader } from "./useFeedbackHeader";

// 定义 反馈列表 列表项
import { useFeedbackColums } from "./useFeedbackColums";

// 获取 反馈列表 查询方法
import { useSearchFeedback } from "./useSearchFeedback";

// 获取 反馈列表 重置方法
import { useResetFeedback } from "./useResetFeedback";

// 获取 反馈列表 处理操作方法
import { useEditFeedbackManage } from "./useEditFeedbackManage";

//导入 图标样式
import { LineOutlined } from "@ant-design/icons-vue";

export default {
  // 使用组件
  components: {
    Crumbs,
    LineOutlined,
  },

  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数
    /**
     * feedbackTable 反馈列表
     */
    const { feedbackTable } = useFeedbackColums();

    /**
     * feedbackPagination 分页参数
     * getFeedbackData 渲染表格数据方法
     * pageChange 点击下一页方法
     * isLoading 加载列表
     */
    const {
      feedbackPagination,
      getFeedbackData,
      pageChange,
      isLoading,
    } = useGetFeedbackList(feedbackTable, searchData);

    /**
     * headerData 顶部 日期 与 状态 绑定数据对象
     * changeStatus 选择项改变方法
     * changeDate 日期选择器改变方法
     * changeDateConfirm 日期范围确定
     */
    const {
      headerData,
      changeStatus,
      changeDate,
      changeDateConfirm,
    } = useFeedbackHeader();

    /**
     * searchClick 查询列表
     */
    const { searchData, searchClick } = useSearchFeedback(
      getFeedbackData,
      headerData
    );

    /**
     * resetClick 重置状态 和 时间范围
     */
    const { resetClick } = useResetFeedback(getFeedbackData, headerData);

    /**
     * editManage 点击操作中的处理方法
     */
    const { editManage } = useEditFeedbackManage(getFeedbackData);
    //#endregion

    //在Mounted 获取列表
    onMounted(() => {
      getFeedbackData();
    });

    //#region 返回参数
    return {
      //反馈列表
      feedbackTable,
      //顶部 日期 与 状态 绑定数据对象
      headerData,
      //分页参数
      feedbackPagination,
      //日期选择器改变方法
      changeDate,
      //日期范围确定
      changeDateConfirm,
      //渲染表格数据方法
      getFeedbackData,
      //选择项改变方法
      changeStatus,
      //重置状态 和 时间范围
      resetClick,
      //查询列表
      searchClick,
      //点击操作中的处理方法
      editManage,
      //点击下一页方法
      pageChange,
      //加载状态
      isLoading,
    };
    //#endregion
  },
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}

.header-btn {
  margin: 3px 10px;
  float: right;
}

.feedback-img {
  float: left;
  max-width: 165px;
  margin: 5px;

  img {
    width: 100%;
  }
}
</style>
