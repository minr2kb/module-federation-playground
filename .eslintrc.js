import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist'],
  },
  {
    root: true,
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    extends: [js.configs.recommended],
    rules: {
      // 공통 규칙
    },
  },
];
