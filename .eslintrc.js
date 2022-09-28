require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,

  extends: ['@totominc/react', '@totominc/react/next'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  rules: {
    // When using `next/link` component with `<a>` we have an `href` issue.
    // jsx-a11Y verify that an `<a>` always contains an `href` attribute, in
    // our case we don't because it's handled in the `next/link` component.
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight" ],
      "aspects": [ "invalidHref", "preferButton" ]
    }],
  },
};