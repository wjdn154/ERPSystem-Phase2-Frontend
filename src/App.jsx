// 스타일 및 테마 임포트
import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './modules/integration/utils/AppUtil.jsx';

// React 및 MUI 컴포넌트 임포트
import React, {useMemo} from 'react';
import { CssBaseline, Box } from '@mui/material';

// Redux 관련 임포트
import { useSelector } from 'react-redux';

// components
import ContentWrapper from './modules/integration/components/MainContent/ContentWrapper.jsx';
import Sidebar from './modules/integration/components/Slidbar/Sidebar.jsx';
import MainContentPage from './modules/integration/pages/MainContentPage.jsx';
import Headers from './modules/integration/components/Header/Headers.jsx';

// Antd 컴포넌트 임포트
import { Layout } from "antd";

const { Sider, Content } = Layout;

// 테마 생성
const theme = createTheme(themeSettings);

// App 컴포넌트 정의
const App = () => {
    // Redux에서 상태 가져오기
    const selectedSubSubMenu = useSelector((state) => state.menu.selectedSubSubMenu);
    const memoizedSubSubMenu = useMemo(() => selectedSubSubMenu, [selectedSubSubMenu]);

    console.log('ParentComponent rendered');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout style={{ minHeight: '100vh' }}>
                {/* 헤더 영역 */}
                <Headers />

                <Layout>
                    {/* 사이드바 영역 */}
                    <Sider className="custom-sidebar">
                        <Sidebar />
                    </Sider>

                    {/* 메인 컨텐츠 영역 */}
                    <Content style={{ transition: 'margin-left 0.3s ease' }}>
                        <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: '#0E1B25' }}>
                            <ContentWrapper>
                                {/* 상태에 따라 MainContentPage에서 직접적으로 컴포넌트 렌더링 */}
                                <MainContentPage selectedSubSubMenu={memoizedSubSubMenu} />
                            </ContentWrapper>
                        </Box>
                    </Content>
                </Layout>
            </Layout>
        </ThemeProvider>
    );
};

export default App;