import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Sidebar = ({
                     selectedMenu,
                     setSelectedMenu,
                     selectedSubMenu,
                     setSelectedSubMenu,
                     selectedSubSubMenu,
                     setSelectedSubSubMenu,
                     menuItems,
                     subMenuItems
                 }) => {
    // 상태 관리 함수 및 초기 설정을 App.jsx로부터 받아옴

    const [open, setOpen] = React.useState({}); // 대분류 메뉴 열림/닫힘 상태
    const [subOpen, setSubOpen] = React.useState({}); // 중분류 메뉴 열림/닫힘 상태

    useEffect(() => {
        // 초기 마운트 시 선택된 메뉴를 기본으로 열림
        setOpen({ [selectedMenu]: true }); // 대분류 메뉴 열림 상태 설정
        setSubOpen({ [selectedSubMenu]: true }); // 중분류 메뉴 열림 상태 설정
    }, [selectedMenu, selectedSubMenu]);

    // 대분류 메뉴 클릭 시 호출되는 함수
    const handleMenuClick = (menu) => {
        if (selectedMenu === menu) return;

        setSelectedMenu(menu);
        setSelectedSubMenu(''); // 중분류 초기화
        setSelectedSubSubMenu(''); // 소분류 초기화

        // 선택된 대분류 메뉴만 열림 상태로 설정
        setOpen({ [menu]: true });
        setSubOpen({}); // 중분류 메뉴 닫기
    };

    // 중분류 메뉴 클릭 시 호출되는 함수
    const handleSubMenuClick = (subMenu) => {
        if (selectedSubMenu === subMenu) {
            setSelectedSubMenu('');
            setSelectedSubSubMenu('');
            return;
        }

        setSelectedSubMenu(subMenu);
        setSelectedSubSubMenu(''); // 소분류 초기화

        // 선택된 중분류 메뉴만 열림 상태로 설정
        setSubOpen({ [subMenu]: true });
    };

    // 소분류 메뉴 클릭 시 호출되는 함수
    const handleSubSubMenuClick = (subSubMenu) => {
        setSelectedSubSubMenu(subSubMenu);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', marginTop: '20px' }}>
            {/* 대분류 메뉴 영역 */}
            <Box sx={{ minWidth: '100px', display: 'flex', flexDirection: 'column', paddingRight: '10px' }}>
                <List className="mui-scrollbar" sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                button
                                onClick={() => handleMenuClick(item.text)}
                                sx={{
                                    marginBottom: index === item.length - 1 ? '0px' : '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '70px',
                                    '&:hover': {
                                        backgroundColor: '#d3daf7',
                                        color: '#19358c',
                                        borderRadius: '10px',
                                        boxShadow: 1,
                                        transition: 'background-color 0.3s, border-radius 0.3s',
                                        fill: '#19358c',
                                    },
                                    backgroundColor: selectedMenu === item.text ? '#d3daf7' : 'inherit',
                                    color: selectedMenu === item.text ? '#19358c' : 'inherit',
                                    borderRadius: selectedMenu === item.text ? '10px' : '0px',
                                    boxShadow: selectedMenu === item.text ? 1 : 0,
                                    transition: 'background-color 0.3s, border-radius 0.3s',
                                }}
                            >
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <ListItemIcon >
                                        {React.cloneElement(item.icon, { style: {width: '100%', fill: selectedMenu === item.text ? '#076EA8' : 'inherit' } })}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            sx: { fontSize: '0.9rem', fontWeight: '700' }
                                        }}
                                    />
                                </Box>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            {/* 중분류 및 소분류 메뉴 영역 */}
            {selectedMenu && subMenuItems[selectedMenu] && (
                <Box className="mui-scrollbar" sx={{ minWidth: '250px', display: 'flex', flexDirection: 'column', overflow: "auto" }}>
                    <Collapse in={open[selectedMenu]} timeout="auto" unmountOnExit>
                        <List className="mui-scrollbar" sx={{ overflow: 'auto', padding: '0px'}}>
                            {subMenuItems[selectedMenu].map((subItem, subIndex) => (
                                <React.Fragment key={subIndex}>
                                    {subIndex !== 0 && <Divider sx={{light: false, margin: '0px 20px 0px 10px'}} />}
                                    <ListItem
                                        button
                                        onClick={() => handleSubMenuClick(subItem.text)}
                                        sx={{
                                            width: '90%',
                                            margin: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: selectedSubMenu === subItem.text ? '#d3daf7' : 'inherit',
                                            color: selectedSubMenu === subItem.text ? '#19358c' : 'inherit',
                                            borderRadius: selectedSubMenu === subItem.text ? '10px' : '0px',
                                            boxShadow: selectedSubMenu === subItem.text ? 1 : 0,
                                            transition: 'background-color 0.3s, border-radius 0.3s',
                                            '&:hover': {
                                                backgroundColor: '#d3daf7',
                                                color: '#19358c',
                                                boxShadow: 1,
                                                borderRadius: '10px',
                                                transition: 'background-color 0.3s, border-radius 0.3s',
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={subItem.text}
                                            primaryTypographyProps={{
                                                sx: { fontSize: '0.9rem', fontWeight: '500' }
                                            }}
                                        />
                                        {subItem.items && (
                                            subOpen[subItem.text] ? <ExpandLess /> : <ExpandMore />
                                        )}
                                    </ListItem>
                                    {subItem.items && (
                                        <Collapse in={subOpen[subItem.text]} timeout="auto" unmountOnExit>
                                            <Box sx={{display: 'flex'}}>
                                                <Divider orientation="vertical" flexItem sx={{ margin: '10px 0px 10px 15px' }} />
                                                <List component="div" disablePadding sx={{ width: '80%' }}>
                                                    {subItem.items.map((item, index) => (
                                                        <ListItem
                                                            button
                                                            key={index}
                                                            onClick={() => handleSubSubMenuClick(item)}
                                                            sx={{
                                                                display: 'flex',
                                                                marginLeft: '5%',
                                                                alignItems: 'center',
                                                                marginTop: index === 0 ? '10px' : '0px',
                                                                marginBottom: index === subItem.items.length - 1 ? '10px' : '5px',
                                                                backgroundColor: selectedSubSubMenu === item ? '#d3daf7' : 'inherit',
                                                                color: selectedSubSubMenu === item ? '#19358c' : 'inherit',
                                                                boxShadow: selectedSubSubMenu === item ? 1 : 0,
                                                                borderRadius: selectedSubSubMenu === item ? '10px' : '0px',
                                                                transition: 'background-color 0.3s, border-radius 0.3s',
                                                                '&:hover': {
                                                                    backgroundColor: '#d3daf7',
                                                                    color: '#19358c',
                                                                    borderRadius: '10px',
                                                                    boxShadow: 1,
                                                                    transition: 'background-color 0.3s, border-radius 0.3s',
                                                                },
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ color: '#000', minWidth: '20px' }}>
                                                                <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={item.text}
                                                                primaryTypographyProps={{
                                                                    sx: { fontSize: '0.8rem', fontWeight: '400' }
                                                                }}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>
                                        </Collapse>
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </Collapse>
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;