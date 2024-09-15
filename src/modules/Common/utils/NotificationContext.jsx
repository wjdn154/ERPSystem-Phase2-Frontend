import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const notify = (type, message, description, placement = 'top') => {
        api[type]({
            message,
            description,
            placement,
        });
    };

    return (
        <NotificationContext.Provider value={notify}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};