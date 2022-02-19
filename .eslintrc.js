module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ["prettier"],
  rules: {},
};
