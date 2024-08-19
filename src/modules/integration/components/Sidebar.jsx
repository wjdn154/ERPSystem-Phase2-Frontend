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
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* 대분류 메뉴 영역 */}
            <Box sx={{ width: '200px', display: 'flex', flexDirection: 'column', paddingRight: '10px' }}>
                <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                button
                                onClick={() => handleMenuClick(item.text)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '70px',
                                    '&:hover': {
                                        backgroundColor: '#D7EDFA',
                                        color: '#076EA8',
                                        borderRadius: '15px',
                                        transition: 'background-color 0.3s, border-radius 0.3s',
                                    },
                                    backgroundColor: selectedMenu === item.text ? '#D7EDFA' : 'inherit',
                                    color: selectedMenu === item.text ? '#076EA8' : 'inherit',
                                    borderRadius: selectedMenu === item.text ? '15px' : '0px',
                                    transition: 'background-color 0.3s, border-radius 0.3s',
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        sx: { fontSize: '0.9rem', fontWeight: '700' }
                                    }}
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            {/* 중분류 및 소분류 메뉴 영역 */}
            {selectedMenu && subMenuItems[selectedMenu] && (
                <Box sx={{ width: '250px', display: 'flex', flexDirection: 'column' }}>
                    <Collapse in={open[selectedMenu]} timeout="auto" unmountOnExit>
                        <List sx={{ overflow: 'auto', padding: '0px'}}>
                            {subMenuItems[selectedMenu].map((subItem, subIndex) => (
                                <React.Fragment key={subIndex}>
                                    <Divider sx={{light: false, margin: '0px 20px 0px 10px'}} />
                                    <ListItem
                                        button
                                        onClick={() => handleSubMenuClick(subItem.text)}
                                        sx={{
                                            width: '90%',
                                            margin: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: selectedSubMenu === subItem.text ? '#D7EDFA' : 'inherit',
                                            color: selectedSubMenu === subItem.text ? '#076EA8' : 'inherit',
                                            borderRadius: selectedSubMenu === subItem.text ? '15px' : '0px',
                                            transition: 'background-color 0.3s, border-radius 0.3s',
                                            '&:hover': {
                                                backgroundColor: '#D7EDFA',
                                                color: '#076EA8',
                                                borderRadius: '15px',
                                                transition: 'background-color 0.3s, border-radius 0.3s',
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={subItem.text}
                                            primaryTypographyProps={{
                                                sx: { fontSize: '0.9rem', fontWeight: '400' }
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
                                                                marginBottom: index === subItem.items.length - 1 ? '10px' : '0px',
                                                                backgroundColor: selectedSubSubMenu === item ? '#D7EDFA' : 'inherit',
                                                                color: selectedSubSubMenu === item ? '#076EA8' : 'inherit',
                                                                borderRadius: selectedSubSubMenu === item ? '15px' : '0px',
                                                                transition: 'background-color 0.3s, border-radius 0.3s',
                                                                '&:hover': {
                                                                    backgroundColor: '#D7EDFA',
                                                                    color: '#076EA8',
                                                                    borderRadius: '15px',
                                                                    transition: 'background-color 0.3s, border-radius 0.3s',
                                                                },
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ color: '#000', minWidth: '20px' }}>
                                                                <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={item}
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