import fs from 'fs';
import path from 'path';

const folderDir: string = path.join(__dirname, '..', '..', 'mock_db');
const filename: string = 'log.txt';
const filepath: string = path.join(folderDir, filename);

export const createLogFolder = () => {
  fs.mkdir(folderDir, (err) => {
    if (err) return null; // -> Folder already exist.
  });
};

export const logger = (username: string, message: string) => {

  const dateTime = [
    (new Date()).toLocaleDateString(),
    (new Date()).toLocaleTimeString()
  ].join(', ');

  let logData = [dateTime, username, message].join(' | ');
  logData = [logData, '\n'].join('');

  fs.appendFile(filepath, logData, 'utf8', (err) => {
    if (err) throw err;
  })
};
