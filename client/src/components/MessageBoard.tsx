// eslint-disable-next-line
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { TMessage } from '../utils/types';
import '../styling/MessageBoard.css';

const MessageBoard = (): JSX.Element => {
  const messagesEndRef: React.MutableRefObject<HTMLDivElement> =
    useRef(document.createElement("div"));

  const name = useSelector((state: RootState) => state.name);
  const messages = useSelector((state: RootState) => state.messages);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
        {author === 'ChatBot' ? null : (
          <div className='msgItem__labels'>
            <span className='labels__author'>{from}</span>
            <span className='labels__time'>{time}</span>
          </div>
        )}
        <div className='msgItem__msg'>{message}</div>
      </>
    );
  };

  const renderMessages = (): JSX.Element => {

    const identifyMsgType = (author: string): string => {
      switch (author) {
        case name: {
          return 'sentMsg userMsg';
        }
        case 'ChatBot': {
          return 'botMsg';
        }
        default: {
          return 'receivedMsg userMsg';
        }
      }
    };

    return (
      <ul className='msgBoard__msgList'>
        {messages.map((message, i) => (
          <li key={i} className={`msgList__msgItem  
            ${identifyMsgType(message.author)}`}
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
      {renderMessages()}
    </section>
  );
};

export default MessageBoard;
