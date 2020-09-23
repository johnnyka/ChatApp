import { combineReducers } from '@reduxjs/toolkit';
import nameReducer from './slices/nameSlice';

const rootReducer = combineReducers({
  name: nameReducer
});

// Export type for later type definition.
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
