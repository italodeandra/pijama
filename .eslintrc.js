module.exports = {
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "react/display-name": "off",
    "no-console": ["error", { allow: ["info", "error"] }],
  },
};
