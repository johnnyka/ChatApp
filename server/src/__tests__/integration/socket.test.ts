import { assert } from 'chai';
import express from 'express';
import socketio from 'socket.io';
import io from 'socket.io-client';
import http from 'http';
import socketServer from '../../socket/socketServer';
import { TMessage } from '../../utils/types';

const PORT = 3000;
const app = express();

let httpServer: http.Server;
let ioServer: socketio.Server;
let socket1: SocketIOClient.Socket;
let socket2: SocketIOClient.Socket;

const testName1: string = 'JohnDoe';
const testName2: string = 'SaraSmith';

beforeAll((done: Function) => {
  httpServer = http.createServer(app);      // Http server
  ioServer = socketServer(httpServer);      // socket.io server
  httpServer.listen(PORT);

  socket1 = io(`http://localhost:${PORT}`); // Socket
  socket2 = io(`http://localhost:${PORT}`);
  socket1.on('connect', () => {
  });
  socket2.on('connect', () => {
    done();                                 // Await socket to be connected.
  });
});

afterAll((done: Function) => {
  // Cleanup
  ioServer.close();
  httpServer.close();
  socket1.close();
  socket2.close();
  done();
});

describe('Socket configuration...', () => {
  it('Should communicate', (done: Function) => {
    ioServer.emit('hello', 'Hello Client!');
    socket1.once('hello', (message: string) => {
      assert.equal(message, 'Hello Client!');
      done();
    });
  });

  describe('One client socket...', () => {

    beforeEach((done: Function) => {
      socket1.emit('joinRoom', { username: testName1 });
      done();
    });

    it('Should give welcome response upon joinRoom event', (done: Function) => {
      const author: string = 'ChatBot';
      const time: string = (new Date()).toLocaleTimeString().slice(0, 5);

      socket1.once('message', (msg: TMessage) => {
        assert.equal(msg.author, author);
        assert.equal(msg.time, time);
        assert.match(msg.message, new RegExp(testName1));
        assert.notMatch(msg.message, new RegExp(`${testName1}_2`));
        done();
      });
    });
  });

  describe('Two client sockets...', () => {

    beforeEach((done: Function) => {
      socket1.emit('joinRoom', { username: testName1 });
      socket2.emit('joinRoom', { username: testName2 });
      done();
    });

    it('Should broadcast user joined chat', (done: Function) => {
      // Wait for ioServer to finish joinRoom events.
      setTimeout(() => {
      // Now let the 2nd user join.
      socket1.once('message', (msg: TMessage) => {
        assert.equal(msg.message, `${testName2} joined the chat.`)
        assert.notEqual(msg.message, `${testName2}_2 joined the chat.`)
        done();
      });
      }, 50);
    });

    it('Should receive message from other user', (done: Function) => {
      const testMsg = 'Hello there!'

      setTimeout(() => {
      socket1.emit('message', testMsg);
      socket2.once('message', (msg: TMessage) => {
        assert.equal(msg.message, testMsg);
        done();
      });
      }, 50);
    });

  });

});
