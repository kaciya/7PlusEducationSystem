<template>
  <a-breadcrumb separator=">" style="margin: 16px 0">
    <!-- 循环显示面包屑文本内容 -->
    <a-breadcrumb-item v-for="(item, index) in crumbName" :key="index">
      <!-- 判断是否需要跳转路由 -->
      <router-link v-if="item.route" :to="item.route">
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  // 接受面包屑的文本和路由数据
  props: ["crumbName"],
};
</script>

<style>
.ant-breadcrumb-link,
.ant-breadcrumb-link a,
.ant-breadcrumb-separator {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  text-align: left;
  color: #333333;
}
.ant-breadcrumb {
  padding-left: 7px;
  border-left: 4px rgb(0, 121, 254) solid;
  height: 18px;
}
</style>