// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addMessage, clearMessages } from '../redux/slices/messagesSlice';
import { updateUserList } from '../redux/slices/usersSlice';
import { addToIsTypingList, removeFromIsTypingList } from '../redux/slices/isTypingSlice';
import { TMessage } from '../utils/types';

// Custom Hook to extract the socket logic from the ChatPage component.
const useConnectSocket = (): { isTypingMessage: ((bool: boolean) => SocketIOClient.Socket | undefined)} => {
  console.log('===== SOCKET')
  
  const dispatch = useDispatch();
  // console.log('DISPATCH', dispatch)

  const name = useSelector((state: RootState) => state.name); 
  
  const socketRef: React.MutableRefObject<SocketIOClient.Socket | undefined> = useRef();

  useEffect(() => {
    console.log('EFFECT')
    socketRef.current = io();

    socketRef.current.emit('joinRoom', { username: name });

    socketRef.current.on('message', (msg: TMessage) => {
      console.log('CLIENT message event:', msg)
      dispatch(addMessage(msg));
    })

    socketRef.current.on('chatInfo', ({ users }: { users: string[] }) => {
      console.log('CLIENT chatInfo event:', users);
      dispatch(updateUserList(users));
    })

    socketRef.current.on('isTyping', ({ user, isTyping }: { user: string, isTyping: boolean}) => {
      console.log('CLIENT isTyping event:', user, isTyping);
      isTyping 
        ? dispatch(addToIsTypingList(user)) 
        : dispatch(removeFromIsTypingList(user));
    })
  
    return () => {
      if (socketRef.current) socketRef.current.disconnect()
      dispatch(clearMessages(null));
    }
  }, []);

  const isTypingMessage = (bool: boolean): SocketIOClient.Socket | undefined => {
    console.log('CLIENT SOCKET emit, isTyping')
    return socketRef.current?.emit('isTyping', bool);
  };

  return { isTypingMessage };
};

export default useConnectSocket;


  // STORE ALL MESSAGES AND NOTIFICATIONS IN AN ARRAY OF OBJECTS IN REDUX.
  //   { NAME, TIME, TEXT }
  //     NAME === CHATBOT -> NOTIFICATION
  //     NAME === USERNAME IN REDUX STORE -> MY MESSAGES
  //     NAME !== CHATBOT NOR USERNAME -> OTHER USERS' MESSAGES
  // CREATE SLICE TO DISPATCH MESSAGES AND NOTIFICATION TO REDUX STORE.
  // CREATE SLICE TO DISPATCH ALL USER DATA TO REDUX STORE.
  // USE USESELECTOR HOOK TO FETCH DATA IN THE RESPECTIVE COMPONENTS.
