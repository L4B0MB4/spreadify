const webpack = require("webpack");
const withSass = require("@zeit/next-sass");

if (process.env.NODE_ENV == "production") {
  module.exports = withSass({
    webpack(config, options) {
      options.config.optimization = {
        minimize: true,
        splitChunks: true
      };
      return config;
    }
  });
} else {
  module.exports = withSass();
}
