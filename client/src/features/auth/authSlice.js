import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user"),
    token: localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            const { token } = payload;
            const user = JSON.stringify(payload.user)
            state.user = user;
            state.token = token;
            localStorage.setItem("user", user)
            localStorage.setItem("token", token)
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        },
    },
});

export const authReducer = authSlice.reducer;

export const { setCredentials, logOut } = authSlice.actions;

export const selectUser = (state) => JSON.parse(state.auth.user);
export const selectToken = (state) => state.auth.token;
export const selectAuthenticated = (state) => JSON.parse(state.auth.user) !== null && state.auth.token !== null;
