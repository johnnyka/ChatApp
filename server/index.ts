import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import validation from './api/validation';
import { storeUser } from './utils/users';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());

app.use('/api/validation', validation);

io.on('connect', (socket) => {
  const room = 'Chat room';

  // When a new user joins the chat room...
  socket.on('joinRoom', ({ username }: { username: string }) => {

    const allUsers = storeUser({ id: socket.id, username });
    console.log('joinRoom, All users:', socket.id, username);

    // Subscribe socket to channel.
    socket.join(room);

    // Emit a welcome message to user.
    socket.emit('welcome', `Welcome to ${room}, ${username}. Say 👋 to your fellows!`);

    // Broadcast that new user has joined.
    socket.broadcast.to(room).emit('notification', `${username} has joined the chat.`);

    // Emit all user data.
    io.to(room).emit('allUserData', { users: allUsers });
  });

  // When a new message is reveived...
  socket.on('newMsg', (msg) => {
    console.log('newMsg, socket:', socket.id)
    // Broadcast message.
    socket.broadcast.to(room).emit('newMsg', msg);
  });

});

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
