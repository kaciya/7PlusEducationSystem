<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '用户管理' },
        { name: '用户列表', route: '/user/user-list' },
        { name: '详情' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 基础信息 start -->
      <a-page-header style="border: 1px solid #ddd" title="基础信息" />
      <!-- 内容 -->
      <div class="info-content">
        <!-- 第一行 -->
        <a-row>
          <a-col :span="userTitle" class="info-name">用户昵称</a-col>
          <a-col :span="userContent">{{ userDetailData.nickName }}</a-col>
          <a-col :span="userTitle" class="info-name">联系电话</a-col>
          <a-col :span="userContent">{{ userDetailData.mobile }}</a-col>
        </a-row>
        <!-- 第二行 -->
        <a-row>
          <a-col :span="userTitle" class="info-name">ID</a-col>
          <a-col :span="userContent">{{ userDetailData.id }}</a-col>
          <a-col :span="userTitle" class="info-name">最近登录时间</a-col>
          <a-col :span="userContent">{{ userDetailData.lastLoginTime }}</a-col>
        </a-row>
        <!-- 第三行 -->
        <a-row>
          <a-col :span="userTitle" class="info-name">注册时间</a-col>
          <a-col :span="userContent">{{ userDetailData.createTime }}</a-col>
          <a-col :span="userTitle" class="info-name">来源</a-col>
          <a-col :span="userContent">{{ userDetailData.channel }}</a-col>
        </a-row>
        <!-- 第四行 -->
        <a-row>
          <a-col :span="userTitle" class="info-name">累计时长</a-col>
          <a-col :span="userContent">{{ userDetailData.durations }}天</a-col>
          <a-col :span="userTitle" class="info-name">累计练习</a-col>
          <a-col :span="userContent"
            >{{ userDetailData.practiceCount }}题</a-col
          >
        </a-row>
      </div>
      <!-- 基础信息 end -->

      <!-- 表格start -->
      <div class="container">
        <!-- animated 动画 -->
        <a-tabs :animated="true">
          <a-tab-pane key="1" tab="柒加圈">
            <!-- 柒加圈 -->
            <Topic :userID="id" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="登录日志">
            <!-- 登录日志 -->
            <Log :userID="id" />
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- 表格end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 基本信息
import { useGetDetail } from "./useGetDetail";
// 柒加圈组件
import Topic from "@/components/UserTopic";
// 登录日志组件
import Log from "@/components/LoginLog";
import { ref } from "vue";
export default {
  // 获取用户id
  props: ["id"],
  // 使用组件
  components: {
    Crumbs,
    Topic,
    Log
  },
  // setup响应api入口
  setup(prop) {
    // 基础信息标题col占比
    const userTitle = ref(4);
    // 基础信息内容col占比
    const userContent = ref(8);
    // 获取基础信息 传id获取对应用户信息
    const { userDetailData } = useGetDetail(prop.id);
    //#endregion
    return {
      // 用户个人信息
      userDetailData,
      userTitle,
      userContent
    };
  }
};
</script>

<style lang="scss" scoped>
// 基础信息 start
// 内容盒子
.info-content {
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  margin-bottom: 24px;
  // 所有盒子
  .ant-col {
    height: 45px;
    line-height: 45px;
    font-size: 13px;
    color: #666;
    padding: 0 10px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  // 带阴影的盒子
  .info-name {
    font-weight: 700;
    text-align: right;
    padding: 0 16px;
    background-color: #f5f5f5;
  }
}
// 基础信息 end
</style>
