// eslint-disable-next-line
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { NavigationBar, MessageBoard, MessageSubmitForm } from '../components';

const ChatPage = (): JSX.Element => {
  
  const name = useSelector((state: RootState) => state.name);



  return (
    <>
      <div>This is the chat page.</div>
      <div>{name}</div>
      {/* {console.log('Name:', name)} */}

      <NavigationBar />
      <MessageBoard />
      <MessageSubmitForm />

    </>
  );
};

export default ChatPage;

// TODO:
// PROTOTYPE A DESIGN, I.E. FIX COMPONENTS.
//   - LEAVE ROOM BUTTOM WILL ACTUALLY BE THE GO TO PREVIOUS PAGE. UPPER LEFT CORNER.
//   - INFO BUTTON ON UPPER RIGHT CORNER -> USERS LIST.
//   - CHAT ROOM NAME, UPPER CENTER.
//   - MESSAGE BOARD.
//   - TEXT INPUT, BOTTOM.
//   - SEND BUTTON, BOTTOM RIGHT CORNER.
//   MESSAGES:
//     - WITHOUT PICS.
//     - NAME & TIME, LABEL ON TOP (OTHERS MESSAGES).
//     - TIME, LABEL ON TOP (MY MESSAGES).
// DISPLAY ALL USERS.
// WELCOME THE NEW USER.
// NOTIFY EVERYONE ELSE THAT NEW USER HAS JOINED.
// WHEN SEND NEW MESSAGE 
//   -> DISPLAY SENT MESSAGE LOCALLY 
//   -> EMIT MESSAGE TO SERVER 
//   -> SERVER BROADCAST MESSAGE TO EVERYONE ELSE
//   -> DISPLAY THE BROADCASTED MESSAGE
// WHEN USER DISCONNECTS (LEAVES ROOM, CLOSES TAB, GOES TO ANOTHER PAGE)
//   (GO BACK IN HISTORY SHOULD ALSO DISCONNECT, SO THAT THE USER CANNOT JOIN THE SAME ROOM TWICE WITH DIFFERENT NAMES.)
//   -> REMOVE USER FROM USER STORAGE IN SERVER
//   -> SERVER BROADCAST NOTIFICATION TO EVERYONE ELSE
