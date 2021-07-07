module.exports = {
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "react/display-name": "off",
    "no-console": ["error", { allow: ["info", "error"] }],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: "Please import from the first level.",
          },
        ],
        patterns: [
          {
            group: [
              "@material-ui/*/*/*",
              "!@material-ui/core/test-utils/*",
              "!@material-ui/core/styles/shadows",
            ],
            message: "Please import from the second level.",
          },
        ],
      },
    ],
  },
};
