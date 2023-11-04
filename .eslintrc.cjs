module.exports = {
  'root': true,
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2022,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
  'env': {
    'browser': true,
    'es2022': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  'plugins': ['@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  'rules': {
    'no-console': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/order': [
      2,
      {
        pathGroups: [
          '~',
        ].map(
            (layer) => ({
              pattern: `**/?(*)${layer}{,/**}`,
              group: 'internal',
            }),
        ),
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'jsx-a11y/alt-text': [
      'warn',
      {
        'elements': ['img'],
        'img': ['Image'],
      },
    ],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
  },
}
