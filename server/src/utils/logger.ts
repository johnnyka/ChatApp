import fs from 'fs';
import path from 'path';

const folderDir: string = path.join(__dirname, '..', '..', 'mock_db');
const filename = 'log.txt';
const filepath: string = path.join(folderDir, filename);

export const createLogFolder = (): void => {
  fs.mkdir(folderDir, (_err) => null); // -> if (_err) Folder already exist.
};

export const logger = (username: string, message: string): void => {
  const dateTime = [
    (new Date()).toLocaleDateString(),
    (new Date()).toLocaleTimeString(),
  ].join(', ');

  let logData = [dateTime, username, message].join(' | ');
  logData = [logData, '\n'].join('');

  fs.appendFile(filepath, logData, 'utf8', (err) => {
    if (err) throw err;
  });
};

// TODO:
// BUG: Will log user 'left chat' (logout) when socket switches from polling to
// websocket after ~2 min.
