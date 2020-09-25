import { combineReducers } from '@reduxjs/toolkit';
import nameReducer from './slices/nameSlice';
import messagesReducer from './slices/messagesSlice';
import usersReducer from './slices/usersSlice';
import isTypingReducer from './slices/isTypingSlice';
import emitEventReducer from './slices/emitEventSlice';

const rootReducer = combineReducers({
  name: nameReducer,
  messages: messagesReducer,
  users: usersReducer,
  isTypingList: isTypingReducer,
  emitEvent: emitEventReducer
});

// Export type for later type definition.
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
