// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialState = {
    selectedMenu: '그룹웨어',
    selectedSubMenu: '기초정보관리',
    selectedSubSubMenu: { text: '회사정보수정', component: null, apiPath: null },
};

// Redux 슬라이스 생성
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
        setSelectedSubMenu: (state, action) => {
            state.selectedSubMenu = action.payload;
        },
        setSelectedSubSubMenu: (state, action) => {
            state.selectedSubSubMenu = action.payload;
        },
    },
});

// 스토어 설정
const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
    },
});

// 액션과 스토어를 익스포트
export const {
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedSubSubMenu
} = menuSlice.actions;
export default store;