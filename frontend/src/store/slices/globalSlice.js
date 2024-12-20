import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    token: null,
    checkTokenLoading: true
}

export const globalSlice = createSlice({
    name: 'global',
    initialState, 
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setCheckTokenLoading: (state, action) => {
            state.checkTokenLoading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        resetState: (state, action) => {
            state.loggedIn = false;
            state.token = null;
            state.checkTokenLoading = false;
        }
    }
});

export const { setCheckTokenLoading, setLoggedIn, setToken, resetState } = globalSlice.actions;

export default globalSlice.reducer;