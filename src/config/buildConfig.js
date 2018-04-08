const fs = require('fs');
const getComponentsFolder = require('../utils/getComponentsFolder');
const addComponentsFolder = require('./addComponentsFolder');
const featurePrompt = require('./featurePrompt');

const getStylesFolder = require('./getStylesFolder');
const addStylesFolder = require('./addStylesFolder');

module.exports = () => {
  // console.log('Building Config...');
  const configFile = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  configFile.reactComponentBuilder = {};

  // find components folder
  return getComponentsFolder()
    .then((componentFolder) => {
      return addComponentsFolder(configFile, componentFolder);
    })
    .then(() => {
      // console.log(componentConfig);
      return featurePrompt();
    })
    .then((answer) => {
      console.log(answer);
      // if stylesheets were picked as a feature
      if (answer.features.includes('Stylesheets')) {
        // try to find the folder
        return getStylesFolder()
          .then((stylesFolder) => {
            // then add it
            return addStylesFolder(configFile, stylesFolder);
          })
          .then((stylesConfig) => {
            return stylesConfig;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // return the component config if styles weren't picked
      return configFile;
    })
    .then((config) => {
      console.log(config);
    })
    .catch((error) => {
      throw new Error(error);
    });


  // write to new package.json and format it
};
