// 导入响应api
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";

export const useGetUserInfo = () => {
  const store = useStore();
  const userInfos = computed(() => store.state.AuthStore.userInfos);
  // console.log(userInfos.value);
  // 返回
  return { userInfos };
};
