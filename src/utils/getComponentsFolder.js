const fs = require('fs');

const walkSync = require('walk-sync');

module.exports = () => {
  const directories = walkSync('./', { ignore: ['node_modules', '.git'] });

  // filter all directories that contain the word components
  const componentFolderMatches = directories.filter((dir) => {
    return dir.includes('components') && fs.statSync(`./${dir}`).isDirectory();
  });

  // make sure components is the last folder to avoid folders nested in components folder
  return componentFolderMatches.filter((dir) => {
    const folderPath = dir.split('/').slice(0, -1);
    return folderPath[folderPath.length - 1] === 'components';
  });

  // if only one component folder is found, return it
  // if (componentFolderMatches.length === 1) {
  // }

  // if (componentFolderMatches.length === 0) {
  //   return componentFolderMatches;
  // }

  // if (componentFolderMatches.length > 1) {
  //   return componentFolderMatches;
  // }
  // console.log(componentFolderMatches);
  // return new Promise((resolve, reject) => {
  // const rootFiles = fs.readdirSync('./').filter(dir => dir !== 'node_modules');
  // let componentFolder;

  // // get all file / directory names in root
  // for (let i = 0; i < rootFiles.length; i++) {
  //   const file = rootFiles[i];
  //   // check if file is directory
  //   const fileIsDirectory = fs.statSync(`./${file}`).isDirectory();

  //   if (fileIsDirectory) {
  //     // if it's a directory, check if it's a component directory
  //     if (file.toLowerCase() === 'components') {
  //       // if it is, great! we're done, return the folder path
  //       componentFolder = file;
  //       break;
  //       // return file;
  //     }

  //     // check for a src folder first, as it's most likely to have components in it
  //     if (file.toLowerCase() === 'src') {
  //       // if it's a src folder, check the files in that folder
  //       const srcDirectories = walkSync('./src');

  //       // check if one of the src directories is the component directory
  //       if (srcDirectories.includes('src/components')) {
  //         componentFolder = './src/components';
  //         break;
  //       }

  //       // if not, check all of the folders in the src directory
  //       // srcDirectories.forEach((dir) => {
  //       for (let j = 0; j < srcDirectories.length; j++) {
  //         const dir = srcDirectories[i]
  //         if (dir.includes('components')) {
  //           componentFolder = dir;
  //           break;
  //           // return dir;
  //         }
  //       }
  //       // });
  //     }

  //     // if it's not in the src folder, check all directories
  //     const otherDirectories = walkSync('./');

  //     // otherDirectories.forEach((dir) => {

  //     for (let k = 0; k < otherDirectories.length; k++) {
  //       const dir = otherDirectories[i];
  //       if (dir.includes('components')) {
  //         componentFolder = dir;
  //         break;
  //       }
  //     }
  //     // });
  //   }
  // }

  // console.log(componentFolder);
  // rootFiles.forEach((file) => {
  // });

  // if all of this fails, prompt the user for their components folder
  // return 'Could not find components folder';
  // });
};
