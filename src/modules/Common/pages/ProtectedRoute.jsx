import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    // 로그인이 안되어 있으면 로그인 페이지로 리디렉션
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children; // 로그인된 상태라면 컴포넌트 렌더링
};

export default ProtectedRoute;