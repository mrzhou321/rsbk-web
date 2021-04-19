// const isProd = process.env.NODE_ENV === "production";
module.exports = {
  // devServer: {
  //   proxy: "http://ahjh.ncgl.cn"
  // },
  lintOnSave: false,
  // publicPath: "",
  // assetsDir: "",
  // indexPath: "index.html",
  productionSourceMap: false,
  // filenameHashing: false, // 去除所有文件hash
  chainWebpack: (config) => {
    config
      .entry("app")
      .clear()
      .add("babel-polyfill")
      .add("./src/main.js")
      .end();
    config.resolve.alias.set("vue$", "vue/dist/vue.esm.js");
    // 压缩插件 terser 去除console
    config.optimization.minimizer("terser").tap((args) => {
      // console.log(args);
      const compressOption = args[0].terserOptions.compress;
      compressOption.drop_console = true;
      compressOption.warnings = false;
      compressOption.drop_debugger = true;
      compressOption.pure_funcs = ["console.log"];
      return args;
    });
    // tap 修改插件参数
    config.plugin("html").tap((args) => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      };
      return args;
    });
  }
};
