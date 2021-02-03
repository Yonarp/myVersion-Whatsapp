import {createSlice} from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        isDark: false
    },
    reducers: {
        setDark: (state,action) => {
            state.isDark = action.payload;
        }
    },
});

export const {setDark} = darkModeSlice.actions;
export const selectDarkMode = (state) => state.darkMode.isDark;

export default darkModeSlice.reducer;