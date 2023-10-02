const path = require("path");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
  };

  // Add this alias to replace the process object
  config.resolve.alias = {
    ...config.resolve.alias,
    process: "process/browser",
  };

  return config;
};



