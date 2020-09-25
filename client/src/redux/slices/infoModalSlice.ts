import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { create } from 'domain';

const initialState: boolean = false;

const infoModalSlice = createSlice({
  name: 'infoModalVisibility',
  initialState,
  reducers: {
    showInfoModal(_state, _action: PayloadAction<void>) {
      return true;
    },
    hideInfoModal(_state, _action: PayloadAction<void>) {
      return false;
    }
  }
});

export const { showInfoModal, hideInfoModal } = infoModalSlice.actions;
export default infoModalSlice.reducer;
