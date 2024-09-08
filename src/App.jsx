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
import { Layout } from "antd";
import LoginPage from "./modules/Common/pages/LoginPage.jsx";

const { Sider, Content } = Layout;
const theme = createTheme(themeSettings);

const AppContent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    // 쿠키에서 로그인 상태 복원
    useEffect(() => {
        const storedUsername = Cookies.get('username');
        setIsLoggedIn(!!storedUsername); // 쿠키가 있으면 로그인 상태로 설정
    }, []);

    // 로그인 상태 변경 처리 함수
    const handleLoginStatusChange = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 로그인 상태 변경 핸들러를 헤더에 전달 */}
            <Headers onLoginStatusChange={handleLoginStatusChange} />
            <Layout>
                <Sider className="custom-sidebar">
                    <Sidebar />
                </Sider>
                <Content style={{ transition: 'margin-left 0.3s ease' }}>
                    <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: '#fff' }}>
                        <ContentWrapper>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />

                                {/* 로그인 여부에 따른 보호된 경로 */}
                                <Route
                                    path="/"
                                    element={
                                        isLoggedIn ? (
                                            <MainContentPage />
                                        ) : (
                                            <Navigate to="/login" />
                                        )
                                    }
                                />
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