module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'perfectionist', 'prettier'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': ['error', { semi: true }],

    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      },
    ],

    'perfectionist/sort-objects': 'error',

    'perfectionist/sort-jsx-props': 'error',
  },
};
