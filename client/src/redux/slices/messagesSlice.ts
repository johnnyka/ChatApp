import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMessage } from '../../utils/types';

const initialState: TMessage[] = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<TMessage>) {
      return [ ...state, action.payload ];
    },
    clearMessages(_state, _action: PayloadAction<null>) {
      return [];
    }
  }
});

export const { addMessage, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
