exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub', // targetting your local running instance of the selenium webdriver
  specs: ['./src/features/**/*.feature'],
  capabilities: {
    browserName: 'chrome'
  },
  framework: 'custom', // use the cucumber framework
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./src/steps/**/*.steps.ts'], // our actual tests
  },
  onPrepare: function() {
    browser.manage().window().maximize(); // maximize the browser before executing the feature files
  },
  beforeLaunch: () => {
    
  }
};
