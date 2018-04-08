const fs = require('fs');
const path = require('path');

const walkSync = (dir, dirList) => {
  if (dir !== 'node_modules') {
    const files = fs.readdirSync(dir);
    dirList = dirList || [];
    files.forEach((file) => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        dirList.push(path.join(dir, file));
        dirList = walkSync(`${dir}/${file}`, dirList);
      }
    });
  }
  return dirList;
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    const rootFiles = fs.readdirSync('./');

    // get all file / directory names in root
    rootFiles.forEach((file) => {
      // check if file is directory
      const fileIsDirectory = fs.statSync(`./${file}`).isDirectory();

      if (fileIsDirectory) {
        // if it's a directory, check if it's a component directory
        if (file.toLowerCase() === 'components') {
          // if it is, great! we're done, return the folder path
          resolve(file);
        }

        // check for a src folder first, as it's most likely to have components in it
        if (file.toLowerCase() === 'src') {
          // if it's a src folder, check the files in that folder
          const srcDirectories = walkSync('./src');

          // check if one of the src directories is the component directory
          if (srcDirectories.includes('src/components')) {
            resolve('./src/components');
          }

          // if not, check all of the folders in the src directory
          srcDirectories.forEach((dir) => {
            if (dir.includes('components')) {
              resolve(dir);
            }
          });
        }

        const otherDirectories = walkSync('./');

        otherDirectories.forEach((dir) => {
          if (dir.includes('components')) {
            resolve(dir);
          }
        });

        // if it's not a src folder, check all directories
      }
    });

    // if all of this fails, prompt the user for their components folder
    reject('Could not find components folder');
  });
};
