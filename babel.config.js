module.exports = {
  plugins: ["@emotion/babel-plugin"],
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          importSource: "@emotion/react",
          runtime: "automatic",
        },
      },
    ],
  ],
}
