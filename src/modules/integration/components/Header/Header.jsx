import React from 'react';
// MUI 및 Ant Design 컴포넌트를 임포트
import { AppBar, Toolbar, Box, IconButton, Typography, Breadcrumbs } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import SearchBar from './SearchBar.jsx'; // 검색바 컴포넌트 임포트
import SettingsIcon from '@mui/icons-material/Settings'; // 설정 아이콘 임포트
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; // 네비게이션 아이콘 임포트
import Logo from '../../../../assets/favicon/OMZ.svg'; // 로고 이미지 파일 임포트

// Header 컴포넌트 정의, 메뉴 선택 상태를 props로 받음
function Header({ selectedMenu, selectedSubMenu, selectedSubSubMenu }) {
    // 브레드크럼을 렌더링하는 함수 정의
    const renderBreadcrumb = () => {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ color: 'text.secondary', overflow: 'hidden', display: 'flex',
                                                       textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedMenu && (
                    <Typography sx={{ fontWeight: selectedSubMenu === '' ? selectedSubSubMenu === '' ? '700' : '400' : '400',
                                      color: selectedSubMenu === '' ? selectedSubSubMenu === '' ? 'text.primary' : 'text.secondary' : 'text.secondary' }}>
                        {selectedMenu}</Typography>
                )}
                {selectedSubMenu && (
                    <Typography sx={{ fontWeight: selectedSubSubMenu === '' ? '700' : '400',
                                      color: selectedSubSubMenu === '' ? 'text.primary' : 'text.secondary'}}>
                        {selectedSubMenu}</Typography>
                )}
                {selectedSubSubMenu && (
                    <Typography sx={{fontWeight: '700', color: 'text.primary'}}>{selectedSubSubMenu.text}</Typography>
                )}
            </Breadcrumbs>
        );
    };

    return (
        <AppBar position="static" color="default" elevation={0} sx={{ height: '100%', backgroundColor: '#fff' }}>
            <Toolbar sx={{ justifyContent: 'space-between', padding : '0px !important', alignItems: 'center'}}>
                {/* 로고 영역 */}
                <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '30px', minWidth: '350px', maxWidth: '30vw',
                    }}>
                    <img src={Logo}
                         alt="로고"
                         style={{ height: '80px', maxHeight: '10vh', maxWidth: '100%', width: 'auto'}}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '300px', width: '100%', alignItems: 'center' }}>
                    {/* 검색바 영역 */}
                    <Space direction="vertical" size="middle">
                        <Space.Compact >
                            <Input addonBefore={<SearchOutlined />} placeholder="검색어를 입력하세요." />
                        </Space.Compact>
                    </Space>

                    {/* 브레드크럼 및 설정 아이콘 영역 */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', minWidth: '500px',
                               maxWidth: '600px', flexShrink: 1, paddingRight: '30px' }}>
                        {renderBreadcrumb()} {/* 브레드크럼 렌더링 */}
                        <IconButton sx={{ ml: 2 }}>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;