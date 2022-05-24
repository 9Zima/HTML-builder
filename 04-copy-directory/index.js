const fsProm = require('fs/promises');
const path = require('path');

let folderPath = path.join(__dirname, './files');
let copiedFolderPath = path.join(__dirname, './files-copy');


async function deleteOldFiles() {
  await fsProm.mkdir(copiedFolderPath, {recursive: true});
  let oldFilesList = await fsProm.readdir(copiedFolderPath, {withFileTypes: true});
  for (let file of oldFilesList)
    fsProm.rm(path.join(copiedFolderPath, file.name));
  copieFiles();
}

async function copieFiles() {
  let filesList = await fsProm.readdir(folderPath, {withFileTypes: true});
  for (let file of filesList)
    await fsProm.copyFile(path.join(folderPath, file.name), path.join(copiedFolderPath, file.name));
}

deleteOldFiles();
      