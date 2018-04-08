const fs = require('fs');
const getComponentsFolder = require('../utils/getComponentsFolder');

const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = () => {
  const configFile = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  configFile.reactComponentGenerate = {};

  // find components folder
  getComponentsFolder()
    .then(result =>
      new Promise((resolve, reject) => {
        // confirm they want to use this folder
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'confirmFolder',
              message: () =>
                `Component folder found at ${chalk.bgGreen.white(result)}. Output components to this directory?`,
            },
          ])
          .then(({ confirmFolder }) => {
            // if they do, add it to the configFile
            if (confirmFolder) {
              configFile.reactComponentGenerate.componentFolder = result;
              resolve(configFile);
            } else {
              // otherwise, prompt them for the folder they do want

              inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'componentFolder',
                    message:
                      'Please enter the path to your component folder (from the current directory)',
                  },
                ])
                .then(({ componentFolder }) => {
                  configFile.reactComponentGenerate.componentFolder = componentFolder;
                  resolve(configFile);
                });
            }
          })
          .catch((error) => {
            reject(new Error(error));
          });
      }).then((componentConfig) => {
        console.log(componentConfig);
      }))
    .catch(error =>
      new Promise((resolve, reject) => {
        if (error === 'Could not find components folder') {
          // console.log('Could not find components folder');
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'confirmFolder',
                message: () =>
                  'Could not find folder named \'component\'. Would you like to enter your component folder manually?',
              },
              {
                type: 'input',
                name: 'componentFolder',
                message:
                    'Please enter the path to your component folder (from the current directory)',
              },
            ])
            .then(({ componentFolder }) => {
              configFile.reactComponentGenerate.componentFolder = componentFolder;
              resolve(configFile);
            });
          console.log(chalk.red("Could not find folder named 'component'"));
        }
        reject(new Error(error));
      }));

  // write to new package.json and format it
};
