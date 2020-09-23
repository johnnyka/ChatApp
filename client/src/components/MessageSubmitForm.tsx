// eslint-disable-next-line
import React, { useState } from 'react';
import io from 'socket.io-client';

const MessageSubmitForm = (): JSX.Element => {

  const [myMsg, setMyMsg] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Send message');

    // EMIT TO SERVER ETC
    // THIS IS NOT CORRECT. MIGRATE THE SOCKET TO REDUX MIDDLEWARE! THAT WAY THE SOCKET LIVES IN THE REDUX STORE WHILE AVOIDING SIDE EFFECTS SUCH AS COMPONENT LIFE CYCLES.
    const socket = io();
    console.log('MessageSubmitForm, socket:', socket.id)
    socket.emit('newMsg', myMsg)

    setMyMsg('');
  };

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          name='myMsg'
          value={myMsg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log('Typing...')
            setMyMsg(e.target.value);
          }}
        />
        <input type='submit' value='Submit' />
      </form>
    </section>
  );
};

export default MessageSubmitForm;