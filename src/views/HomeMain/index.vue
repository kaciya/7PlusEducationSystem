<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '首页' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 概要 start -->
      <a-page-header
        class="profile"
        style="border: 1px solid rgb(235, 237, 240)"
        title="概要"
      >
        <a-row class="a-row" :gutter="[48, 8]">
          <a-col :span="4" :offset="1"
            ><div>
              <span>累计用户数</span><br />
              <CountTo
                :endVal="statistics.data.userCount || 0"
                uid="id1"
                class="count-to"
              /></div
          ></a-col>
          <a-col :span="5"
            ><div>
              <span>近7日平均新增用户</span><br />
              <CountTo
                :endVal="statistics.data.userCountAvg7 || 0"
                uid="id2"
                class="count-to"
              /></div
          ></a-col>
          <a-col :span="4"
            ><div>
              <span>近30日平均新增用户</span><br />
              <CountTo
                :endVal="statistics.data.userCountAvg30 || 0"
                uid="id3"
                class="count-to"
              /></div
          ></a-col>
        </a-row>
      </a-page-header>
      <!-- 概要 end -->
      <a-row :gutter="20">
        <!-- 用户增长折线图 -->
        <a-col class="gutter-row" :span="15"><UserAddChart /></a-col>
        <!-- 用户来源饼图 -->
        <a-col class="gutter-row" :span="8"><UserSourceChart /></a-col>
      </a-row>
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入用户增长折线图
import UserAddChart from "@/components/UserAddChart";
// 导入用户来源饼图
import UserSourceChart from "@/components/UserSourceChart";
// 导入计数器组件
import CountTo from "@/components/CountTo";
// 导入首页统计数据
import { useGetStatistics } from "./useGetStatistics";
export default {
  // 使用组件
  components: {
    Crumbs,
    UserAddChart,
    UserSourceChart,
    CountTo
  },
  // setup响应api入口
  setup() {
    // 获取首页统计数据
    const { statistics } = useGetStatistics();
    // 返回
    return {
      // 首页统计数据
      statistics
    };
  }
};
</script>

<style lang="scss" scoped>
.profile {
  min-width: 1111px;
  padding-top: 12px;
  margin-bottom: 20px;

  .a-row {
    border-top: 1px solid rgb(235, 237, 240);
    padding-top: 10px;
  }

  [class~="ant-col"] {
    background: transparent;
    border: 0;
  }

  [class~="ant-col"] {
    > div {
      // background-color: rgba(0, 0, 0, 0.025);
      height: 80px;
      line-height: 34px;
      text-align: center;
      padding-top: 10px;

      > span {
        font-size: 15px;
        color: #555;
      }

      .count-to {
        color: #333;
        font-size: 22px;
        font-family: "Microsoft YaHei Bold";
        font-weight: bolder;
      }
    }
  }
}
</style>
