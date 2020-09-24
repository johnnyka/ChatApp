import fs from 'fs';
import path from 'path';

const logger = (username: string, message: string) => {

  const dateTime = [
    (new Date()).toLocaleDateString(),
    (new Date()).toLocaleTimeString()
  ].join(', ');

  let logData = [dateTime, username, message].join(' | ');
  logData = [logData, '\n'].join('');

  const filepath = path.join(__dirname, '..', '..', 'mock_db', 'log.txt');

  fs.appendFile(filepath, logData, 'utf8', (err) => {
    if (err) throw err;
  })
};

export default logger;
