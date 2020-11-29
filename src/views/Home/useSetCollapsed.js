// 引入响应api
import { ref } from "vue";

export const useSetCollapsed = () => {
  // 侧边栏伸缩状态 默认false
  let collapsed = ref(false);

  return {
    collapsed
  };
};
