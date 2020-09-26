import { combineReducers } from '@reduxjs/toolkit';
import nameReducer from './slices/nameSlice';
import messagesReducer from './slices/messagesSlice';
import usersReducer from './slices/usersSlice';
import isTypingReducer from './slices/isTypingSlice';
import emitEventReducer from './slices/emitEventSlice';
import disconnectReducer from './slices/disconnectSlice';
import infoModalReducer from './slices/infoModalSlice';
import msgsWithHideLabelsReducer from './slices/msgsWithHideLabelsSlice';

const rootReducer = combineReducers({
  name: nameReducer,
  messages: messagesReducer,
  users: usersReducer,
  isTypingList: isTypingReducer,
  emitEvent: emitEventReducer,
  disconnected: disconnectReducer,
  infoModalVisibility: infoModalReducer,
  msgsWithHideLabels: msgsWithHideLabelsReducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
