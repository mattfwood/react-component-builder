// @flow

const fs = require('fs');

module.exports = () => {
  try {
    console.log('Getting Config...');
    const configFile = fs.readFileSync('./package.json', 'utf8');
    const config = JSON.parse(configFile);

    if (config.reactComponentBuilder) {
      return config.reactComponentBuilder;
    }

    return false;
  } catch (error) {
    throw new Error(error);
  }
};
