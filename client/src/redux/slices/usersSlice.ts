import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserList(_state, action: PayloadAction<string[]>) {
      return action.payload;
    }
  }
});

export const { updateUserList } = usersSlice.actions;
export default usersSlice.reducer;
