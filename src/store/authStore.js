/**
 * 鉴权共享库
 */
export default {
  // 限定命名空间
  namespaced: true,
  state() {
    return {
      // 用户信息
      userInfos: {}
    };
  },
  mutations: {
    // 设置用户信息
    SET_USERINFOS(state, payload) {
      console.log(payload)
      state.userInfos = payload;
    },
    // 移除用户信息
    DEL_USERINFOS(state) {
      state.userInfos = {};
    }
  },
  actions: {},
  getters: {}
};
