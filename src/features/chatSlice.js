import {createSlice} from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name:'chat',
    initialState: {
        chatId: null,
        chatName: null,
        private: false,
    },

    reducers: {
        setChat: (state,action)=> {
            state.chatId = action.payload.chatId
            state.chatName = action.payload.chatName
            state.private = action.payload.private
        }
    },
});

export const {setChat} = chatSlice.actions
export const selectChatId = (state) => state.chat.chatId;
export const selectChatName = (state) => state.chat.chatName;
export const checkIfPrivate = (state) => state.chat.private;

export default chatSlice.reducer;