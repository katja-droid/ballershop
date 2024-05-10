const { override, addBabelPlugin, addWebpackResolve, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addBabelPlugin('@babel/plugin-proposal-optional-chaining'),

  // Add resolve fallback for "crypto" module
  addWebpackResolve({
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util/")
    }
  }),

 
);
