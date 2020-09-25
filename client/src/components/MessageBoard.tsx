// eslint-disable-next-line
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { TMessage } from '../utils/types';


const MessageBoard = (): JSX.Element => {
  const messagesEndRef: React.MutableRefObject<HTMLDivElement> = 
    useRef(document.createElement("div"));
  
  const name = useSelector((state: RootState) => state.name);
  const messages = useSelector((state: RootState) => state.messages);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = (msg: TMessage): JSX.Element => {
    const { author, time, message } = msg;
    const from = author === name ? '' : author;

    return (
      <>
        {author !== 'ChatBot'
          ? (
            <div>
              <span className='msgInfo__author'>{from}</span>
              <span className='msgInfo__time'>{time}</span>
            </div>
          )
          : null
        }
        <div>{message}</div>
      </>
    );
  };

  const renderMessages = (): JSX.Element => {
    return (
      <ul className='msgBoard__msgList'>
        {messages.map((message, i) => (
          <li
            key={i}
            className={`msgList__msgItem msgItem__msg ${name === message.author ? 'sentMsg' : 'receivedMsg'}`}
          >
            {handleMessage(message)}
          </li>
        ))}
        <div ref={messagesEndRef}></div>
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
