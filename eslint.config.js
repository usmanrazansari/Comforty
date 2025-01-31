module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Add any TypeScript specific rules here
      },
    },
  ],
}; 