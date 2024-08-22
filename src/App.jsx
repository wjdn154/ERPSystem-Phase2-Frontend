import './styles/App.css'; // 앱의 전역 스타일을 가져옴
import React, { useState } from 'react'; // React 및 useState 훅을 가져옴
import { CssBaseline, Box } from '@mui/material'; // Material-UI의 기본 컴포넌트 가져옴
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContentWrapper from './modules/integration/components/ContentWrapper.jsx'; // ContentWrapper 컴포넌트 가져옴
import Sidebar from './modules/integration/components/Sidebar.jsx'; // Sidebar 컴포넌트 가져옴
import MainContent from './modules/integration/pages/MainContent.jsx'; // MainContent 컴포넌트 가져옴
import Header from './modules/integration/components/Header'; // Header 컴포넌트 가져옴
import { menuItems, subMenuItems } from './modules/integration/utils/menuItems'; // 메뉴 데이터 가져옴

const theme = createTheme({
    typography: {
        fontFamily: 'NotoSansKR',
    },
});

function App() {
    // 상태 선언: 현재 선택된 대분류, 중분류, 소분류 메뉴를 관리함
    const [selectedMenu, setSelectedMenu] = useState('그룹웨어');
    const [selectedSubMenu, setSelectedSubMenu] = useState('기초정보관리');
    const [selectedSubSubMenu, setSelectedSubSubMenu] = useState('회사정보수정');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Material-UI의 기본 스타일을 초기화하여 브라우저 간 일관성을 유지 */}
            <Box sx={{ boxShadow: 1, zIndex: 1000, height: '10vh', position: 'relative' }}>
                <Header
                    selectedMenu={selectedMenu} // 현재 선택된 대분류 메뉴 상태
                    selectedSubMenu={selectedSubMenu} // 현재 선택된 중분류 메뉴 상태
                    selectedSubSubMenu={selectedSubSubMenu} // 현재 선택된 소분류 메뉴 상태
                /> {/* 상단 헤더 컴포넌트 렌더링 */}
            </Box>
            <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>
                {/* Sidebar 영역: 좌측 고정된 사이드바 */}
                <Box sx={{ backgroundColor: '#fff' }}>
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
                </Box>
                {/* 메인 컨텐츠 영역: Sidebar 옆에 표시되는 메인 콘텐츠 */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', height: '90vh', backgroundColor: '#f5f5f5' }}>
                    <ContentWrapper>
                        <MainContent selectedSubSubMenu={selectedSubSubMenu} /> {/* 선택된 소분류 메뉴에 따른 메인 콘텐츠 */}
                    </ContentWrapper>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;