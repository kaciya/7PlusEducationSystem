module.exports = {
  lintOnSave: false,
  devServer: {
    // 配置跨域
    proxy: {
      "/api": {
        target: "http://pte.admin.api.banyuge.com/admin", // 设置请求接口
        changOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "", // 忽略api前缀
        },
      },
    },
  },
};
