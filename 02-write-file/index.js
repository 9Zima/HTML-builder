const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const txtFilePath = path.join(__dirname, 'text.txt');

fs.writeFile(
  txtFilePath,
  '',
  (err) => {
    if (err) throw err;
    console.log('File was created.');
    stdout.write('Please, write a string:\n');
  }
);
stdin.on('data', data => {
  let stringifiedData = data.toString().trim();
  if (stringifiedData === 'exit')
    process.exit();
  fs.appendFile(
    txtFilePath,
    data,
    err => {
      if (err) throw err;
      console.log('File was changed.');
      stdout.write('\nPlease, write a string:\n');
    }
  );
});
process.on('exit', code => code === 0 ? stdout.write('Farewell') : console.error('Error'));
process.on('SIGINT', () => process.exit());