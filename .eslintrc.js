module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': ['error', { code: 12000 }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
  },
};
