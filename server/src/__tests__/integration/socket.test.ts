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

const botName = 'ChatBot';
const testName1 = 'JohnDoe';
const testName2 = 'SaraSmith';

beforeAll((done: jest.DoneCallback) => {
  httpServer = http.createServer(app); // Http server
  ioServer = socketServer(httpServer); // socket.io server
  httpServer.listen(PORT);

  socket1 = io(`http://localhost:${PORT}`); // Socket
  socket2 = io(`http://localhost:${PORT}`);
  socket1.on('connect', () => {
    // ...
  });
  socket2.on('connect', () => {
    done(); // Await socket to be connected.
  });
});

afterAll((done: jest.DoneCallback) => {
  // Cleanup
  ioServer.close();
  httpServer.close();
  socket1.close();
  socket2.close();
  done();
});

describe('Simple test', () => {
  it('Should communicate', (done: jest.DoneCallback) => {
    ioServer.emit('hello', 'Hello Client!');
    socket1.once('hello', (message: string) => {
      assert.equal(message, 'Hello Client!');
      done();
    });
  });
});

describe('joinRoom event', () => {
  it('Should emit welcome message to the new user', (done: jest.DoneCallback) => {
    const time = (new Date()).toLocaleTimeString().slice(0, 5);

    socket1.emit('joinRoom', { username: testName1 });
    socket1.once('message', (msg: TMessage) => {
      assert.equal(msg.author, botName);
      assert.equal(msg.time, time);
      assert.match(msg.message, new RegExp('welcome', 'i'));
      assert.match(msg.message, new RegExp(testName1));
      done();
    });
  });

  it('Should emit user list', (done: jest.DoneCallback) => {
    socket1.once('chatInfo', ({ users }: { users: string[] }) => {
      assert.isArray(users);
      assert.lengthOf(users, 1);
      assert.sameMembers(users, [testName1]);
      done();
    });
  });
});

describe('Additional joinRoom event', () => {
  it('Should broadcast new user joined chat and emit updated user list', (done: jest.DoneCallback) => {
    const time = (new Date()).toLocaleTimeString().slice(0, 5);

    socket2.emit('joinRoom', { username: testName2 });
    socket1.once('message', (msg: TMessage) => {
      assert.equal(msg.author, botName);
      assert.equal(msg.time, time);
      assert.match(msg.message, new RegExp('joined the chat'));
      assert.match(msg.message, new RegExp(testName2));

      socket1.once('chatInfo', ({ users }: { users: string[] }) => {
        assert.isArray(users);
        assert.lengthOf(users, 2);
        assert.sameMembers(users, [testName1, testName2]);
        done();
      });
    });
  });
});

describe('isTyping event', () => {
  it('Should broadcast that user is typing', (done: jest.DoneCallback) => {
    socket1.emit('isTyping', true);
    socket2.once('isTyping', ({ user, isTyping }: { user: string, isTyping: boolean }) => {
      assert.equal(user, testName1);
      assert.equal(isTyping, true);
      done();
    });
  });

  it('Should broadcast that user is done typing', (done: jest.DoneCallback) => {
    socket1.emit('isTyping', false);
    socket2.once('isTyping', ({ user, isTyping }: { user: string, isTyping: boolean }) => {
      assert.equal(user, testName1);
      assert.equal(isTyping, false);
      done();
    });
  });
});

describe('message event', () => {
  const mockMessage = 'Howdy';
  const time = (new Date()).toLocaleTimeString().slice(0, 5);

  it('Should emit message to all users', (done: jest.DoneCallback) => {
    socket1.emit('message', mockMessage);
    socket2.once('message', (msg: TMessage) => {
      assert.equal(msg.author, testName1);
      assert.equal(msg.time, time);
      assert.equal(msg.message, mockMessage);
      done();
    });
  });
});

describe('disconnection event', () => {
  const time = (new Date()).toLocaleTimeString().slice(0, 5);

  it('Should broadcast that user has left the chat and emit updated user list', (done: jest.DoneCallback) => {
    socket1.disconnect();
    socket2.once('message', (msg: TMessage) => {
      assert.equal(msg.author, botName);
      assert.equal(msg.time, time);
      assert.match(msg.message, new RegExp('left the chat'));
      assert.match(msg.message, new RegExp(testName1));

      socket2.once('chatInfo', ({ users }: { users: string[] }) => {
        assert.isArray(users);
        assert.lengthOf(users, 1);
        assert.sameMembers(users, [testName2]);
        done();
      });
    });
  });
});
