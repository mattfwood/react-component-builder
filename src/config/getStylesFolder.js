const fs = require('fs');
const path = require('path');

const walkSync = (dir, dirList) => {
  if (dir !== 'node_modules') {
    const files = fs.readdirSync(dir);
    dirList = dirList || [];
    files.forEach((file) => {
      const fileIsDirectory = fs.statSync(path.join(dir, file)).isDirectory();
      if (fileIsDirectory && file !== 'node_modules') {
        dirList.push(path.join(dir, file));
        dirList = walkSync(`${dir}/${file}`, dirList);
      }
    });
  }
  return dirList;
};

module.exports = () => {
  return new Promise((resolve) => {
    const rootFiles = fs.readdirSync('./').filter(dir => dir !== 'node_modules');

    // get all file / directory names in root
    rootFiles.forEach((file) => {
      // check if file is directory
      const fileIsDirectory = fs.statSync(`./${file}`).isDirectory();

      if (fileIsDirectory) {
        // if it's a directory, check if it's a styles directory
        if (file.toLowerCase().includes('style')) {
          // if it is, great! we're done, return the folder path
          resolve(file);
        }

        // check for a src folder first, as it's most likely to have components in it
        if (file.toLowerCase() === 'src') {
          // if it's a src folder, check the files in that folder
          const srcDirectories = walkSync('./src');

          // if not, check all of the folders in the src directory
          srcDirectories.forEach((dir) => {
            if (dir.includes('style')) {
              resolve(dir);
            }
          });
        }

        // if it's not in the src folder, check all directories
        const otherDirectories = walkSync('./');

        otherDirectories.forEach((dir) => {
          if (dir.includes('style')) {
            resolve(dir);
          }
        });
      }
    });

    // if all of this fails, prompt the user for their components folder
    resolve('Could not find styles folder');
  });
};
