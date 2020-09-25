export type TMessage = {
  author: string,
  time: string,
  message: string
};

export type TIsTypingObj = {
  user: string,
  isTyping: boolean
};

export type TIsDisconnected = { 
  bool: boolean,
  reason: string
};

export type TEmitEvent = { 
  event: string | null, 
  value: string | boolean 
};