import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Breadcrumbs } from '@mui/material';
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
        <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#ffffff' }}>
            <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0 10px', sm: '0 20px', md: '0 30px', lg: '0 40px' }, alignItems: 'center' }}>
                {/* 로고 영역 */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexBasis: '200px',
                    '&:hover': {
                        cursor: 'pointer'
                    }}}>
                    <img src={Logo}
                         alt="로고"
                         style={{ height: '80px', maxHeight: '10vh', maxWidth: '100%', width: 'auto'}} />
                </Box>

                {/* 검색바 영역 */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexBasis: '300px', justifyContent: 'flex-start',
                    border: '1px solid #000', borderRadius: '5px' }}>
                    <Box sx={{ width: '100%', maxWidth: '300px', mr: 2 }}>
                        <SearchBar />
                    </Box>
                </Box>

                {/* 브레드크럼 및 설정 아이콘 영역 */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', maxWidth: '600px', flexShrink: 1 }}>
                    {renderBreadcrumb()} {/* 브레드크럼 렌더링 */}
                    <IconButton sx={{ ml: 2 }}>
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;