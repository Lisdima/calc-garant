module.exports = {
  publicPath: '',
  configureWebpack: {
    optimization: {
      splitChunks: false, // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
    },
  },
  // transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/styles/mixins.sass"',
      },
    },
  },
};
