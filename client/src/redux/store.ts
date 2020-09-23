import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});

// Comment: Skip hot-reloading of rootReducer.

export default store;
