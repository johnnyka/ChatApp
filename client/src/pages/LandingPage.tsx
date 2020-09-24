// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateName } from '../redux/slices/nameSlice';
import { validateName } from '../utils/index';

const LandingPage = (): JSX.Element => {
  console.log('===== LANDING PAGE')
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('HANDLE SUBMIT')
    validateName(name, setIsValidName, setValidationMsg);
  };

  useEffect(() => {
    if (isValidName) {
      console.log('USE EFFECT, IF')
      dispatch(updateName(name))
      setRedirect(true);
    }
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
          />
        </label>
        <input type='submit' value='Submit' />
        <div>{validationMsg}</div>
      </form>

      {redirect ? <Redirect push to='/chatroom' /> : null}
    </>
  );
};

export default LandingPage;

// TODO:
// Handle when disconnected from server.

// Put all states in Redux store. 
// Make validate name check in async thunk?