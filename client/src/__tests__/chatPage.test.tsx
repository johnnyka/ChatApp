import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import realStore from '../redux/store';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';

Enzyme.configure({ adapter: new Adapter() });

describe('Chat page', () => {
  it('Should initially show loading', () => {
    render(<Provider store={realStore}><Router><ChatPage /></Router></Provider>);

    // expect(screen.getByRole('main', { name: 'chat page' }).textContent).toBe('Loading...');
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  const mockStore = configureMockStore();
  const author = 'ChatBot';
  const time = '12:01';
  const message = 'Hello World!';
  const messageObj = {
    author,
    time,
    message
  };
  const name = 'JohnTester';
  const initialStates = {
    name,
    messages: [messageObj],
    infoModalVisibility: false,
    disconnected: {
      bool: false,
      reason: '',
    },
    isTypingList: [],
    msgsWithHideLabels: [{
      ...messageObj,
      authorLabel: '',
      timeLabel: ''
    }],
    emitEvent: {
      event: 'isTyping',
      value: false
    }
  };
  let fakeStore = mockStore(initialStates);

  it('Should render NavigationBar, MessageBoard, MessageSubmitForm and chatBot message when done loading', () => {

    render(<Provider store={fakeStore}><Router><ChatPage /></Router></Provider>);

    expect(screen.getByText(/Chat room/i)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.queryByText(author)).toBe(null);
    expect(screen.queryByText(time)).toBe(null);
  });

  // TODO:
  // - Need to look up rerender, since the page is rendered twice/double at the moment.
  // - Check that length of list is 2 after sent message.
  // - Check that message, time and author of the sent message is correct in the messageBoard.
  it('Should empty textarea upon send/submit message and show message with time', () => {
    render(<Provider store={fakeStore}><Router><ChatPage /></Router></Provider>);
    
    expect(screen.getByRole('textbox', { name: 'message input' }).textContent).toBe('');
    
    const inputText = 'This is a text input!';
    userEvent.type(screen.getByRole('textbox', { name: 'message input' }), inputText);
    expect(screen.getByRole('textbox', { name: 'message input' }).textContent).toBe(inputText);
    
    userEvent.click(screen.getByRole('button', { name: 'send message' }));
    const newMessageObj = {
      author: name,
      time: '12:03',
      message: inputText
    };
    fakeStore = mockStore({
      ...initialStates,
      messages: [messageObj, newMessageObj],
      msgsWithHideLabels: [
        messageObj,
        {
          ...newMessageObj,
          authorLabel: '',
          timeLabel: ''
        }
      ]
    });

    render(<Provider store={fakeStore}><Router><ChatPage /></Router></Provider>);
    // expect(screen.getByRole('list'));

  });

  it('Should show received message from other user', () => {
    // ...
  });

  it('Should notify when other users are typing', () => {
    // ...
  });

  it('Should notify when other users have left the room', () => {
    // ...
  });

  it('Should open info modal when clicking on the info button', () => {
    // ...
  });

  it('Should close the info modal when clicking on the close button', () => {
    // ...
  });
});