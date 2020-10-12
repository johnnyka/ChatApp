import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import {
  myName,
  user1,
  user2,
  initialStates
} from '../utils/testing';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();

describe('Chat info page/modal', () => {
  it('Should open and close the info modal', () => {
    let fakeStore = mockStore(initialStates);
    const { rerender } = render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>);

    // Simulate click on info button.
    userEvent.click(screen.getByRole('button', { name: 'info button' }));

    // Mock Redux store with new state to mock dispatching showInfoModal action.
    fakeStore = mockStore({
      ...initialStates,
      infoModalVisibility: true,
      users: [myName]
    });
    rerender(<Provider store={fakeStore}><Router><ChatPage /></Router></Provider>);

    // Expect info modal to display.
    expect(screen.getByRole('dialog', { name: 'chat info page' })).toBeInTheDocument();

    // Simulate click on close button.
    userEvent.click(screen.getByRole('button', { name: 'close modal button' }));

    // Mock Redux store with new states to mock dispatching hideInfoModal action.
    fakeStore = mockStore({
      ...initialStates,
      infoModalVisibility: false,
    });
    rerender(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>);

    // Expect the modal to be closed.
    expect(screen.queryByRole('dialog', { name: 'chat info page' })).not.toBeInTheDocument();
  });

  it('Should display all users in the chat', () => {
    // Mock users in chat.
    const fakeStore = mockStore({
      ...initialStates,
      infoModalVisibility: true,
      users: [myName, user1, user2]
    });

    render(
      <Provider store={fakeStore}>
        <Router>
          <ChatPage />
        </Router>
      </Provider>);
    const usersListItems = screen
      .getByRole('list', { name: 'users list' })
      .getElementsByTagName('li');
    expect(usersListItems).toHaveLength(3);
    expect(usersListItems[0].textContent).toMatch(myName);
    expect(usersListItems[1].textContent).toMatch(user1);
    expect(usersListItems[2].textContent).toMatch(user2);
  });
});




