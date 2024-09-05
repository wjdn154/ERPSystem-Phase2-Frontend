import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './modules/integration/utils/AppUtil.jsx';
import React, { useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSubSubMenu } from './store'; // Redux 액션
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ContentWrapper from './modules/integration/components/MainContent/ContentWrapper.jsx';
import Sidebar from './modules/integration/components/Slidbar/Sidebar.jsx';
import MainContentPage from './modules/integration/pages/MainContentPage.jsx';
import Headers from './modules/integration/components/Header/Headers.jsx';
import { subMenuItems } from './config/menuItems.jsx';
import { Layout } from "antd";

const { Sider, Content } = Layout;
const theme = createTheme(themeSettings);

const AppContent = () => {
    const selectedSubSubMenu = useSelector((state) => state.menu.selectedSubSubMenu);

    // 모든 URL을 라우팅 설정에서 처리하기 위한 동적 컴포넌트
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
                    <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: '#0E1B25' }}>
                        <ContentWrapper>
                            <Routes>
                                {/* 동적으로 라우트들을 렌더링 */}
                                {renderRoutes()}

                                {/* 기본 경로로 이동할 때 */}
                                <Route
                                    path="/"
                                    element={<MainContentPage selectedSubSubMenu={selectedSubSubMenu} />}
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