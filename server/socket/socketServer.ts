import http from 'http';
import socketio from 'socket.io';
import { storeUser, getUser, removeUser } from '../utils/users';
import messageObj from '../utils/messages';
import { logger } from '../utils/logger';
import inactivityTime from '../utils/constants';

const socketServer = (server: http.Server): socketio.Server => {
  const io: socketio.Server = socketio(server);

  io.on('connect', (socket: socketio.Socket) => {
    const room = 'Chat room';
    const botName = 'ChatBot';

    let isInactive = false;

    // When a new user joins the chat room...
    socket.on('joinRoom', ({ username }: { username: string }) => {
      logger(username, 'Joined chat.');

      const allUsers = storeUser({ id: socket.id, username });

      socket.join(room);
      socket.emit('message', messageObj(botName, `Welcome to ${room}, ${username}. Say 👋\u00A0 to your friends!`));
      socket.broadcast.to(room).emit('message', messageObj(botName, `${username} joined the chat.`));
      io.to(room).emit('chatInfo', { users: allUsers });
    });

    let timer: NodeJS.Timeout;

    // When the user is typing a message...
    socket.on('isTyping', (bool: boolean) => {
      const user = getUser(socket.id);

      socket.broadcast.to(room).emit('isTyping', { user: user.username, isTyping: bool });

      clearTimeout(timer);
      timer = setTimeout(() => {
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
      logger(user.username, msg);
      io.to(room).emit('message', messageObj(user.username, msg));
    });

    // When user disconnects...
    socket.on('disconnect', () => {
      const user = getUser(socket.id);
      logger(user.username, 'Left chat.');
      if (!isInactive) socket.broadcast.to(room).emit('message', messageObj(botName, `${user.username} left the chat.`));
      socket.broadcast.to(room).emit('isTyping', { user: user.username, isTyping: false });

      const allUsers = removeUser(socket.id);
      socket.broadcast.to(room).emit('chatInfo', { users: allUsers });
    });
  });

  return io;
};

export default socketServer;
