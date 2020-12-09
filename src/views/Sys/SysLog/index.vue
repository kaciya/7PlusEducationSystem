<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '操作日志' }]" />
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
            <a-form-item label="账号名称">
              <a-input
                placeholder="账号名称"
                style="width: 150px"
                v-model:value="usernameModel"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="7">
            <a-button style="margin: 0 10px; float: right" @click="resetClick">
              <SyncOutlined /> 重置
            </a-button>
            <a-button
              type="primary"
              style="margin: 0 10px; float: right"
              @click="searchClick(getLogData(params))"
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
          <h3 style="font-weight: 600">标签列表</h3>
        </a-col>
      </a-row>
      <!-- 权限组列表上标题 end -->

      <!-- 数据列表 -->
      <a-table
        :rowKey="(record) => record.id"
        :columns="logTable.logColums"
        :data-source="logTable.logData"
        :pagination="false"
        bordered
      >
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

//导入 useSysLogList 文件 获取相应的方法
import { showLogList } from "./useSysLogList";

//导入 useSysLogSearch 获取 相应的方法
import { useSysLogHeader } from "./useSysLogSearch";

// 引入 钩子函数
import { onMounted } from "vue";

//导入 图标样式
import { SearchOutlined, SyncOutlined } from "@ant-design/icons-vue";

export default {
  // 使用组件
  components: {
    Crumbs,
    SearchOutlined,
    SyncOutlined,
  },
  // setup响应api入口
  setup() {
    //获取 showLogList 中的 变量
    let {
      logTable,
      pageInfo,
      pageChange,
      pageSizeChange,
      getLogData,
    } = showLogList();

    //获取 useSysLogHeader 中的变量和方法
    let {
      usernameModel,
      dateModel,
      dateChange,
      dateChangeOk,
      resetClick,
      searchClick,
    } = useSysLogHeader();

    //在Mounted 获取列表
    onMounted(() => {
      getLogData({});
    });

    //返回参数
    return {
      //日期值
      dateModel,
      //日期选择器改变方法
      dateChange,
      //日期范围确定
      dateChangeOk,
      //账号名称
      usernameModel,
      //操作日志列表
      logTable,
      //分页数据对象
      pageInfo,
      //渲染操作日志列表
      getLogData,
      //点击下一页方法
      pageChange,
      //每页显示多少条数据的方法
      pageSizeChange,
      //重置 时间范围 和 账号名称方法
      resetClick,
      //根据 时间范围 和 账号名称 查询方法
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
