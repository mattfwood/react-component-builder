const getConfig = require('./utils/getConfig');
const buildConfig = require('./config/buildConfig');

const chalk = require('chalk');

const reactComponentBuilder = (cli) => {
  console.log(cli.inputs);
  const config = getConfig();

  // check for configuration in package.json
  if (!config) {
    // if it doesn't exist, start config steps
    console.log(chalk.red('React Component Builder Config not found in package.json. Would you like to create one?'));
    buildConfig();
  } else {
    // if it does exist, start component generating prompts
    // const { args } = cli;
    // console.log(cli);
    console.log(config);
  }
};

module.exports = reactComponentBuilder;
