import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    updateName(_state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

export const { updateName } = nameSlice.actions;
export default nameSlice.reducer;
