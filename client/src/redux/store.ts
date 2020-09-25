import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
// import socketMiddleware from './middlewares/socketMiddleware';

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
