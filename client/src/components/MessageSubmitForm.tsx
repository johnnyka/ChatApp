// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

const MessageSubmitForm = ({ isTypingMessage }: { isTypingMessage: ((bool: boolean) => void) }): JSX.Element => {

  const [myMsg, setMyMsg] = useState<string>('');

  const isTypingUsers = useSelector((state: RootState) => state.isTypingList);
  console.log('isTyping:', isTypingUsers, !!isTypingUsers.length);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Send message');

    setMyMsg('');
  };

  useEffect(() => {
    myMsg !== '' ? isTypingMessage(true) : isTypingMessage(false);
  }, [myMsg]);

  const renderIsTypingUser = (): string => {
    if (isTypingUsers.length === 1) return `${isTypingUsers[0]} is typing...`;

    const lastCommaOccurenceToEnd: RegExp = /,([^,]*)$/;
    const typingUsers: string = isTypingUsers.join(', ').replace(lastCommaOccurenceToEnd, ' &' + '$1');
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