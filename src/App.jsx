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
import ContentWrapper from './modules/integration/components/ContentWrapper.jsx';
import Sidebar from './modules/integration/components/Sidebar.jsx';
import MainContent from './modules/integration/pages/MainContent.jsx';
import Header from './modules/integration/components/Header/Header.jsx';

// hooks
import AppHook from './modules/integration/hooks/AppHook';

// App 컴포넌트 정의
const App = () => {
    const { selectedMenu, setSelectedMenu, selectedSubMenu, setSelectedSubMenu, selectedSubSubMenu, setSelectedSubSubMenu } = AppHook();

    const theme = createTheme(themeSettings);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", zIndex: 1000, height: '10vh', position: 'relative' }}>
                <Header selectedMenu={selectedMenu} selectedSubMenu={selectedSubMenu} selectedSubSubMenu={selectedSubSubMenu} />
            </Box>
            <Box sx={{ backgroundColor: '#fff', display: 'flex', width: '100%', height: '90vh' }}>
                <Sidebar
                    selectedMenu={selectedMenu} // 현재 선택된 대분류 메뉴 상태
                    setSelectedMenu={setSelectedMenu} // 대분류 메뉴 선택 상태 업데이트 함수
                    selectedSubMenu={selectedSubMenu} // 현재 선택된 중분류 메뉴 상태
                    setSelectedSubMenu={setSelectedSubMenu} // 중분류 메뉴 선택 상태 업데이트 함수
                    selectedSubSubMenu={selectedSubSubMenu} // 현재 선택된 소분류 메뉴 상태
                    setSelectedSubSubMenu={setSelectedSubSubMenu} // 소분류 메뉴 선택 상태 업데이트 함수
                    menuItems={menuItems} // 대분류 메뉴 항목 데이터
                    subMenuItems={subMenuItems} // 중분류 및 소분류 메뉴 항목 데이터
                />
                <Box sx={{ flexGrow: 1, overflowY: 'auto', height: '90vh', backgroundColor: '#f5f5f5' }}>
                    <ContentWrapper>
                        <MainContent selectedSubSubMenu={selectedSubSubMenu} />
                    </ContentWrapper>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;