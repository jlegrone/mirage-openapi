module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
}
