// const fs = require('fs');
// const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'checkbox',
          message: 'Which features would you like to be included when building a component?',
          name: 'features',
          choices: ['Stylesheets', 'Unit Tests', 'Prop Types'],
        },
      ])
      .then((answers) => {
        // console.log(answers);
        resolve(answers);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};
