// eslint-disable-next-line
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

const ChatPage = (): JSX.Element => {
  const name = useSelector(
    (state: RootState) => state.name
  );

  return (
    <>
      <div>This is the chat page.</div>
      <div>{name}</div>
      {console.log('Name:', name)}
    </>
  );
};

export default ChatPage;
