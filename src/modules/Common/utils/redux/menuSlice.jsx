import { createSlice } from '@reduxjs/toolkit';
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";

// 초기 상태 설정 (메뉴 관련)
const initialMenuState = {
    selectedMenu: '통합관리',
    selectedSubMenu: '기초정보관리',
    selectedSubSubMenu: { text: '대시보드', component: 'IntegrationDashboardPage', apiPath: FINANCIAL_API.ACCOUNT_SUBJECTS_API, url: '/integration' },
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

// 메뉴 관련 액션과 리듀서 익스포트
export const { setSelectedMenu, setSelectedSubMenu, setSelectedSubSubMenu } = menuSlice.actions;
export default menuSlice.reducer;