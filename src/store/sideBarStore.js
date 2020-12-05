/**
 * 侧边栏共享库
 */
export default {
  // 限定命名空间
  namespaced: true,
  state() {
    return {
      // 侧边栏伸缩状态
      collapsed: false
    };
  },
  mutations: {
    // 切换侧边栏伸缩状态
    SET_COLLAPSED(state) {
      state.collapsed = !state.collapsed;
    }
  },
  actions: {},
  getters: {}
};
