import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './modules/Common/utils/redux/menuSlice';
import authReducer from './modules/Common/utils/redux/authSlice';
import notificationReducer from './modules/Common/utils/redux/notificationSlice';

// 스토어 설정
const store = configureStore({
    reducer: {
        menu: menuReducer,  // 메뉴 관련 상태 관리
        auth: authReducer,  // 인증 관련 상태 관리
        notification: notificationReducer,  // 알림 관련 상태 관리
    },
});

export default store;