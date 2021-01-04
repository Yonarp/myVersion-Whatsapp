import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import chatReducer from '../features/chatSlice';
import darkModeReducer from '../features/darkModeSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    darkMode: darkModeReducer,
  },
});
