// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { sendMessage, isTyping } from '../redux/slices/emitEventSlice';
import '../styling/MessageSubmitForm.css';

const MessageSubmitForm = (): JSX.Element => {

  const dispatch = useDispatch();

  const [myMsg, setMyMsg] = useState<string>('');

  const isTypingUsers = useSelector((state: RootState) => state.isTypingList);

  const handleSubmit = (event: 
    React.FormEvent<HTMLFormElement> |
    React.KeyboardEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    if (myMsg) {
      dispatch(sendMessage(myMsg));
      setMyMsg('');
    }
  };

  useEffect(() => {
    myMsg === '' ? dispatch(isTyping(false)) : dispatch(isTyping(true));
  }, [myMsg, dispatch]);

  const renderIsTypingUser = (): string => {
    if (isTypingUsers.length === 1) return `${isTypingUsers[0]} is typing...`;

    const lastCommaOccurenceToEnd = /,([^,]*)$/;
    const typingUsers: string = isTypingUsers
      .join(', ')
      .replace(lastCommaOccurenceToEnd, [' &', '$1'].join(''));
    return `${typingUsers} are typing...`;
  };

  return (
    <section className='msgSubmitSection'>
      <form className='msgSubmitSection__msgSubmitForm' onSubmit={(e) => handleSubmit(e)}>
        <textarea
          id='messageInput'
          className='msgSubmitForm__input'
          name='myMsg'
          value={myMsg}
          onChange={(e) => setMyMsg(e.target.value)}
          autoFocus={true}
          placeholder='Message'
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e) }}
          autoCapitalize='on' // Only for virtual keyboards (mobile).
          aria-label='message input'
        >
        </textarea>
        <button
          id='sendMessageBtn'
          className='msgSubmitForm__send_btn'
          type='submit'
          aria-label='send message'
        >
          <i className="msgSubmitForm__send_icon fas fa-paper-plane"></i>
        </button>
      </form>
      <div
        id='typingUsersNotification'
        className='msgSubmitSection__status'
        role='alert'
        aria-label='status typing users'
      >
        {!!isTypingUsers.length ? renderIsTypingUser() : null}
      </div>
    </section>
  );
};

export default MessageSubmitForm;