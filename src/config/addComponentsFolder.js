const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = (configFile, componentFolder) =>
  new Promise((resolve, reject) => {
    // confirm they want to use this folder
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'confirmFolder',
          message: () =>
            `Component folder found at ${chalk.bgGreen.white(componentFolder)}. Output components to this directory?`,
        },
      ])
      .then(({ confirmFolder }) => {
        // if they do, add it to the configFile
        if (confirmFolder) {
          configFile.reactComponentBuilder.componentFolder = componentFolder;
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
            .then((answer) => {
              configFile.reactComponentBuilder.componentFolder = answer.componentFolder;
              resolve(configFile);
            });
        }
      })
      .catch((error) => {
        reject(new Error(error));
      });
  })
    .then((componentConfig) => {
      console.log(componentConfig);
    })
    .catch(error =>
      new Promise((resolve, reject) => {
        if (error === 'Could not find components folder') {
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'confirmFolder',
                message: () =>
                  "Could not find folder named 'component'. Would you like to enter your component folder manually?",
              },
              {
                type: 'input',
                name: 'componentFolder',
                message:
                    'Please enter the path to your component folder (from the current directory)',
              },
            ])
            .then((answers) => {
              configFile.reactComponentBuilder.componentFolder = answers.componentFolder;
              resolve(configFile);
            });
          console.log(chalk.red("Could not find folder named 'component'"));
        }

        // if it's a different kind of error, reject with it
        reject(new Error(error));
      }));
