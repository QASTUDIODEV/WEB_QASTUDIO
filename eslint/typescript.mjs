import tslint from '@typescript-eslint/eslint-plugin'

export default {
  plugins: {
    '@typescript-eslint': tslint,
  },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    'camelcase': 'off',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: { regex: '^I[A-Z]', match: true },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: { regex: '^T[A-Z]', match: true },
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
}
