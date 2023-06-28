/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['warn', 'never'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'no-mixed-operators': [
      'warn',
      {
        'groups': [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['in', 'instanceof'],
        ],
        'allowSamePrecedence': false,
      },
    ],
    'curly': ['warn', 'multi'],
    'quotes': ['warn', 'single'],
    'no-return-await': 'off', // Note: must disable this base rule as it can report incorrect errors
    '@typescript-eslint/return-await': ['warn', 'always'],
    'indent': ['warn', 2, {
      'ignoredNodes': ['PropertyDefinition[decorators]'],
      'SwitchCase': 1,
    }],
    'space-before-blocks': 'warn',
    'keyword-spacing': 'warn',
    'space-before-function-paren': ['warn', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    '@typescript-eslint/space-before-function-paren': ['warn', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'object-shorthand': ['warn', 'always'],
    'new-parens': ['warn', 'never'],
    'comma-dangle': 'off', // Note: must disable this base rule as it can report incorrect errors
    '@typescript-eslint/comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
      'enums': 'always-multiline',
      'generics': 'ignore', // there is trailing comma in tsx arrow function generics
      'tuples': 'always-multiline',
    }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
    '@typescript-eslint/consistent-type-imports': 'off', // bug: rule applies to .d.ts files too https://github.com/typescript-eslint/typescript-eslint/issues/3295
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off', // no need for pet project
    'no-multiple-empty-lines': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
