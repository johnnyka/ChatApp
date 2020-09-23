// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateName } from '../redux/slices/nameSlice';
import InputField from '../components/InputField';

const LandingPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const validateName = (): void => {
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    };

    fetch('/api/validation', reqOptions)
      .then(res => res.json())
      .then(res => {
        setIsValid(res.valid);
        setValidationMsg(res.msg)
      })
      .catch(err => {
        setIsValid(false);
        setValidationMsg('Server is unavailable. Please try again later.')
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    validateName();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const emitToServer = () => {
    const socket = io();
    socket.emit('joinRoom', { username: name });
  };

  useEffect(() => {
    const onValidName = () => {
      if (isValid) {
        dispatch(updateName(name))
        emitToServer();
        setRedirect(true);
      }
    }
    onValidName();
  }, [isValid]); // eslint-disable-line

  return (
    <>
      <div>This is the landing page.</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputField label='Name' name='name' value={name} onChange={handleChange} />
        <input type='submit' value='Submit' />
        <div>{validationMsg}</div>
      </form>
      {redirect ? <Redirect to='/chatroom' /> : null}
    </>
  );
};

export default LandingPage;
