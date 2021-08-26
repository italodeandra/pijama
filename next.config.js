const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        mongodb: false,
        "mongodb-memory-server": false,
        "socket.io": false,
        nodemailer: false,
        mailgen: false,
      };
    }
    return config;
  },
  serverRuntimeConfig: {
    appEnv: process.env.APP_ENV || "development",
    mongodbUri: process.env.MONGODB_URI,
  },
});
