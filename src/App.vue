<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { reactive } from "vue";
export default {
  setup() {
    let locale = reactive(zhCN);
    return {
      locale
    };
  }
};
</script>

<style lang="scss">
#app {
  // 让根组件占满全屏
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
