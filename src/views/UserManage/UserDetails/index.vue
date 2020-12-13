<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '用户管理' },
        { name: '用户列表', route: '/user/user-list' },
        { name: '详情' },
      ]"
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
      <!-- 基础信息 start -->
      <div class="information">
        <!-- 标题 -->
        <div class="information-title">
          <span>基础信息</span>
        </div>
        <!-- 内容 -->
        <div class="information-content">
          <!-- 第一行 -->
          <a-row>
            <a-col :span="4" class="information-name">用户昵称</a-col>
            <a-col :span="8">{{ userDetailData.nickName }}</a-col>
            <a-col :span="4" class="information-name">联系电话</a-col>
            <a-col :span="8">{{ userDetailData.mobile }}</a-col>
          </a-row>
          <!-- 第二行 -->
          <a-row>
            <a-col :span="4" class="information-name">ID</a-col>
            <a-col :span="8">{{ userDetailData.id }}</a-col>
            <a-col :span="4" class="information-name">最近登录时间</a-col>
            <a-col :span="8">{{ userDetailData.lastLoginTime }}</a-col>
          </a-row>
          <!-- 第三行 -->
          <a-row>
            <a-col :span="4" class="information-name">注册时间</a-col>
            <a-col :span="8">{{ userDetailData.createTime }}</a-col>
            <a-col :span="4" class="information-name">来源</a-col>
            <a-col :span="8">{{ userDetailData.channel }}</a-col>
          </a-row>
          <!-- 第四行 -->
          <a-row>
            <a-col :span="4" class="information-name">累计时长</a-col>
            <a-col :span="8">{{ userDetailData.durations }}天</a-col>
            <a-col :span="4" class="information-name">累计练习</a-col>
            <a-col :span="8">{{ userDetailData.practiceCount }}题</a-col>
          </a-row>
        </div>
      </div>
      <!-- 基础信息 end -->

      <!-- 表格start -->
      <div class="container">
        <!-- animated 动画 -->
        <a-tabs type="card" :animated="true">
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
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 基本信息
import { userDetail } from "./userDetail";
// 柒加圈组件
import Topic from "@/components/UserTopic";
// 登录日志组件
import Log from "@/components/LoginLog";
export default {
  // 获取用户id
  props: ["id"],
  // 使用组件
  components: {
    Crumbs,
    Topic,
    Log,
  },
  // setup响应api入口
  setup(prop) {
    // 获取基础信息 传id获取对应用户信息
    const { userDetailData } = userDetail(prop.id);
    //#endregion
    return {
      // 用户个人信息
      userDetailData,
    };
  },
};
</script>

<style lang="scss" scoped>
// 基础信息 start
.information {
  border: 1px solid #ddd;
  overflow: hidden;
  margin-bottom: 30px;
  // 基础信息盒子
  .information-title {
    height: 50px;
    border-bottom: 1px solid #ddd;
    // 基础信息文字
    span {
      line-height: 50px;
      font-weight: 700;
      color: #333;
      margin-left: 11px;
    }
  }
  // 内容盒子
  .information-content {
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    margin: 16px 10px;
    // 所有盒子
    .ant-col {
      height: 45px;
      line-height: 45px;
      text-align: left;
      font-size: 13px;
      font-weight: 400;
      color: rgb(102, 102, 102);
      padding: 0 10px;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    // 带阴影的盒子
    .information-name {
      font-weight: 700;
      text-align: right;
      padding: 0 16px;
      background-color: #f5f5f5;
    }
  }
}
// 基础信息 end
</style>
