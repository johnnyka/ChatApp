import { TMessage } from './types';

const messageObj = (name: string, msg: string): TMessage => ({
  author: name,
  time: (new Date()).toLocaleTimeString().slice(0, 5),
  message: msg,
});

export default messageObj;