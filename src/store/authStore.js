/**
 * 鉴权共享库
 */
export default {
  state() {
    return {
      // 用户信息
      userInfos: []
    };
  },
  mutations: {
    // 设置用户权限
    SET_USERINFOS(state, payload) {
      state.userInfos = payload;
    }
  },
  actions: {},
  getters: {}
};
