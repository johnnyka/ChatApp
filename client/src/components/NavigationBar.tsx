// eslint-disable-next-line
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavigationBar = (): JSX.Element => {

  const history = useHistory();
  const leaveChat = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    history.goBack();
  };

  return (
    <section>
      <button type='button' onClick={(e) => leaveChat(e)}>Leave chat</button>
      <p>Chat room</p>
      <Link to='/chatinfo'>Info</Link>
    </section>
  );
};

export default NavigationBar;
