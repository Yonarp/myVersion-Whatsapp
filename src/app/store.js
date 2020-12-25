import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counterSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
