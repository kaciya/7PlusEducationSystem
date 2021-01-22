<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '用户管理' }, { name: '用户列表' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 查询输入框 start -->
      <div class="query-box">
        <a-form :model="userModel" ref="userRef">
          <a-row>
            <!-- 用户名称 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="7">
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
                <a-col :span="6">
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
                <a-col :span="4">
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
                  <a-button type="primary" @click="getUserList">
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
      <!-- 页头 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="用户列表"
      />
      <!-- 表格 -->
      <a-table
        bordered
        :columns="columns"
        :data-source="userData.data"
        :pagination="userPagination"
        :row-key="record => record.id"
        @change="onTableChange"
      >
        <!-- 来源 -->
        <template #channel="{ record }">
          <span class="user-table-source">{{ record.channel }}</span>
        </template>
        <!-- 操作 -->
        <template #operation="{ record }">
          <!-- 跳转到用户详情页面并传id -->
          <a-button type="primary" size="small" v-has="'user:detail'">
            <router-link
              :to="'/user/details/' + record.id"
              v-has="'user:detail'"
              >查看</router-link
            >
          </a-button>
        </template>
      </a-table>
      <!-- 数据列表 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入获取数据文件
import { useGetList } from "./useGetList";
// 表格Columns
import { useColumns } from "./useColumns";
// 引入重置方法文件
import { useResetList } from "./useResetList";
export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取（查询）数据
    let {
      userData, // 表格数据
      userModel, // 表单数据
      getUserList, // 点击查询的回调
      getUserListData, // 获取数据方法
      onTableChange, // 页码改变触发事件
      userPagination // 表格分页配置项
    } = useGetList();
    // 表格Columns
    let { columns } = useColumns();
    //#endregion
    //#region 重置事件
    /**
     * userForm:表单ref
     * handelReset:点击重置的回调
     */
    let { userRef, resetUserList } = useResetList(
      getUserListData,
      userPagination
    );
    //#endregion
    // 导出数据
    return {
      //#region 获取(查询)数据
      userModel,
      getUserList,
      getUserListData,
      userData,
      onTableChange,
      userPagination,
      //#endregion
      // 表格columns
      columns,
      //#region 重置
      userRef,
      resetUserList
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped>
// 查询输入框样式 start
.query-box {
  margin-bottom: 15px;
  border: 1px solid #ddd;

  .ant-form > .ant-row {
    margin-top: 30px;
    line-height: 40px;
  }
}
// 查询输入框样式 end
// 表格样式 start
// 来源
.user-table-source {
  color: #16a085;
}
// 表格样式 end
</style>
