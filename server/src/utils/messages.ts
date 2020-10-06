import { TMessage } from './types';

const messageObj = (name: string, msg: string): TMessage => ({
  author: name,
  time: (new Date()).toLocaleTimeString().replace(/:[^:]*$/, ''),
  message: msg,
});

export default messageObj;
