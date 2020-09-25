// eslint-disable-next-line
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showInfoModal } from '../redux/slices/infoModalSlice';

const NavigationBar = (): JSX.Element => {
  const dispatch = useDispatch();

  const history = useHistory();
  const leaveChat = (): void => {
    history.goBack();
  };

  const showInfo = () => {
    dispatch(showInfoModal());
  };

  return (
    <section>
      <button type='button' onClick={() => leaveChat()}>Leave chat</button>
      <p>Chat room</p>
      <button type='button' onClick={() => showInfo()}>Info</button>
    </section>
  );
};

export default NavigationBar;
