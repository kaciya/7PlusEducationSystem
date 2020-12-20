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
