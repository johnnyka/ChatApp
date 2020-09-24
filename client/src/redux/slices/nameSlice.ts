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

// Export action type strings.
export const { updateName } = nameSlice.actions;

// Export reducer.
export default nameSlice.reducer;
