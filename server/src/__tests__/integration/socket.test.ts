import { assert } from 'chai';
import express from 'express';
import socketio from 'socket.io';
import io from 'socket.io-client';
import http from 'http';
import socketServer from '../../socket/socketServer';

const PORT = 3000;
// const socketUrl = `http://localhost:${PORT}`;
const app = express();

describe('Socket', () => {

  let httpServer: http.Server;
  let ioServer: socketio.Server;
  let socket: SocketIOClient.Socket;

  beforeEach((done: Function) => {
    httpServer = http.createServer(app);      // Http server
    // ioServer = socketio(httpServer);          // socket.io server
    ioServer = socketServer(httpServer);          // socket.io server
    httpServer.listen(PORT);

    socket = io(`http://localhost:${PORT}`);  // Socket
    socket.on('connect', () => {
      done();                                 // Await socket to be connected.
    });
  });

  afterEach((done: Function) => {
    // Cleanup
    ioServer.close();
    httpServer.close();
    socket.disconnect();
    done();
  });

  it.only('Should communicate', (done: Function) => {
    // socket.emit('joinRoom', { username: 'JohnDoe' });
    ioServer.emit('hello', 'Hello Client!');
    socket.on('hello', (message: string) => {
      assert.equal(message, 'Hello Client!');
      done();
    });
    // ioServer.on('connection', (mySocket) => {
    //   console.log('mySOCKET:', mySocket);
    // });
  });

  // Doesn't work...
  // it('Should respond correctly on message event', (done: Function) => {
  //   console.log(socket.connected);
  //   socket.emit('joinRoom', { username: 'JohnDoe' })
  //   ioServer.emit('message', 'Welcome JohnDoe')
  //   socket.emit('message', 'Testing 1, 2 ,3...');
  //   ioServer.on('message', (msg: string) => {
  //     console.log('TESTING:', msg);
  //     assert.equal(msg, 'Testing 1, 2 ,3...');
  //     done();
  //   });
  // });
});
