<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '用户提交' }, { name: '联系记录' }]" />
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
                v-model:value="dateModel.date"
                :placeholder="['开始日期', '结束日期']"
                @change="dateChange"
                @ok="dateChangeOk"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="状态">
              <a-select
                style="width: 120px"
                v-model:value="selectModel"
                @change="selectChange"
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
              @click="searchClick"
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
        :columns="contactTable.contactColums"
        :data-source="contactTable.contactData"
        :pagination="false"
        bordered
      >
        <!-- 列表索引 -->
        <template #index="{ index }">
          {{ index + 1 }}
        </template>
        <!-- 列表索引 end -->

        <!-- 状态 -->
        <template #state="{ record }">
          <span v-if="record.state == 1"> 已解决 </span>
          <span v-else-if="record.state == 0"> 未解决 </span>
        </template>
        <!-- 状态 end -->

        <!-- 操作 -->
        <template #operation="{ record }">
          <a-tag color="blue" v-if="record.state == 1">
            <LineOutlined />
          </a-tag>
          <a-tag
            color="blue"
            v-else-if="record.state == 0"
            style="cursor: pointer"
            @click="manageClick(record.id)"
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

//导入 useSysContactList 文件 获取相应的方法
import { showContactList } from "./useSubContactList";

//导入 useSysContactHeader 文件 获取相应方法
import { SubContactHeader } from "./useSubContactHeader";

//导入 useSysContactColumns 文件 获取相应的列表项
import { useSubContactColums } from "./useSubContactColums";

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

  setup() {
    //获取 方法中的 参数
    let { contactTable } = useSubContactColums();

    let {
      pageInfo,
      getContactData,
      pageChange,
      manageClick,
      pageSizeChange,
    } = showContactList(contactTable);

    let {
      dateModel,
      selectModel,
      dateChangeOk,
      dateChange,
      selectChange,
      resetClick,
      searchClick,
    } = SubContactHeader(getContactData);

    //在Mounted 获取列表
    onMounted(() => {
      getContactData({});
    });

    //返回参数
    return {
      //用户提交列表表格对象
      contactTable,
      //日期选择器选中时间
      dateModel,
      //默认选择项
      selectModel,
      //分页数据对象
      pageInfo,
      //渲染列表数据方法
      getContactData,
      //分页改变页数方法
      pageChange,
      //每页显示多少条数据的方法
      pageSizeChange,
      //选择项改变方法
      selectChange,
      //日期选择器改变方法
      dateChange,
      //日期选择器选中方法
      dateChangeOk,
      //重置 日期范围 和状态方法
      resetClick,
      //查询 日期范围 和状态匹配列表项方法
      searchClick,
      //点击操作中的处理方法
      manageClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}
</style>
