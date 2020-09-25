// eslint-disable-next-line
import React from 'react';
import { useSelector } from 'react-redux';
import useConnectSocket from '../hooks/socket';
import { NavigationBar, MessageBoard, MessageSubmitForm } from '../components';
import { RootState } from '../redux/rootReducer';

const ChatPage = (): JSX.Element => {

  const messages = useSelector((state: RootState) => state.messages);

  useConnectSocket();
 
  const renderChat = (): JSX.Element => {
    return (
      <>
        <NavigationBar /> 
        <MessageBoard />
        <MessageSubmitForm />
      </>
    )
  };
  return (
    <>
      <div>This is the chat page.</div>
      
      {messages.length ? renderChat() : <div>Loading...</div>}
    </>
  );
};

export default ChatPage;
