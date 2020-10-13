// eslint-disable-next-line
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { hideInfoModal } from '../redux/slices/infoModalSlice';
import '../styling/ChatInfoPage.css';

const ChatInfoPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);

  const closeModal = () => {
    dispatch(hideInfoModal());
  };

  const renderUsers = (): JSX.Element => {
    return (
      <section className='chatInfo__userInfo' role='dialog' aria-label='chat info page'>
        <h2 className='userInfo__header'>
          <i className='userInfo__icon fas fa-user-friends'></i>
          Users
        </h2>
        <ul id='usersList' className='userInfo__userList' aria-label='users list'>
          {users.map((user, i) => (
            <li key={i} className='usersList__userItem'>
              {user}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <section className='chatInfo'>
      <div className='chatInfo__modal'>
        <h1 className='chatInfo__header'>
          <i className='header__info_icon fas fa-info-circle'></i>
        </h1>
        {renderUsers()}
        <button
          id='closeInfoModalBtn'
          type='button'
          className='modal__close_btn'
          onClick={() => closeModal()}
          aria-label='close modal button'
        >
          <i className='close_btn__icon fas fa-times-circle'></i>
        </button>
      </div>
    </section>
  );
};

export default ChatInfoPage;
