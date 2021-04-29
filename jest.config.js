module.exports = {
  setupFilesAfterEnv: ["<rootDir>/lib/setupTests.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/.yalc/",
    "<rootDir>/dist/",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
}
