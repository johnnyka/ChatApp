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

// Export action type strings.
export const { addMessage, clearMessages } = messagesSlice.actions;

// Export reducer.
export default messagesSlice.reducer;
