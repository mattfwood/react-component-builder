const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = (configFile, stylesFolder) =>
  new Promise((resolve, reject) => {
    // confirm they want to use this folder
    if (stylesFolder !== 'Could not find styles folder') {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'confirmFolder',
            message: () =>
              `Styles folder found at ${chalk.bgGreen.white(stylesFolder)}. Output stylesheets to this directory?`,
          },
        ])
        .then(({ confirmFolder }) => {
          // if they do, add it to the configFile
          if (confirmFolder) {
            configFile.reactComponentBuilder.stylesFolder = stylesFolder;
            resolve(configFile);
          } else {
            // otherwise, prompt them for the folder they do want
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'stylesFolder',
                  message:
                    'Please enter the path to your component folder (from the current directory)',
                },
              ])
              .then((answer) => {
                configFile.reactComponentBuilder.stylesFolder = answer.stylesFolder;
                resolve(configFile);
              });
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      // if folder couldn't be found, prompt user for it
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'confirmFolder',
            message: () =>
              'Could not find styles folder. Would you like to enter your stylesheet folder manually?',
          },
          {
            type: 'input',
            name: 'stylesFolder',
            message: 'Please enter the path to your component folder (from the current directory)',
          },
        ])
        .then((answers) => {
          configFile.reactComponentBuilder.stylesFolder = answers.stylesFolder;
          resolve(configFile);
        })
        .catch((error) => {
          console.log(chalk.red("Could not find folder named 'component'"));
          throw new Error(error);
        });
    }
  });
