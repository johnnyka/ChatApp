export const createMessageObj = (author: string, time: string, message: string): 
  { author: string, time: string, message: string } => {
  return ({ author, time, message })
};

export const author = 'ChatBot';
export const time = '12:01';
export const message = 'Hello World!';
export const initialMessageObj = createMessageObj(author, time, message);
export const myName = 'JohnTester';
export const user1 = 'Sara';
export const user2 = 'Jane';

export const initialStates = {
  name: myName,
  messages: [initialMessageObj],
  infoModalVisibility: false,
  disconnected: { bool: false, reason: '' },
  isTypingList: [],
  msgsWithHideLabels: [{
    ...initialMessageObj,
    authorLabel: '',
    timeLabel: ''
  }],
  emitEvent: { event: 'isTyping', value: false }
};
