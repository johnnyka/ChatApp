// eslint-disable-next-line
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

const ChatInfoPage = (): JSX.Element => {

  const users = useSelector((state: RootState) => state.users);

  const renderUsers = (): JSX.Element => {
    return (
      <ul className='chatInfo__usersList'>
        {users.map((user, i) => (
          <li
            key={i}
            className='usersList__userItem'
          >
            {user}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className='chatInfo'>
      <div>This is the Chat info page</div>
      {renderUsers()}
    </section>
  );
};

export default ChatInfoPage;
