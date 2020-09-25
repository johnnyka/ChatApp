import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

const infoModalSlice = createSlice({
  name: 'infoModalVisibility',
  initialState,
  reducers: {
    showInfoModal(state, _action: PayloadAction<void>) {
      return !state;
    },
    hideInfoModal(state, _action: PayloadAction<void>) {
      return !state;
    }
  }
});

export const { showInfoModal, hideInfoModal } = infoModalSlice.actions;
export default infoModalSlice.reducer;
