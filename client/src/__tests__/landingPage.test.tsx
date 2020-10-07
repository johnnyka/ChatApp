import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../utils/validation');
import { validateName } from '../utils/validation';

describe('Landing page', () => {
  beforeEach(() => {
    (validateName as jest.Mock).mockClear();
  });

  it('Should show validation message on resolved fetch to API', async (done: jest.DoneCallback) => {
    render(<Provider store={store}><Router><LandingPage /></Router></Provider>);

    const message = 'Empty string is not allowed. Please enter a valid name.';
    (validateName as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({
        valid: false,
        msg: message
      })
    })

    expect(screen.getByRole('generic', {name: /feedback/}).textContent).toBe('');
    userEvent.click(screen.getByRole('button', { name: /join chat/i }));
    await waitFor(() => expect(validateName).toHaveBeenCalled());
    expect(screen.getByRole('generic', {name: /feedback/}).textContent).toBe(message);
    done();
  });

  it('Should show correct validation message on rejected fetch to API', async (done: jest.DoneCallback) => {
    render(<Provider store={store}><Router><LandingPage /></Router></Provider>);

    const message = 'Server is unavailable. Please try again later.';
    (validateName as jest.Mock).mockRejectedValue({
      json: () => Promise.resolve({
        valid: false,
        msg: message
      })
    })

    expect(screen.getByRole('generic', {name: /feedback/}).textContent).toBe('');
    userEvent.click(screen.getByRole('button', { name: /join chat/i }));
    await waitFor(() => expect(validateName).toHaveBeenCalled());
    expect(screen.getByRole('generic', {name: /feedback/}).textContent).toBe(message);
    done();
  });
});
