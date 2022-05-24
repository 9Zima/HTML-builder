const fsProm = require('fs/promises');
const path = require('path');

const stylesPath = path.join(__dirname, './styles');
const HTMLTemplatePath = path.join(__dirname, './template.html');
const assetsPath = path.join(__dirname, './assets');
const htmlComponentsPath = path.join(__dirname, './components');

const finalStylePath = path.join(__dirname, './project-dist/style.css');
const finalHTMLPagePath = path.join(__dirname, './project-dist/index.html');
const finalAssetsPath = path.join(__dirname, './project-dist/assets');

async function getStylesList() {
  let templateContent, stredTemplate, HTMLComponents,
    stylesList, 
    assetsFolders, assetsFiles;

  await fsProm.mkdir(__dirname + '/project-dist', {recursive: true});
  await fsProm.mkdir(finalAssetsPath, {recursive: true});
  await fsProm.writeFile(finalStylePath, '');
  await fsProm.writeFile(finalHTMLPagePath, '');

  assetsFolders = await fsProm.readdir(assetsPath);
  for (let assetFolder of assetsFolders) {
    await fsProm.mkdir(finalAssetsPath + '/' + assetFolder, {recursive: true});
    assetsFiles = await fsProm.readdir(assetsPath + '/' + assetFolder);
    for (let file of assetsFiles) {
      await fsProm.copyFile(assetsPath + '/' + assetFolder + '/' + file, finalAssetsPath + '/' + assetFolder + '/' + file);
    }
  }

  stylesList = await fsProm.readdir(stylesPath, {withFileTypes: true});
  for (let i = 0; i < stylesList.length; i++)
    if (stylesList[i].isFile()) {
      let fileContent;
      let fileName = stylesList[i].name;
      let fileExt = fileName.slice((fileName.indexOf('.')) + 1);
      if (fileExt === 'css') {
        fileContent = await fsProm.readFile(path.join(stylesPath, fileName));
        await fsProm.appendFile(finalStylePath, fileContent + '\n');
      }
    }


  HTMLComponents = await fsProm.readdir(htmlComponentsPath, {withFileTypes: true});
  await fsProm.copyFile(HTMLTemplatePath, finalHTMLPagePath);
  for (let component of HTMLComponents) {
    let temp = await fsProm.readFile(path.join(htmlComponentsPath, `./${component.name}`));
    templateContent = await fsProm.readFile(finalHTMLPagePath);
    await fsProm.rm(finalHTMLPagePath);
    await fsProm.writeFile(finalHTMLPagePath, '');
    stredTemplate = templateContent.toString().split('\r\n');
    for (let string of stredTemplate)
      if (string.trim() === `{{${component.name.slice(0, component.name.indexOf('.'))}}}`) 
        await fsProm.appendFile(finalHTMLPagePath, temp.toString());
      else
        await fsProm.appendFile(finalHTMLPagePath, string + '\r\n');
  }
}

getStylesList();
