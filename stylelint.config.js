module.exports = {
  root: true,
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'rule-empty-line-before': 'never',
    'function-comma-space-after': 'always',
    'function-url-quotes': 'never',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'extend'],
      },
    ],
    'order/properties-order': require('fs-css-order').propertiesOrder,
  },
};
