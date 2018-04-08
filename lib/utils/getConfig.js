const fs = require('fs');

module.exports = () => {
  try {
    const configFile = fs.readFileSync('./package.json', 'utf8');
    const config = JSON.parse(configFile);

    if (config.reactComponentGenerator) {
      return config.reactComponentGenerator;
    }

    return false;
  } catch (error) {
    throw new Error(error);
  }
};
