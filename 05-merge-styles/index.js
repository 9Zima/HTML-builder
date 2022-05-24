const fsProm = require('fs/promises');
const path = require('path');

let stylesPath = path.join(__dirname, './styles');
let bundlePath = path.join(__dirname, './project-dist/bundle.css');


async function getStylesList() {
  let stylesList = await fsProm.readdir(stylesPath, {withFileTypes: true});
  await fsProm.writeFile(bundlePath, '');
  for (let i = 0; i < stylesList.length; i++)
    if (stylesList[i].isFile()) {
      let fileContent;
      let fileName = stylesList[i].name;
      let fileExt = fileName.slice((fileName.indexOf('.')) + 1);
      if (fileExt === 'css') {
        fileContent = await fsProm.readFile(path.join(stylesPath, fileName));
        await fsProm.appendFile(bundlePath, fileContent + '\n');
      }
    }
}

getStylesList();