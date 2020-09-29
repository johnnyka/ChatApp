import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import validation from './api/validation';
import { createLogFolder } from './utils/logger';
import socketServer from './socket/socketServer';

const app = express();
const server: http.Server = http.createServer(app);

createLogFolder();

app.use(bodyParser.json());

app.use('/api/validation', validation);

const io = socketServer(server);

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

const handle = (): void => {
  server.close(() => {
    io.close();
    process.exit(0);
  });
};

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
