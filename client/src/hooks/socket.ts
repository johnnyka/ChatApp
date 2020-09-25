// eslint-disable-next-line
import React, { useEffect, useRef } from 'react'
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addMessage, clearMessages } from '../redux/slices/messagesSlice';
import { updateUserList } from '../redux/slices/usersSlice';
import { addToIsTypingList, removeFromIsTypingList } from '../redux/slices/isTypingSlice';
import { isTyping } from '../redux/slices/emitEventSlice';
import { disconnectUser } from '../redux/slices/disconnectSlice';
import { TMessage, TIsTypingObj } from '../utils/types';

// Custom Hook to extract the socket logic from the ChatPage component.
const useConnectSocket = (): void => {

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

    socketRef.current.on('isTyping', ({ user, isTyping }: TIsTypingObj) => {
      isTyping
        ? dispatch(addToIsTypingList(user))
        : dispatch(removeFromIsTypingList(user));
    })

    socketRef.current.on('disconnect', (reason: string) => {
      switch (reason) {
        case 'io server disconnect': {
          dispatch(disconnectUser({ bool: true, reason: 'inactivity'}));
          break;
        }
        case 'transport error': {
          dispatch(disconnectUser({ bool: true, reason: 'server is down'}))
          break;
        }
        default: {
          // Client self-disconnected or other reason...
        }
      }
    });

    return () => {
      dispatch(clearMessages(null));
      dispatch(isTyping(false));
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [dispatch, name]);

  const emitEvent = (event: string, value: string | boolean): SocketIOClient.Socket | undefined => {
    return socketRef.current?.emit(event, value);
  };

  useEffect(() => {
    const { event, value } = emitEventState;
    if (event) emitEvent(event, value)
  }, [emitEventState]);
};

export default useConnectSocket;
