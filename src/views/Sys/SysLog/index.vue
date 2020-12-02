<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[{ name: '权限管理', route: '#' }, { name: '操作日志' }]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 日期 账号名称 查询内容 -->
      <a-row style="margin-bottom: 20px;">
        <a-col :span="6" :offset="1">
          <span
            >时间范围:&nbsp;&nbsp;
            <a-range-picker v-model.lazy:value="dates" style="width: 230px;"
          /></span>
        </a-col>
        <a-col :span="5" :push="1">
          <span
            >账号名称:&nbsp;&nbsp;
            <a-input placeholder="账号名称" style="width: 150px;"
          /></span>
        </a-col>
        <a-col :span="4" :offset="8">
          <a-button type="primary" style="margin: 0 10px;">
            <SearchOutlined /> 查询
          </a-button>
          <a-button style="margin: 0 10px;"> <SyncOutlined /> 重置 </a-button>
        </a-col>
      </a-row>
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
        :rowKey="record => record.id"
        :columns="logColums"
        :data-source="logData.data"
        bordered
      >
      </a-table>
      <!-- 数据列表 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入 useSysLogList 文件 获取相应的方法
import { showLogList } from "./useSysLogList";

//导入 图标样式
import { SearchOutlined, SyncOutlined } from "@ant-design/icons-vue";

export default {
  // 使用组件
  components: {
    Crumbs,
    SearchOutlined,
    SyncOutlined
  },
  // setup响应api入口
  setup() {
    //获取 showLogList 中的 变量
    let { dates, username, logColums, logData } = showLogList();

    //返回
    return {
      dates,
      username,
      logColums,
      logData
    };
  }
};
</script>

<style lang="scss" scoped></style>
