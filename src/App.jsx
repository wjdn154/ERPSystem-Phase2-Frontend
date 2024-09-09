import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './modules/Common/utils/AppUtil.jsx';
import React, { useEffect, useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // 쿠키 사용
import ContentWrapper from './modules/Common/components/MainContent/ContentWrapper.jsx';
import Sidebar from './modules/Common/components/Slidbar/Sidebar.jsx';
import MainContentPage from './modules/Common/pages/MainContentPage.jsx';
import Headers from './modules/Common/components/Header/Headers.jsx';
import { subMenuItems } from './config/menuItems.jsx';
import { Layout } from "antd";
import LoginPage from "./modules/Common/pages/LoginPage.jsx";
import ProtectedRoute from "./modules/Common/pages/ProtectedRoute.jsx"; // 쿠키 기반 보호 경로
import { jwtDecode } from "jwt-decode";
import {setAuth} from "./store.jsx";
import {useDispatch} from "react-redux";

const { Sider, Content } = Layout;
const theme = createTheme(themeSettings);

const AppContent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            dispatch(setAuth(token));  // 쿠키에 있는 토큰으로 Redux 상태 초기화
        }
    }, []);

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
                                <Route path="/login" element={<LoginPage />} />

                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute>
                                            <MainContentPage />
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
                            </Routes>
                        </ContentWrapper>
                    </Box>
                </Content>
            </Layout>
        </Layout>
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
};

export default App;