import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { event: string | null, value: string | boolean } = { event: null, value: '' };

const emitEventSlice = createSlice({
  name: 'emitEvent',
  initialState,
  reducers: {
    sendMessage(_state, action: PayloadAction<string>) {
      return { event: 'message', value: action.payload };
    },
    isTyping(_state, action: PayloadAction<boolean>) {
      console.log('isTyping action:', action.payload)
      return { event: 'isTyping', value: action.payload };
    }
  }
});

export const { sendMessage, isTyping } = emitEventSlice.actions;
export default emitEventSlice.reducer;
