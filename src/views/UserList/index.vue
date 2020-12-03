<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '用户管理' }, { name: '用户列表' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 查询输入框 start -->
      <div class="query-box">
        <a-form :model="userModel" ref="userRef">
          <a-row>
            <!-- 用户名称 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="7" class="query-box-title">
                  <span>用户名称：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="userName">
                    <a-input
                      placeholder="用户名称"
                      v-model:value="userModel.userName"
                      type="userName"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- 用户名称 end -->
            <!-- 手机号 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="6" class="query-box-title">
                  <span>手机号：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="mobile">
                    <a-input
                      placeholder="手机号"
                      v-model:value="userModel.mobile"
                      type="mobile"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- 手机号 end -->
            <!-- ID start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="4" class="query-box-title">
                  <span>ID：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="id">
                    <a-input
                      placeholder="ID"
                      v-model:value="userModel.id"
                      type="id"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- ID end -->
            <a-col :span="3" :offset="2">
              <a-row>
                <!-- 查询按钮 start -->
                <a-col :span="12">
                  <a-button type="primary" @click="queryUserList">
                    查询
                  </a-button>
                </a-col>
                <!-- 查询按钮 end -->
                <!-- 重置按钮 start -->
                <a-col :span="12">
                  <a-button @click="resetUserList">重置</a-button>
                </a-col>
                <!-- 重置按钮 start -->
              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 查询输入框 end -->
      <!-- 数据列表 start -->
      <div class="user-table">
        <div class="user-table-title">
          <span>用户列表</span>
        </div>
        <a-table
          bordered
          :columns="userTableData.tableColumns"
          :data-source="userTableData.tableData.records"
          :pagination="false"
          :row-key="(record) => record.id"
        >
          <!-- 来源 -->
          <template #channel="{ record }">
            <span class="user-table-source">{{ record.channel }}</span>
          </template>
          <!-- 操作 -->
          <template #operation="{ record }">
            <!-- 跳转到用户详情页面并传id -->
            <a-button type="primary">
              <router-link :to="'/user/user-details/' + record.id"
                >查看</router-link
              >
            </a-button>
          </template>
        </a-table>
        <a-pagination
          show-size-changer
          v-model:current="pagination.current"
          v-model:pageSize="pagination.pageSize"
          @change="handlePageChange"
          @showSizeChange="onShowSizeChange"
          :page-size-options="pagination.pageSizeOptions"
          :total="pagination.total"
        >
        </a-pagination>
      </div>
      <!-- 数据列表 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入获取数据文件
import { userTable } from "./userTable";
// 引入重置方法文件
import { userReset } from "./userReset";
// import { onMounted } from "vue";
export default {
  // 使用组件
  components: {
    Crumbs,
  },
  // setup响应api入口
  setup() {
    // 获取（查询）数据
    let {
      pagination, // 分页数据
      userModel, // 表单数据
      queryUserList, // 查询
      handlePageChange, // 点击页码事件
      onShowSizeChange, // 选择每页数据条数事件
      getUserTabelData, // 获取数据方法
      userTableData, // 表格数据
    } = userTable();
    // 重置事件
    // userForm:表单ref
    // handelReset:重置方法
    let { userRef, resetUserList } = userReset(getUserTabelData);
    // 导出数据
    return {
      pagination,
      userModel,
      userRef,
      queryUserList,
      resetUserList,
      handlePageChange,
      onShowSizeChange,
      getUserTabelData,
      userTableData,
    };
  },
};
</script>

<style lang="scss" scoped>
// 查询输入框样式 start
.query-box {
  height: 100px;
  margin-bottom: 15px;
  border: 1px solid #ddd;

  & .ant-form > .ant-row {
    line-height: 40px;
    margin-top: 30px;
  }
  .ant-btn {
    width: 70px;
  }
  .query-box-title {
    font-family: "微软雅黑";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: right;
    color: #333333;
  }
}
// 查询输入框样式 end
// 表格样式 start
.user-table {
  border: 1px solid #ddd;
  overflow: hidden;
  .user-table-title {
    height: 50px;
    border-bottom: 1px solid #ddd;
    span {
      line-height: 50px;
      font-weight: 700;
      color: #333;
      margin-left: 11px;
    }
  }
  .user-table-source {
    color: #16a085;
  }
  .ant-table-wrapper {
    padding: 16px;
  }
  .ant-pagination {
    float: right;
    padding-right: 8px;
    padding-bottom: 16px;
  }
}
// 表格样式 end
</style>
