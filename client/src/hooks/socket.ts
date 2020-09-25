// eslint-disable-next-line
import React, { useEffect, useRef } from 'react'
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addMessage, clearMessages } from '../redux/slices/messagesSlice';
import { updateUserList } from '../redux/slices/usersSlice';
import { addToIsTypingList, removeFromIsTypingList } from '../redux/slices/isTypingSlice';
import { isTyping } from '../redux/slices/emitEventSlice';
import { TMessage } from '../utils/types';

// Custom Hook to extract the socket logic from the ChatPage component.
const useConnectSocket = () => {

  const dispatch = useDispatch();

  const name = useSelector((state: RootState) => state.name);
  const emitEventState = useSelector((state: RootState) => state.emitEvent)

  const socketRef: React.MutableRefObject<SocketIOClient.Socket | undefined> = useRef();

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.emit('joinRoom', { username: name });

    socketRef.current.on('message', (msg: TMessage) => {
      dispatch(addMessage(msg));
    })

    socketRef.current.on('chatInfo', ({ users }: { users: string[] }) => {
      dispatch(updateUserList(users));
    })

    socketRef.current.on('isTyping', ({ user, isTyping }: { user: string, isTyping: boolean }) => {
      isTyping
        ? dispatch(addToIsTypingList(user))
        : dispatch(removeFromIsTypingList(user));
    })

    return () => {
      if (socketRef.current) socketRef.current.disconnect()
      dispatch(clearMessages(null));
      dispatch(isTyping(false))
    }
  }, [dispatch, name]);

  const emitEvent = (event: string, value: string | boolean):  SocketIOClient.Socket | undefined => {
    return socketRef.current?.emit(event, value);
  };

  useEffect(() => {
    const { event, value } = emitEventState;
    if (event) emitEvent(event, value)
  }, [emitEventState]);

};

export default useConnectSocket;
