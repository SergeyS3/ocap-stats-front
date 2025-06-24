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
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // function return value can be any. tsconfig noImplicitAny is enough
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/restrict-plus-operands': ['warn', { allowNumberAndString: true }], // allow toString shorthand
      '@typescript-eslint/restrict-template-expressions': ['warn', { allowNumber: true }],
      '@typescript-eslint/no-unused-expressions': ['warn', { allowShortCircuit: true }],
      'arrow-parens': ['warn', 'as-needed'],
      'curly': ['warn', 'multi'],
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-anonymous-default-export': 'warn',
      'import/no-unresolved': 'off', // tsconfig paths are handled by webpack, rule will flag all shorthands
      'jsx-quotes': ['warn', 'prefer-single'],
      'new-parens': ['warn', 'never'],
      'no-extra-parens': 'warn',
      'object-shorthand': ['warn', 'always'],
      'semi': ['warn', 'never'],
      'quotes': ['warn', 'single'],
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
      'unicorn/switch-case-braces': ['warn', 'avoid'],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  },
)
