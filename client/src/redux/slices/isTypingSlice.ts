import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const isTypingSlice = createSlice({
  name: 'isTypingList',
  initialState,
  reducers: {
    addToIsTypingList(state: string[], action: PayloadAction<string>) {
      return state.includes(action.payload) ? [ ...state ] : [ ...state, action.payload ];
    },
    removeFromIsTypingList(state: string[], action: PayloadAction<string>) {
      return state.filter(name => name !== action.payload);
    }
  }
});

export const { addToIsTypingList, removeFromIsTypingList } = isTypingSlice.actions;
export default isTypingSlice.reducer;
