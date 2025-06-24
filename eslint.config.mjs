import tsEslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import unicornPlugin from 'eslint-plugin-unicorn'


export default tsEslint.config(
  tsEslint.configs.strictTypeChecked,
  tsEslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs['recommended-latest'],
  unicornPlugin.configs.recommended,
  promisePlugin.configs['flat/recommended'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/restrict-plus-operands': ['error', { allowNumberAndString: true }], // allow toString shorthand
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      'arrow-parens': ['error', 'as-needed'],
      'curly': ['error', 'multi'],
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-anonymous-default-export': 'error',
      'import/no-unresolved': 'off', // tsconfig paths are handled by webpack, rule will flag all shorthands
      'jsx-quotes': ['error', 'prefer-single'],
      'new-parens': ['error', 'never'],
      'no-extra-parens': 'error',
      'object-shorthand': ['error', 'always'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'unicorn/explicit-length-check': 'off',
      'unicorn/filename-case': ['error', {
        case: 'kebabCase',
        ignore: [/^use.*\.ts$/, /Error\.ts/, /\.tsx$/],
      }],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/switch-case-braces': ['error', 'avoid'],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
)
