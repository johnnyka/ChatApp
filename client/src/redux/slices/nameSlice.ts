import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    updateName(_state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

// Export action.
export const { updateName } = nameSlice.actions;

// Export reducer.
export default nameSlice.reducer;
