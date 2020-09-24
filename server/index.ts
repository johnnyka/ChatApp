import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import validation from './api/validation';
import { storeUser, getUser, removeUser } from './utils/users';
import { messageObj } from './utils/messages';
import logger from './utils/logger';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());

app.use('/api/validation', validation);

io.on('connect', (socket) => {
  const room = 'Chat room';
  const botName = 'ChatBot';

  // When a new user joins the chat room...
  socket.on('joinRoom', ({ username }: { username: string }) => {
    logger(username, 'Joined chat');

    const allUsers = storeUser({ id: socket.id, username });
    console.log('joinRoom, All users:', socket.id, username);

    // Subscribe socket to channel.
    socket.join(room);

    // Emit a welcome message to user.
    socket.emit('message', messageObj(botName, `Welcome to ${room}, ${username}. Say 👋 \u00A0 to your friends!`));

    // Broadcast that new user has joined.
    socket.broadcast.to(room).emit('message', messageObj(botName, `${username} joined the chat.`));

    // Emit chat info.
    io.to(room).emit('chatInfo', { users: allUsers });
  });

  // When the user is typing a message...
  socket.on('isTyping', (bool: boolean) => {
    console.log('isTyping, socket:', socket.id);

    const user = getUser(socket.id);

    // Broadcast.
    if (user) socket.broadcast.to(room).emit('isTyping', { user: user.username, isTyping: bool });
  });

  // When a new message is received...
  socket.on('message', (msg) => {
    console.log('message, socket:', socket.id)
    
    const user = getUser(socket.id);
    if (user) {
      logger(user.username, msg);
      
      // Broadcast message.
      socket.broadcast.to(room).emit('message', messageObj(user.username, msg))
    }    
  });

  // When user disconnects...
  socket.on('disconnect', () => {
    console.log('disconnect, socket:', socket.id);

    const user = getUser(socket.id);
    if (user) {
      logger(user.username, 'Left chat');
      
      // Broadcast message.
      socket.broadcast.to(room).emit('message', messageObj(botName, `${user.username} left the chat.`))
    }

    // Broadcast chat info.
    const allUsers = removeUser(socket.id);
    socket.broadcast.to(room).emit('chatInfo', { users: allUsers })
  });

});

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
