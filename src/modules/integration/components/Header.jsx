import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Breadcrumbs } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import SearchBar from './SearchBar';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Logo from '../../../assets/favicon/OMZ.svg';

function Header({ selectedMenu, selectedSubMenu, selectedSubSubMenu }) {

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
                    <Typography sx={{fontWeight: '700', color: 'text.primary'}}>{selectedSubSubMenu}</Typography>
                )}
            </Breadcrumbs>
        );
    };

    return (
        <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#ffffff'}}>
            <Toolbar sx={{ justifyContent: 'space-between', padding : '0px !important', alignItems: 'center' }}>
                {/* 로고 영역 */}
                <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '30px', minWidth: '350px', maxWidth: '30vw',
                    '&:hover': {
                        cursor: 'pointer'
                    }}}>
                    <img src={Logo}
                         alt="로고"
                         style={{ height: '80px', maxHeight: '10vh', maxWidth: '100%', width: 'auto'}} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '300px', width: '100%' }}>
                    {/* 검색바 영역 */}
                    {/*<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start',*/}
                    {/*    border: '1px solid #818181', borderRadius: '5px' }}>*/}
                        {/*<Box sx={{ width: '100%', maxWidth: '300px', mr: 2 }}>*/}
                            {/*<SearchBar />*/}
                            <Space direction="vertical" size="middle">
                                <Space.Compact >
                                    <Input addonBefore={<SearchOutlined />} placeholder="검색어를 입력하세요." />
                                </Space.Compact>
                            </Space>
                        {/*</Box>*/}
                    {/*</Box>*/}

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