// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../redux/slices/nameSlice';
import { validateName } from '../utils/index';
import { RootState } from '../redux/rootReducer';
import { disconnectUser } from '../redux/slices/disconnectSlice';

const LandingPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const isDisconnected = useSelector((state: RootState) => state.disconnected);

  const [name, setName] = useState<string>('');
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    validateName(name, setIsValidName, setValidationMsg);
  };

  useEffect(() => {
    if (isValidName) {
      dispatch(disconnectUser({ bool: false, reason: ''}));
      dispatch(updateName(name));
      setRedirect(true);

      localStorage.setItem('username', name); // Persist name for user returning to chat.
    }
    return (() => {
      setIsValidName(false);
    });
  }, [isValidName, dispatch, name]);

  return (
    <>
      <div>This is the landing page.</div>
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            autoFocus={true}
            placeholder='Username'
          />
        </label>
        <input type='submit' value='Submit' />
        <div>{validationMsg}</div>
      </form>

      {isDisconnected.bool ? console.log(`You were disconnected due to ${isDisconnected.reason}.`) : null }
      {redirect ? <Redirect push to='/chatroom' /> : null}
    </>
  );
};

export default LandingPage;
