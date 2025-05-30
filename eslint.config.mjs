import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      camelcase: 'off',
      'comma-dangle': 'warn',
      'import/extensions': [
        'warn',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
        }
      ],
      'import/no-unresolved': [
        2,
        {
          caseSensitive: false
        }
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id']
          }
        }
      ],
      'jsx-a11y/media-has-caption': 'off',
      'max-len': 'off',
      'new-cap': 'warn',
      'no-console': 'warn',
      'no-param-reassign': [
        'warn',
        {
          props: false
        }
      ],
      'no-unused-vars': 'off',
      'no-var': 'warn',
      quotes: ['warn', 'single'],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          reservedFirst: ['key']
        }
      ],
      'react/react-in-jsx-scope': 'off',
      semi: ['warn', 'never'],
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
]

export default eslintConfig
