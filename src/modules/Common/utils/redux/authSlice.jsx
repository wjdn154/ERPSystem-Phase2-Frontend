import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialAuthState = {
    token: null,
    userNickname: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload;
            const decodedToken = jwtDecode(action.payload);
            state.userNickname = decodedToken.userNickname;
        },
        logout: (state) => {
            state.token = null;
            state.userNickname = null;
        },
    },
});

// 액션을 내보내기 (setAuth, logout)
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;