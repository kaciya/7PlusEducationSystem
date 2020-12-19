/**
 * 口语题库共享库
 */
export default {
  // 限定命名空间
  namespaced: true,
  state() {
    return {
      // RA查看模态框 显示与隐藏
      getRAVisible: false
    };
  },
  mutations: {
    /**
     * 是否显示查看模态框
     * @param {*} state
     * @param {*} payload 题型 type:string，是否显示 visible:boolean
     */
    SHOW_GETMODAL(state, payload) {
      state[`get${payload.type.toUpperCase()}Visible`] = payload.visible;
      console.log(state.getRAVisible);
    },
    /**
     * 是否显示添加模态框
     * @param {*} state
     * @param {*} payload 题型 type:string，是否显示 visible:boolean
     */
    SHOW_ADDMODAL(state, payload) {
      state[`add${payload.type.toUpperCase()}Visible`] = payload.visible;
    }
  },
  actions: {},
  getters: {}
};
