import { configureStore, createSlice } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialMenuState = {
    selectedMenu: '그룹웨어',
    selectedSubMenu: '기초정보관리',
    selectedSubSubMenu: { text: '회사정보수정', component: null, apiPath: null, url: '/groupware/basic-info/company-edit' },
};

// Redux 슬라이스 생성 (메뉴 관련)
const menuSlice = createSlice({
    name: 'menu',
    initialState: initialMenuState,
    reducers: {
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
        setSelectedSubMenu: (state, action) => {
            state.selectedSubMenu = action.payload;
        },
        setSelectedSubSubMenu: (state, action) => {
            state.selectedSubSubMenu = { ...action.payload };
        },
    },
});

// 스토어 설정
const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
    },
});

// 메뉴 관련 액션과 스토어를 익스포트
export const {
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedSubSubMenu,
} = menuSlice.actions;

export default store;