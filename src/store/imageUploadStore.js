/**
 * @author Lemon
 * 文件上传储存文件
 * */

export default {
  // 限定命名空间
  namespaced: true,
  state() {
    return {
      // 文件列表
      fileList: null,
      // 储存返回的图片信息
      fileUrl: ""
    };
  },
  mutations: {
    // 设置图片文件
    SET_IMAGE_FILES(state, payload) {
      state.fileList = payload;
    },
    // 删除图片文件
    DEL_IMAGE_FILES(state) {
      state.fileList = null;
    },
    // 设置图片地址
    SET_IMAGE_URL(state, payload) {
      state.fileUrl = payload;
    },
    // 删除图片地址
    DEL_IMAGE_URL(state) {
      state.fileUrl = "";
    }
  },
  actions: {},
  getters: {}
};
