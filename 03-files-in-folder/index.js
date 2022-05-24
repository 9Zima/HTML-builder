const fsProm = require('fs/promises');
const path = require('path');

let secretPath = path.join(__dirname, './secret-folder');

// let directList = new Promise(resolve => {
let result = [];
let dirList = fsProm.readdir(secretPath, {withFileTypes: true});
dirList.then(dirFiles => {
  for (let i = 0; i < dirFiles.length; i++) {
    let temp1;
    let fileStat = fsProm.stat(path.join(secretPath, dirFiles[i].name));
    fileStat.then(size => {temp1 = size.size;})
      .then(() => {
        if (dirFiles[i].isFile()) {
          let fullFileName = dirFiles[i].name;
          let fileName = fullFileName.slice(0, (fullFileName.indexOf('.')));
          let fileExt = fullFileName.slice((fullFileName.indexOf('.')) + 1);
          result.push(fileName + ' - ' + fileExt + ' - ' + temp1 + ' bytes');
        }
        if (i === dirFiles.length-1)
          console.log(result);
      });
  }});
// });