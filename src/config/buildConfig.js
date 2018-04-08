const fs = require('fs');
const getComponentsFolder = require('../utils/getComponentsFolder');
const addComponentsFolder = require('./addComponentsFolder');

module.exports = () => {
  console.log('Building Config...');
  const configFile = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  configFile.reactComponentBuilder = {};

  // find components folder
  getComponentsFolder()
    .then((componentFolder) => {
      return addComponentsFolder(configFile, componentFolder);
    })
    .then((componentConfig) => {
      console.log(componentConfig);
    })
    .catch((error) => {
      throw new Error(error);
    });


  // write to new package.json and format it
};
