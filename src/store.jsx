import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './modules/Common/utils/redux/menuSlice';
import authReducer from './modules/Common/utils/redux/authSlice';
import notificationReducer from './modules/Common/utils/redux/notificationSlice';

// 스토어 설정
const store = configureStore({
    reducer: {
        menu: menuReducer,  // 메뉴 슬라이스 추가
        auth: authReducer,  // 인증 슬라이스 추가
        notification: notificationReducer,  // 알림 슬라이스 추가
    },
});

export default store;