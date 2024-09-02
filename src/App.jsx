// 스타일 및 테마 임포트
import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './modules/integration/utils/AppUtil.jsx';

// React 및 MUI 컴포넌트 임포트
import React from 'react';
import { CssBaseline, Box } from '@mui/material';

// 메뉴 아이템 관련 데이터 임포트
import { menuItems, subMenuItems } from './config/menuItems.jsx';

//components
import ContentWrapper from './modules/integration/components/MainContent/ContentWrapper.jsx';
import Sidebar from './modules/integration/components/Slidbar/Sidebar.jsx';
import MainContentPage from './modules/integration/pages/MainContentPage.jsx';
const { Header } = Layout;

// hooks
import AppHook from './modules/integration/hooks/AppHook';
import {Col, Layout, Row} from "antd";
import Logo from "./assets/favicon/OMZ.svg";
import Headers from "./modules/integration/components/Header/Headers.jsx";
import Sider from "antd/es/layout/Sider.js";
import {Content} from "antd/es/layout/layout.js";

// App 컴포넌트 정의
const App = () => {
    const { selectedSubSubMenu } = AppHook();
    const theme = createTheme(themeSettings);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* 헤더 영역 시작 */}
                <Headers />
                {/* 헤더 영역 끝 */}

                <Layout>
                    {/* 사이드바 영역 시작 */}
                    <Sider className="custom-sidebar">
                        <Sidebar />
                    </Sider>
                    {/* 사이드바 영역 끝 */}

                    {/* 메인 컨텐츠 영역 시작 */}
                    <Content>
                        <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: '#0E1B25' }}>
                            <ContentWrapper>
                                <MainContentPage selectedSubSubMenu={selectedSubSubMenu} />
                            </ContentWrapper>
                        </Box>
                    </Content>
                    {/* 메인 컨텐츠 영역 끝 */}
                </Layout>
            </ThemeProvider>
        </Layout>
    );
};

export default App;