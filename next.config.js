module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
        module: "empty",
      }
    }

    return config
  },
}
