const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    // 配置跨域
    proxy: {
      "/api": {
        target: "http://pte.admin.api.banyuge.com/admin", // 设置请求接口
        changOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "" // 忽略api前缀
        }
      }
    }
  },
  // 修改全局html标题
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      // console.log(args);
      args[0].title = "柒加教育-后台管理";
      return args;
    });
  },

  // 引入外部资源
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      echarts: "echarts"
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    ]
  },
  // favicon图标配置
  pwa: {
    iconPaths: {
      favicon32: "./favicon.ico",
      favicon16: "./favicon.ico",
      appleTouchIcon: "./favicon.ico",
      maskIcon: "./favicon.ico",
      msTileImage: "./favicon.ico"
    }
  }
};
