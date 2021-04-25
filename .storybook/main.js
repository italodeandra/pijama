module.exports = {
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  stories: ["../lib/**/*.stories.mdx", "../lib/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-env"),
      require.resolve("@babel/preset-typescript"),
      [
        require.resolve("@babel/preset-react"),
        {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      ],
    ]

    config.module.rules[0].use[0].options.plugins = [
      ...config.module.rules[0].use[0].options.plugins,
      "@emotion/babel-plugin",
    ]

    return config
  },
}
