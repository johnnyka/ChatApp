// eslint-disable-next-line
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { hideInfoModal } from '../redux/slices/infoModalSlice';

const ChatInfoPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);

  const hideInfo = () => {
    dispatch(hideInfoModal());
  };

  const renderUsers = (): JSX.Element => {
    return (
      <section>
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
        <button type='button' onClick={() => hideInfo()}>Close</button>
      </section>
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
