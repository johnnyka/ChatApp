import { TMessage } from './types';

let messageStore: TMessage[] = [];

export const messageObj = (name: string, msg: string): TMessage => {
  return {
    author: name,
    time: (new Date()).toLocaleTimeString().slice(0,5),
    message: msg
  };
};
