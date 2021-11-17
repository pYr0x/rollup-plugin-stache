module.exports = {
  launch: {
    dumpio: true,
    headless: true,
    product: 'chrome',
  },
  browserContext: 'default',
  server: {
    command: 'npm run start',
    port: 8081,
    launchTimeout: 10000
  },
}
