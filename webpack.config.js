const dotEnv = require("dotenv");
const { DefinePlugin } = require("webpack");
const envParsed = dotEnv.config({ path: [".env", ".env.local"] }).parsed;

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    globalObject: 'this', // 特别重要
    library: {
      name: "moreEcho",
      type: "umd",
    },
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      vm: false,
    },
  },
  plugins: [new DefinePlugin(parseEnv(envParsed))],
};

function parseEnv(env) {
  const config = Object.keys(env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(env[key]);
    return acc;
  }, {});
  console.log(config);
  return config;
}
