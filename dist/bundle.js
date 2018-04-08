'use strict';

var getConfig = require('./utils/getConfig');
var buildConfig = require('./generator/config');

var chalk = require('chalk');

var reactComponentGenerate = function reactComponentGenerate(cli) {
  var config = getConfig();

  // check for configuration in package.json
  if (!config) {
    // if it doesn't exist, start config steps
    console.log(chalk.red('React Component Generate Config not found in package.json. Would you like to create one?'));
    buildConfig();
  } else {
    // if it does exist, start component generating prompts
    // const { args } = cli;
    console.log(cli);
    console.log(config);
  }
};

module.exports = reactComponentGenerate;
