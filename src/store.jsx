import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import menuReducer from './modules/Common/utils/redux/menuSlice';
import authReducer from './modules/Common/utils/redux/authSlice';
import notificationReducer from './modules/Common/utils/redux/notificationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist 관련 경고 무시
        }),
});

export const persistor = persistStore(store);

export default store;