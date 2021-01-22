import store from "@/store/index";

export default {
  mounted(el, binding) {
    const permission = store.state.AuthStore.userInfos.permissions;
    const key = binding.value;
    if (!permission.includes(key)) {
      el.parentNode.removeChild(el);
    }
  }
};
