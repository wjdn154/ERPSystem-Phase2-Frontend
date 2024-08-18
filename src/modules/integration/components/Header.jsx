import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material'; // Material-UI 컴포넌트들 가져옴
import SearchBar from './SearchBar'; // 검색바 컴포넌트 가져옴
import SettingsIcon from '@mui/icons-material/Settings'; // Material-UI의 설정 아이콘 가져옴
import Logo from '../../../assets/favicon/OMZ.svg'; // 로고 이미지 파일 가져옴

// Header 컴포넌트: 상단 네비게이션 바 역할을 함
function Header() {
    return (
        <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#ffffff' }}>
            <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0 10px', sm: '0 20px', md: '0 30px', lg: '0 40px' } }}>
                {/* 로고 섹션 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} alt="로고" style={{ height: '40px', maxHeight: '100%', maxWidth: '100%', width: 'auto' }} />
                </Box>

                {/* 검색바 섹션 */}
                <Box sx={{ border: '1px solid #000', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                    <SearchBar /> {/* 검색바 컴포넌트 삽입 */}
                </Box>

                {/* 설정 아이콘 및 페이지 이름 섹션 */}
                <Box edge="end">
                    {/* 현재 페이지 위치를 나타내는 브레드크럼 텍스트 */}
                    <Typography variant="body" sx={{ ml: 2, color: 'text.secondary', marginRight: '30px' }}>
                        Home / Page Name
                    </Typography>
                    {/* 설정 아이콘 버튼 */}
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;