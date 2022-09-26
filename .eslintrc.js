require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ['@totominc/react', '@totominc/react/next'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};