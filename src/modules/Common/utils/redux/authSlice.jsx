import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// 초기 상태 설정
const initialAuthState = {
    token: null,
    userNickname: null,
    permission: {},
    isAdmin: false,
};

// 로컬 스토리지에서 JWT 토큰과 권한 정보를 읽어오는 함수
const getStoredAuthState = () => {
    const storedToken = localStorage.getItem('token');
    const storedPermission = JSON.parse(localStorage.getItem('permission')) || {};  // 권한 정보를 객체로 파싱
    const storedIsAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;

    if (storedToken && typeof storedToken === 'string') {
        try {
            const decodedToken = jwtDecode(storedToken);
            return {
                token: storedToken,
                userNickname: decodedToken.userNickname,
                permission: storedPermission,
                isAdmin: storedIsAdmin,
            };
        } catch (error) {
            console.error('토큰이 유효하지 않습니다.', error);
            return { token: null, userNickname: null, permission: {}, isAdmin: false };
        }
    }
    return { token: null, userNickname: null, permission: {}, isAdmin: false };
};

// 초기 상태에 로컬 스토리지에서 토큰과 권한을 읽어와서 반영
const storedAuthState = getStoredAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState: { ...initialAuthState, ...storedAuthState },
    reducers: {
        setAuth: (state, action) => {
            const { token, permission, isAdmin } = action.payload;  // 토큰, 권한, 관리자 여부 정보를 분리

            if (token && typeof token === 'string') {
                state.token = token;
                state.permission = permission || {};  // 권한 정보를 객체로 설정
                state.isAdmin = isAdmin;  // 관리자 여부 설정

                try {
                    const decodedToken = jwtDecode(token);
                    state.userNickname = decodedToken.userNickname;

                    // 로컬 스토리지에 토큰, 권한 정보, 관리자 여부 저장
                    localStorage.setItem('token', token);
                    localStorage.setItem('permission', JSON.stringify(state.permission));  // 권한 정보를 JSON 문자열로 저장
                    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));  // 관리자 여부 저장
                } catch (error) {
                    console.error('토큰 오류', error);
                }
            }
        },
        logout: (state) => {
            state.token = null;
            state.userNickname = null;
            state.permission = {};
            state.isAdmin = false;

            // 로컬 스토리지에서 토큰, 권한 정보, 관리자 여부 삭제
            localStorage.removeItem('token');
            localStorage.removeItem('permission');
            localStorage.removeItem('isAdmin');
        },
    },
});

// 액션을 내보내기
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;