// eslint-disable-next-line
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showInfoModal } from '../redux/slices/infoModalSlice';

const NavigationBar = (): JSX.Element => {
  const dispatch = useDispatch();

  const history = useHistory();
  const leaveChat = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    history.goBack();
  };

  const showInfo = () => {
    dispatch(showInfoModal());
  };

  return (
    <section>
      <button type='button' onClick={(e) => leaveChat(e)}>Leave chat</button>
      <p>Chat room</p>
      {/* <Link to='/chatinfo'>Info</Link> */}
      <button type='button' onClick={() => showInfo()}>Info</button>
    </section>
  );
};

export default NavigationBar;
