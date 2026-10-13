module.exports = {
  default: {
    paths: ['Resources/featureFiles/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/stepDefinitions/*.ts', 'src/support/*.ts'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'allure-cucumberjs/reporter',
      'rerun:@rerun.txt'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    parallel: 1,
  },
};
