module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {},
  globals: {
    process: true,
    _:true
  }
};
