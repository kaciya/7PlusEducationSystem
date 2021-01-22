// 导入响应api
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";

export const useGetUserInfo = () => {
  // 使用共享库
  const store = useStore();

  // 获取用户信息数据
  const userInfos = computed(() => store.state.AuthStore.userInfos);
  // console.log(userInfos.value);

  // 返回
  return { userInfos };
};
