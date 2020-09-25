import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { bool: boolean, reason: string } = { bool: false, reason: '' };

const disconnectSlice = createSlice({
  name: 'isDisconnected',
  initialState,
  reducers: {
    disconnectUser(state, action: PayloadAction<{ bool: boolean, reason: string }>) {
      return action.payload;
    }
  }
});

export const { disconnectUser } = disconnectSlice.actions;
export default disconnectSlice.reducer;
