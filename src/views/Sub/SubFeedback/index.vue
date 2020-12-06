<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[{ name: '用户提交', route: '#' }, { name: '反馈列表' }]"
    />
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
          <a-col :span="6" :offset="1">
            <a-form-item label="时间范围">
              <a-range-picker v-model.lazy:value="dates" style="width: 230px" />
            </a-form-item>
          </a-col>
          <a-col :span="5" :push="1">
            <a-form-item label="状态">
              <a-select placeholder="全部">
                <a-select-option value="1"> 已解决 </a-select-option>
                <a-select-option value="0"> 未解决 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="8">
            <a-button type="primary" style="margin: 0 10px">
              <SearchOutlined /> 查询
            </a-button>
            <a-button style="margin: 0 10px"> <SyncOutlined /> 重置 </a-button>
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
        :columns="feedbackColums"
        :data-source="feedbackData.data"
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
          <span v-if="record.state == 1"> 已解决 </span>
          <span v-else> 未解决 </span>
        </template>
        <!-- 状态 end -->

        <!-- 操作 -->
        <template #operation="{ record }">
          <span v-if="record.state == 1">
            <a-button type="primary"> <LineOutlined /> </a-button>
          </span>
          <a-button type="primary" v-else> <AlertOutlined /> 处理 </a-button>
        </template>
        <!-- 操作 end -->
      </a-table>
      <!-- 数据列表 end -->
      <a-row>
        <a-col :span="24">
          <!-- 分页 -->
          <a-pagination
            show-size-changer
            show-less-items
            v-model:current="current"
            v-model:pageSize="pageSize"
            :total="total"
            @change="pageChange"
            style="float: right; margin: 10px 0"
          />
          <!-- 分页 end -->
        </a-col>
      </a-row>
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入 useSysLogList 文件 获取相应的方法
import { showContactList, pageChange } from "./useSubFeedbackList";

//导入 图标样式
import {
  SearchOutlined,
  SyncOutlined,
  LineOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue";

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
    //获取 方法中的 参数
    let {
      dates,
      feedbackColums,
      feedbackData,
      total,
      pageSize,
      current,
    } = showContactList();

    //返回参数
    return {
      dates,
      feedbackColums,
      feedbackData,
      total,
      pageSize,
      current,
      pageChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
