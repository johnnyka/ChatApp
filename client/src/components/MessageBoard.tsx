// eslint-disable-next-line
import React, { useEffect, useRef, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { IMsgWithHideLabels } from '../utils/types';
import { addHideMsgLabels } from '../redux/slices/msgsWithHideLabelsSlice';
import '../styling/MessageBoard.css';

let scrolledToBottom = false;

const MessageBoard = (): JSX.Element => {
  const dispatch = useDispatch();
  const messagesEndRef: React.MutableRefObject<HTMLDivElement> =
    useRef(document.createElement("div"));

  const name = useSelector((state: RootState) => state.name);
  const messages = useSelector((state: RootState) => state.messages);
  const msgsWithHideLabels = useSelector((state: RootState) => state.msgsWithHideLabels);
  const messageListRef: React.MutableRefObject<HTMLUListElement> = useRef(document.createElement("ul"));
  const msgBoardSectionRef: React.MutableRefObject<HTMLElement> = useRef(document.createElement("section"));

  // BUG: Lagging. One message will not be visible before scrolled to bottom.
  const activateAutoScroll = () => {
    const listHeight = messageListRef.current.scrollHeight;
    const sectionHeight = msgBoardSectionRef.current.clientHeight;

    if (listHeight > sectionHeight && !scrolledToBottom) {
      scrolledToBottom = true;
      // Scroll large value to ensure scrolled to bottom.
      msgBoardSectionRef.current.scrollTop = 1000;
    }
  };

  useEffect(() => {
    dispatch(addHideMsgLabels(messages))

    activateAutoScroll();
  }, [messages, dispatch]);

  const handleMessage = (msg: IMsgWithHideLabels): JSX.Element => {
    const { author, time, message, authorLabel, timeLabel } = msg;
    const from = author === name ? '' : author;

    return (
      <>
        {author === 'ChatBot' ? null : (
          <div className='msgItem__labels'>
            <span className={`labels__author ${authorLabel}`}>{from}</span>
            <span className={`labels__time ${timeLabel}`}>{time}</span>
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
      <ul className='msgBoard__msgList' ref={messageListRef} aria-label='message list'>
        {msgsWithHideLabels.map((message, i) => (
          <li key={i} className={`msgList__msgItem  
            ${identifyMsgType(message.author)}`}
          >
            {handleMessage(message)}
          </li>)
        )}
        <div className='msgList__end' ref={messagesEndRef}></div>
      </ul>
    )
  };

  return (
    <section className='msgBoard' ref={msgBoardSectionRef} >
      {renderMessages()}
    </section>
  );
};

export default MessageBoard;
