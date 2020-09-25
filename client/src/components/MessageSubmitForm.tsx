// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { sendMessage, isTyping } from '../redux/slices/emitEventSlice';

const MessageSubmitForm = (): JSX.Element => {

  const dispatch = useDispatch();

  const [myMsg, setMyMsg] = useState<string>('');

  const isTypingUsers = useSelector((state: RootState) => state.isTypingList);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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

    const lastCommaOccurenceToEnd: RegExp = /,([^,]*)$/;
    const typingUsers: string = isTypingUsers
      .join(', ')
      .replace(lastCommaOccurenceToEnd, [' &', '$1'].join(''));
    return `${typingUsers} are typing...`;
  };

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          name='myMsg'
          value={myMsg}
          onChange={(e) => setMyMsg(e.target.value)}
          autoFocus={true}
          placeholder='Message'
        />
        <input type='submit' value='Submit' />
      </form>
      <div>
        {!!isTypingUsers.length ? renderIsTypingUser() : null}
      </div>
    </section>
  );
};

export default MessageSubmitForm;