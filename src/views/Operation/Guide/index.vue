<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '平台管理' }, { name: '备考指南' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 表格start -->
      <div class="container">
        <!-- animated 动画 -->
        <a-tabs type="card" :animated="true" @change="callback">
          <!-- 听力题型介绍 -->
          <a-tab-pane key="1" tab="听力题型介绍"
            ><Guide :guideType="type"></Guide
          ></a-tab-pane>
          <!-- 口语题型介绍 -->
          <a-tab-pane key="2" tab="口语题型介绍"
            ><Guide :guideType="type"></Guide
          ></a-tab-pane>
          <!-- 阅读题型介绍 -->
          <a-tab-pane key="3" tab="阅读题型介绍"
            ><Guide :guideType="type"></Guide
          ></a-tab-pane>
          <!-- 写作题型介绍 -->
          <a-tab-pane key="4" tab="写作题型介绍"
            ><Guide :guideType="type"></Guide
          ></a-tab-pane>
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
// 备考指南表格组件
import Guide from "@/components/Guide";
import { ref } from "vue";
export default {
  // 使用组件
  components: {
    Crumbs,
    Guide
  },
  // setup响应api入口
  setup() {
    // 每种题型对应的Type默认为听力题型介绍
    let type = ref(1);
    // tabs切换事件
    // key 点击切换对应的key值
    let callback = key => {
      // 每个tabs切换项的key和题型Type相对应
      type.value = key;
    };
    return {
      type,
      callback
    };
  }
};
</script>

<style lang="scss" scoped></style>
