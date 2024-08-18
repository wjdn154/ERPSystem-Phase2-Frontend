import './styles/App.css'; // 앱의 전역 스타일을 가져옴
import React, { useState } from 'react'; // React 및 useState 훅을 가져옴
import { CssBaseline, Box } from '@mui/material'; // Material-UI의 기본 컴포넌트 가져옴
import ContentWrapper from './modules/integration/components/ContentWrapper.jsx'; // ContentWrapper 컴포넌트 가져옴
import Sidebar from './modules/integration/components/Sidebar.jsx'; // Sidebar 컴포넌트 가져옴
import MainContent from './modules/integration/pages/MainContent.jsx'; // MainContent 컴포넌트 가져옴
import Header from './modules/integration/components/Header'; // Header 컴포넌트 가져옴
import { menuItems, subMenuItems } from './modules/integration/utils/menuItems'; // 메뉴 데이터 가져옴

function App() {
    // 상태 선언: 현재 선택된 메뉴와 서브 메뉴를 관리함
    const [selectedMenu, setSelectedMenu] = useState('마이페이지');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');

    return (
        <>
            <CssBaseline /> {/* Material-UI의 기본 스타일을 초기화하여 브라우저 간 일관성을 유지 */}
            <Header /> {/* 상단 헤더 컴포넌트 렌더링 */}
            <Box sx={{ display: 'flex', width: '100%', height: '100vh', backgroundColor: '#f7f8fa' }}>
                {/* Sidebar 영역: 좌측 고정된 사이드바 */}
                <Box sx={{ backgroundColor: '#fff', flexShrink: 0 }}>
                    <Sidebar
                        selectedMenu={selectedMenu} // 현재 선택된 메뉴 상태
                        setSelectedMenu={setSelectedMenu} // 메뉴 선택 상태 업데이트 함수
                        selectedSubMenu={selectedSubMenu} // 현재 선택된 서브 메뉴 상태
                        setSelectedSubMenu={setSelectedSubMenu} // 서브 메뉴 선택 상태 업데이트 함수
                        menuItems={menuItems} // 메인 메뉴 항목 데이터
                        subMenuItems={subMenuItems} // 서브 메뉴 항목 데이터
                    />
                </Box>
                {/* 메인 컨텐츠 영역: Sidebar 옆에 표시되는 메인 콘텐츠 */}
                <Box sx={{ flexGrow: 1 }}>
                    <ContentWrapper>
                        <MainContent selectedSubMenu={selectedSubMenu} /> {/* 선택된 서브 메뉴에 따른 메인 콘텐츠 */}
                    </ContentWrapper>
                </Box>
            </Box>
        </>
    );
}

export default App;