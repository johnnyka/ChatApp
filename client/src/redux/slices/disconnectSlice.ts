import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIsDisconnected } from '../../utils/types';

const initialState: TIsDisconnected = { bool: false, reason: '' };

const disconnectSlice = createSlice({
  name: 'isDisconnected',
  initialState,
  reducers: {
    disconnectUser(_state, action: PayloadAction<TIsDisconnected>) {
      return action.payload;
    }
  }
});

export const { disconnectUser } = disconnectSlice.actions;
export default disconnectSlice.reducer;
