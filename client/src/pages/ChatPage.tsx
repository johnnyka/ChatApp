// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useConnectSocket from '../hooks/socket';
import { NavigationBar, MessageBoard, MessageSubmitForm } from '../components';
import { RootState } from '../redux/rootReducer';
import { updateName } from '../redux/slices/nameSlice';
import ChatInfoPage from './ChatInfoPage';

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
        <section className='chatPage'>
          <NavigationBar />
          <MessageBoard />
          <MessageSubmitForm />
        </section>

        {infoModal ? <ChatInfoPage /> : null}
        {isDisconnected.bool ? <Redirect to='/' /> : null}
      </>
    )
  };
  return (
    <>
      {/* TODO: Fix nicer loader. */}
      {messages.length ? renderChat() : <div>Loading...</div>} 
    </>
  );
};

export default ChatPage;
