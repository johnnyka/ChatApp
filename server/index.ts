import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import validation from './api/validation';
import { storeUser, getUser, removeUser } from './utils/users';
import messageObj from './utils/messages';
import { logger, createLogFolder } from './utils/logger';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

createLogFolder();

app.use(bodyParser.json());

app.use('/api/validation', validation);

const inactivityTime: number = 15 * 60 * 1000;

io.on('connect', (socket) => {
  const room = 'Chat room';
  const botName = 'ChatBot';

  let isInactive = false;

  // When a new user joins the chat room...
  socket.on('joinRoom', ({ username }: { username: string }) => {
    console.log('joinRoom, All users:', socket.id, username);
    logger(username, 'Joined chat.');

    const allUsers = storeUser({ id: socket.id, username });

    socket.join(room);
    socket.emit('message', messageObj(botName, `Welcome to ${room}, ${username}. Say 👋  to your friends!`));
    socket.broadcast.to(room).emit('message', messageObj(botName, `${username} joined the chat.`));
    io.to(room).emit('chatInfo', { users: allUsers });
  });

  let timer: NodeJS.Timeout;

  // When the user is typing a message...
  socket.on('isTyping', (bool: boolean) => {
    const user = getUser(socket.id);
    console.log('isTyping, socket:', socket.id, user.username);

    socket.broadcast.to(room).emit('isTyping', { user: user.username, isTyping: bool });

    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('inactivity, socket:', socket.id, user.username);
      isInactive = true;
      logger(user.username, 'Disconnected due to inactivity.');
      socket.disconnect(true);
      socket.broadcast.to(room).emit('message', messageObj(botName, `${user.username} was disconnected due to inactivity.`));
      const allUsers = removeUser(socket.id);
      socket.broadcast.to(room).emit('chatInfo', { users: allUsers });
    }, inactivityTime);
  });

  // When a new message is received...
  socket.on('message', (msg: string) => {
    const user = getUser(socket.id);
    console.log('message, socket:', socket.id, user.username);
    logger(user.username, msg);
    io.to(room).emit('message', messageObj(user.username, msg));
  });

  // When user disconnects...
  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    console.log('disconnect, socket:', socket.id, user.username);
    logger(user.username, 'Left chat.');
    if (!isInactive) socket.broadcast.to(room).emit('message', messageObj(botName, `${user.username} left the chat.`));
    socket.broadcast.to(room).emit('isTyping', { user: user.username, isTyping: false });

    const allUsers = removeUser(socket.id);
    socket.broadcast.to(room).emit('chatInfo', { users: allUsers });
  });
});

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
