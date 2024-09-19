import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './modules/Common/utils/AppUtil.jsx';
import React, { useEffect, useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie'; // 쿠키 사용
import ContentWrapper from './modules/Common/components/MainContent/ContentWrapper.jsx';
import Sidebar from './modules/Common/components/Slidbar/Sidebar.jsx';
import MainContentPage from './modules/Common/pages/MainContentPage.jsx';
import Headers from './modules/Common/components/Header/Headers.jsx';
import { subMenuItems } from './config/menuItems.jsx';
import { Layout } from "antd";
import LoginPage from "./modules/Common/pages/LoginPage.jsx";
import ProtectedRoute from "./modules/Common/pages/ProtectedRoute.jsx"; // 쿠키 기반 보호 경로
import { setAuth } from "./modules/Common/utils/redux/authSlice.jsx";
import { useDispatch } from "react-redux";
import RegisterPage from "./modules/Common/pages/RegisterPage.jsx";
import { notification } from 'antd';
import {NotificationProvider, useNotificationContext} from "./modules/Common/utils/NotificationContext.jsx";

const { Sider, Content } = Layout;
const theme = createTheme(themeSettings);

const AppContent = () => {
    const notify = useNotificationContext();
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            dispatch(setAuth(token));  // 쿠키에 있는 토큰으로 Redux 상태 초기화
        }
    }, [dispatch]);

    useEffect(() => {
        if (location.state?.login) {
            notify('success', '로그인 성공', '환영합니다! 메인 페이지로 이동했습니다.', 'top');
            navigate('/groupware', {replace: true, state: {}});
        }
    }, [location.state, notify]);


    const renderRoutes = () => {
        const routes = [];

        // 모든 메뉴와 서브메뉴 항목을 순회하면서 동적 라우트를 설정
        for (const mainMenu in subMenuItems) {
            subMenuItems[mainMenu].forEach((subMenu) => {
                subMenu.items.forEach((subSubItem) => {
                    routes.push(
                        <Route
                            key={subSubItem.url}
                            path={subSubItem.url}
                            element={<MainContentPage selectedSubSubMenu={subSubItem} />}
                        />
                    );
                });
            });
        }

        return routes;
    };

    return (
        <>
            <Routes>
                {/* 로그인 페이지는 전체화면으로 렌더링 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* 그 외의 경로에서는 헤더와 사이드바가 보이는 일반 레이아웃을 사용 */}
                <Route
                    path="/*"
                    element={
                        <Layout style={{ minHeight: '100vh' }}>
                            <Headers />
                            <Layout>
                                <Sider className="custom-sidebar">
                                    <Sidebar />
                                </Sider>

                                <Content style={{ transition: 'margin-left 0.3s ease' }}>
                                    <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: '#fff' }}>
                                        <ContentWrapper>
                                            <Routes>
                                                <Route
                                                    path="/"
                                                    element={
                                                        <ProtectedRoute>
                                                            <Navigate to="/groupware" replace />
                                                        </ProtectedRoute>
                                                    }
                                                />

                                                {/* 동적으로 라우트들을 렌더링 */}
                                                {renderRoutes().map((route) => (
                                                    <Route
                                                        key={route.key}
                                                        path={route.props.path}
                                                        element={
                                                            <ProtectedRoute>
                                                                {route.props.element}
                                                            </ProtectedRoute>
                                                        }
                                                    />
                                                ))}
                                                {/* 정의되지 않은 경로는 JWT 토큰이 유효한지에 따라 메인 페이지 또는 로그인 페이지로 리다이렉트 */}
                                                <Route
                                                    path="*"
                                                    element={
                                                        Cookies.get('jwt')
                                                            ? <Navigate to="/groupware" replace /> // JWT 토큰이 있으면 메인 페이지로 리다이렉트
                                                            : <Navigate to="/login" replace /> // JWT 토큰이 없으면 로그인 페이지로 리다이렉트
                                                    }
                                                />
                                            </Routes>
                                        </ContentWrapper>
                                    </Box>
                                </Content>
                            </Layout>
                        </Layout>
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <NotificationProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AppContent />
                </Router>
            </ThemeProvider>
        </NotificationProvider>
    );
};

export default App;