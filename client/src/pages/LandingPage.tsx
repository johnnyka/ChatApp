// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../redux/slices/nameSlice';
import { validateName } from '../utils/validation';
import { RootState } from '../redux/rootReducer';
import { disconnectUser } from '../redux/slices/disconnectSlice';
import '../styling/LandingPage.css';

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
    if (isDisconnected.bool) setValidationMsg(`You were disconnected due to ${isDisconnected.reason}.`)
  }, [isDisconnected]);

  useEffect(() => {
    if (isValidName) {
      dispatch(disconnectUser({ bool: false, reason: '' }));
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
      <div className='container'>
        <section className='landing'>
          <div className='landing__icon_container'>
            <i className="landing__icon far fa-comments"></i>
          </div>
          <div className='landing__header'>Welcome to myChat</div>

          <form className='landing__name_form' onSubmit={(e) => handleSubmit(e)}>
            <input
              className='name_form__input'
              type='text'
              name='name'
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              autoFocus={true}
              placeholder='Username'
              autoComplete='off'
            />
            <input
              className='name_form__submit_btn'
              type='submit'
              value='Join chat'
            />
          </form>
          <div className='name_form__feedback'>{validationMsg}</div>
        </section>
      </div>

      {isDisconnected.bool ? console.log(`You were disconnected due to ${isDisconnected.reason}.`) : null}
      {redirect ? <Redirect push to='/chatroom' /> : null}
    </>
  );
};

export default LandingPage;
