import baseConfig from '../../.eslintrc.js';
import nextPlugin from 'eslint-plugin-next';
import typescriptParser from '@typescript-eslint/parser';

export default [
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      next: nextPlugin,
    },
    extends: ['next', 'next/core-web-vitals'],
    rules: {
      // Next.js 관련 규칙 추가
    },
  },
];
