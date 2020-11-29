<template>
  <a-breadcrumb id="crumbs" separator=">" style="margin: 18px 14px">
    <!-- 循环显示面包屑文本内容 -->
    <a-breadcrumb-item v-for="(item, index) in crumbName" :key="index">
      <!-- 判断是否有需要跳转的路由 -->
      <router-link v-if="item.route" :to="item.route">
        {{ item.name }}
      </router-link>
      <!-- 否则纯文本 -->
      <span v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  // 接受面包屑的文本和路由数据
  props: ["crumbName"]
};
</script>

<style lang="scss" scoped>
#crumbs {
  line-height: 20px;

  .ant-breadcrumb-link {
    span,
    a {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: #888;
    }

    a {
      &:hover {
        color: #1890ff;
      }
    }
  }

  & > span {
    &:last-child {
      .ant-breadcrumb-link {
        & > {
          span,
          a {
            color: #666;
            font-weight: 700;
          }
          a:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
}

.ant-breadcrumb {
  padding-left: 7px;
  border-left: 4px #0079fe solid;
}
</style>
