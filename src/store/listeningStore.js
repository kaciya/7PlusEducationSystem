/**
 * 听力题库共享库
 */
export default {
  state() {
    return {
      // SST添加模态框 显示与隐藏
      addSSTVisible: false
    };
  },
  mutations: {
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
