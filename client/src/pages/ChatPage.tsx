// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useConnectSocket from '../hooks/socket';
import { NavigationBar, MessageBoard, MessageSubmitForm } from '../components';
import { RootState } from '../redux/rootReducer';
import { updateName } from '../redux/slices/nameSlice';
import ChatInfoPage from './ChatInfoPage';
import '../styling/ChatPage.css';

const ChatPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const messages = useSelector((state: RootState) => state.messages);
  const isDisconnected = useSelector((state: RootState) => state.disconnected);
  const infoModal = useSelector((state: RootState) => state.infoModalVisibility);

  useEffect(() => {
    // Get persisted name for returning user.
    const persistedName: string | null = localStorage.getItem('username');
    if (persistedName) dispatch(updateName(persistedName));
  }, [dispatch]);

  useConnectSocket();

  const renderChat = (): JSX.Element => {
    return (
      <>
        <NavigationBar />
        <MessageBoard />
        <MessageSubmitForm />

        {infoModal ? <ChatInfoPage /> : null}
        {isDisconnected.bool ? <Redirect to='/' /> : null}
      </>
    )
  };
  return (
    <section className='chatPage' role='main' aria-label='chat page'>
      {/* TODO: Fix nicer loader. */}
      {messages.length ? renderChat() : <div>Loading...</div>}
    </section>
  );
};

export default ChatPage;
