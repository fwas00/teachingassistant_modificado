const { uiBaseUrl } = require('./api');

exports.config = {
  directConnect: true,
  baseUrl: uiBaseUrl,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ['../features/**/*.feature'],
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    }
  },
  cucumberOpts: {
    require: ['../support/hooks.js', '../steps/**/*.js', '../service/**/*.js'],
    format: ['progress'],
    strict: true,
    tags: []
  },
  onPrepare() {
    require('ts-node').register({ transpileOnly: true });
  }
};
