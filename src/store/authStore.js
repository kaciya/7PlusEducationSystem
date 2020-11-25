/**
 * 鉴权共享库
 */
export default {
  state() {
    return {
      // 用户权限列表
      permissions: []
    };
  },
  mutations: {
    // 设置用户权限
    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    }
  },
  actions: {},
  getters: {}
};
