const fs = require('fs');
const path = require('path');

const txtFilePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(txtFilePath);
let fileData = '';

readStream.on('data', chunk => fileData += chunk);
readStream.on('end', () => console.log(fileData));


