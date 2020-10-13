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
import {
  createMessageObj,
  author,
  time,
  message,
  initialMessageObj,
  myName,
  user1,
  user2,
  initialStates
} from '../utils/testing';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

// Mock initial states in Redux store.
const mockStore = configureMockStore();

describe('Chat page', () => {
  it('Should initially show loading', () => {
    render(
      <Provider store={realStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );

    // expect(screen.getByRole('main', { name: 'chat page' }).textContent).toBe('Loading...');
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('Should render chatPage and display chatBot message correctly', () => {
    const fakeStore = mockStore(initialStates);
    render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );

    const botMessage = screen.getByRole('list', { name: 'message list' });
    expect(screen.getByText(/Chat room/i)).toBeInTheDocument();
    expect(botMessage.textContent).toMatch(message);
    expect(botMessage.textContent).not.toMatch(time);
    expect(botMessage.textContent).not.toMatch(author);
  });

  it('Should empty textarea upon send/submit message and display my message correctly', () => {
    // Mock initial state in Redux store.
    let fakeStore = mockStore(initialStates);
    const { rerender } = render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );

    // Initially empty textarea.
    expect(screen.getByRole('textbox', { name: 'message input' }).textContent).toBe('');

    // ...and only message (from bot) in messageBoard.
    let messageListItems = 
      screen.getByRole('list', { name: 'message list' }).getElementsByTagName('li');
    expect(messageListItems).toHaveLength(1);

    // Simulate message in textarea.
    const myMessage = 'This is the first user message!';
    userEvent.type(screen.getByRole('textbox', { name: 'message input' }), myMessage);
    expect(screen.getByRole('textbox', { name: 'message input' }).textContent).toBe(myMessage);

    // Send message.
    userEvent.click(screen.getByRole('button', { name: 'send message' }));
    expect(screen.getByRole('textbox', { name: 'message input' }).textContent).toBe('');

    // Mock Redux store with new states to mock dispatching new message.
    const time = '12:03';
    const newMessageObj = createMessageObj(myName, time, myMessage);

    fakeStore = mockStore({
      ...initialStates,
      messages: [initialMessageObj, newMessageObj],
      msgsWithHideLabels: [
        initialMessageObj,
        {
          ...newMessageObj,
          authorLabel: '',
          timeLabel: ''
        }
      ]
    });

    // Render new message.
    rerender(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );

    // Expect new message.
    messageListItems = 
      screen.getByRole('list', { name: 'message list' }).getElementsByTagName('li');
    const lastMessage = messageListItems[messageListItems.length - 1];
    expect(messageListItems).toHaveLength(2);
    expect(lastMessage.textContent).toMatch(myMessage);
    expect(lastMessage.textContent).toMatch(time);
    expect(lastMessage.textContent).not.toMatch(myName);
  });

  it('Should display received message correctly from other user', () => {
    // Mock initial state + message from other user in Redux store.
    const time = '12:05';
    const author = 'Jane';
    const message = 'This is a message from another user.'
    const newMessageObj = { author, time, message };

    const fakeStore = mockStore({
      ...initialStates,
      messages: [initialMessageObj, newMessageObj],
      msgsWithHideLabels: [
        initialMessageObj,
        {
          ...newMessageObj,
          authorLabel: '',
          timeLabel: ''
        }
      ]
    });

    render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );

    const messageListItems = 
      screen.getByRole('list', { name: 'message list' }).getElementsByTagName('li');
    const lastMessage = messageListItems[messageListItems.length - 1];
    expect(messageListItems).toHaveLength(2);
    expect(lastMessage.textContent).toMatch(author);
    expect(lastMessage.textContent).toMatch(time);
    expect(lastMessage.textContent).toMatch(message);
  });

  it('Should notify when other users are typing', () => {
    // Mock other users are typing.
    const fakeStore = mockStore({
      ...initialStates,
      isTypingList: [user1, user2]
    })

    render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('alert', { name: 'status typing users' }).textContent)
      .toMatch('typing...');
    expect(screen.getByRole('alert', { name: 'status typing users' }).textContent)
      .toMatch(user1);
    expect(screen.getByRole('alert', { name: 'status typing users' }).textContent)
      .toMatch(user2);
    expect(screen.getByRole('alert', { name: 'status typing users' }).textContent)
      .not.toMatch(myName);
  });

  it('Should leave chatPage upon clicking the back button', () => {
    const fakeStore = mockStore(initialStates);
    const { rerender } = render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>
    );
    expect(screen.getByRole('main', { name: 'chat page' })).toBeInTheDocument();

    // Simulate click on back button.
    userEvent.click(screen.getByRole('button', { name: 'leave chat button' }));
    rerender(
      <Provider store={fakeStore}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    // Expect to arrive in the landingPage.
    expect(screen.queryByRole('main', { name: 'chat page' })).not.toBeInTheDocument();
    expect(screen.getByRole('main', { name: 'landing page' })).toBeInTheDocument();
  });
});