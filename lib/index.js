const getConfig = require('./utils/getConfig');
const buildConfig = require('./generator/config');

const chalk = require('chalk');

const reactComponentGenerate = (cli) => {
  const config = getConfig();

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
