/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2023: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:deprecation/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
      ],
      rules: {
        '@typescript-eslint/array-type': ['warn', { default: 'array' }],
        '@typescript-eslint/comma-dangle': ['warn', {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
          'functions': 'always-multiline',
          'enums': 'always-multiline',
          'generics': 'ignore', // There is trailing comma in tsx arrow function generics
          'tuples': 'always-multiline',
        }],
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'arrow-parens': ['warn', 'as-needed'],
        'curly': ['warn', 'multi'],
        'import/no-anonymous-default-export': 'warn',
        'import/no-unresolved': 'off', // Unable to resolve path to module 'react-dom/client'
        'jsx-quotes': ['warn', 'prefer-single'],
        'new-parens': ['warn', 'never'],
        'no-extra-parens': 'warn',
        'object-shorthand': ['warn', 'always'],
        'semi': ['warn', 'never'],
        'quotes': ['warn', 'single'],
        'unicorn/explicit-length-check': 'off',
        'unicorn/filename-case': ['error', {
          case: 'kebabCase',
          ignore: ['^use.*\\.ts$', '.*\\.tsx$'],
        }],
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-dom-node-append': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/switch-case-braces': ['warn', 'avoid'],
      },
    },
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
      },
    },
  ],
}
