module.exports = {
  default: {
    paths: ['Resources/featureFiles/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/stepDefinitions/*.ts', 'src/support/*.ts'],
    format: ['progress'],
    parallel: 1,
  },
};
