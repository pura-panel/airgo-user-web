const { defineConfig } = require('@lobehub/i18n-cli');

module.exports = defineConfig({
  entry: './src/i18n/locales/en-US',
  entryLocale: 'en-US',
  output: './src/i18n/locales',
  outputLocales: ['zh-CN', 'zh-TW', 'en-US', 'ja-JP', 'ko-KR', 'ru-RU'],
  experimental: {
    jsonMode: true,
  },
  markdown: {
    entry: ['./README.md'],
    entryLocale: 'en-US',
    outputLocales: ['zh-CN', 'zh-TW'],
  },
});
