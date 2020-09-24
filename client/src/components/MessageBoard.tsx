// eslint-disable-next-line
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';


const MessageBoard = (): JSX.Element => {
  console.log('===== MESSAGE BOARD')

  const name = useSelector((state: RootState) => state.name);
  const messages = useSelector((state: RootState) => state.messages);

  console.log('NAME:', name)
  console.log('MESSAGES:', messages)

  const renderMessages = (): JSX.Element => {
    return (
      <ul className='msgBoard__msgList'>
        {messages.map((message, i) => (
          <li
            key={i}
            className={`msgList__msgItem ${name === message.author ? 'sentMsg' : 'receivedMsg'}`}
          >
            {message.message}
          </li>
        ))}
      </ul>
    )
  };

  return (
    <section className='msgBoard'>
      This is the message board.

      {renderMessages()}
    </section>
  );
};

export default MessageBoard;
