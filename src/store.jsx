import { configureStore, createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from "jwt-decode";
// 초기 상태 설정 (메뉴 관련)
const initialMenuState = {
    selectedMenu: '그룹웨어',
    selectedSubMenu: '기초정보관리',
    selectedSubSubMenu: { text: '회사정보수정', component: null, apiPath: null, url: '/groupware/basic-info/company-edit' },
};

// 메뉴 관련 슬라이스 생성
const menuSlice = createSlice({
    name: 'menu',
    initialState: initialMenuState,
    reducers: {
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;  // 선택된 메뉴 상태 설정
        },
        setSelectedSubMenu: (state, action) => {
            state.selectedSubMenu = action.payload;  // 선택된 서브메뉴 상태 설정
        },
        setSelectedSubSubMenu: (state, action) => {
            state.selectedSubSubMenu = { ...action.payload };  // 선택된 서브서브메뉴 상태 설정
        },
    },
});

// 초기 상태 설정 (인증 관련)
const initialAuthState = {
    token: null,
    userNickname: null,
};

// 인증 관련 슬라이스 생성
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload;  // JWT 토큰 설정
            const decodedToken = jwtDecode(action.payload);  // 토큰 디코드하여 사용자 정보 추출
            console.log("디코드된 토큰", decodedToken);
            state.userNickname = decodedToken.userNickname;  // 디코드된 토큰에서 사용자 이름 설정
        },
        logout: (state) => {
            state.token = null;  // 로그아웃 시 토큰 제거
            state.userNickname = null;  // 로그아웃 시 사용자 이름 제거
        },
    },
});

// 스토어 설정
const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,  // 메뉴 슬라이스 추가
        auth: authSlice.reducer,  // 인증 슬라이스 추가
    },
});

// 메뉴와 인증 관련 액션과 스토어를 익스포트
export const {
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedSubSubMenu,
} = menuSlice.actions;

export const { setAuth, logout } = authSlice.actions;

export default store;