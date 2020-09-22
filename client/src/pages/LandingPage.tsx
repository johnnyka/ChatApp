// eslint-disable-next-line
import React from 'react';
import InputField from '../components/InputField';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('Clicked on submit.');

  // Store the name in Redux.
  // Go to the chat room.
  // Emit data to server.
  // ...
};



const LandingPage = () => {
  return (
    <>
      <div>This is the landing page.</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputField label='Name' name='name' />
        <input type='submit' value='Submit' />
        <div>Feedback message</div>
      </form>
    </>
  );
};

export default LandingPage;
