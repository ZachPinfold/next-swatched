module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testEnvironment: "jsdom",
  transform: {
    // "^.+\\.tsx?$": "<rootDir>/node_modules/jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
};
