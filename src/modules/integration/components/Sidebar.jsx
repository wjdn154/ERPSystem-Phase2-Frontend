import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Sidebar = ({ selectedMenu, setSelectedMenu, selectedSubMenu, setSelectedSubMenu, menuItems, subMenuItems }) => {
    // 상태 변수들 선언
    const [open, setOpen] = useState({}); // 메인 메뉴 열림/닫힘 상태를 관리
    const [subOpen, setSubOpen] = useState({}); // 서브 메뉴 열림/닫힘 상태를 관리
    const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(null); // 선택된 서브 메뉴 항목을 추적

    // 메인 메뉴 클릭 시 호출되는 함수
    const handleMenuClick = (menu) => {
        if (selectedMenu === menu) return; // 이미 선택된 메뉴를 다시 클릭한 경우 아무 작업도 하지 않음

        setSelectedMenu(menu); // 선택된 메뉴 상태 업데이트
        setSelectedSubMenu(''); // 서브 메뉴 초기화

        // 선택된 메뉴만 열리도록 설정
        setOpen({
            [menu]: true,
        });

        // 서브 메뉴 모두 닫기
        setSubOpen({});
    };

    // 서브 메뉴 클릭 시 호출되는 함수
    const handleSubMenuClick = (subMenu) => {
        // 클릭된 서브 메뉴를 토글하여 열고 닫음
        setSubOpen({
            [subMenu]: !subOpen[subMenu],
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            {/* 메인 메뉴 영역 */}
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
                                    '&:hover': {
                                        backgroundColor: '#D7EDFA',
                                        color: '#076EA8',
                                        borderRadius: '15px',
                                        transition: 'background-color 0.3s, border-radius 0.3s',
                                    },
                                    backgroundColor: selectedMenu === item.text ? '#D7EDFA' : 'inherit', // 선택된 메뉴는 배경색 변경
                                    color: selectedMenu === item.text ? '#076EA8' : 'inherit', // 선택된 메뉴는 글자색 변경
                                    borderRadius: selectedMenu === item.text ? '15px' : '0px', // 선택된 메뉴는 모서리 둥글게
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

            {/* 서브 메뉴 영역 */}
            {selectedMenu && subMenuItems[selectedMenu] && (
                <Box sx={{ width: '250px', display: 'flex', flexDirection: 'column' }}>
                    <Collapse in={open[selectedMenu]} timeout="auto" unmountOnExit>
                        <List sx={{ overflow: 'auto', display: 'flex', flexDirection: 'row' }}>
                            <List sx={{ flexGrow: 1 }}>
                                {subMenuItems[selectedMenu].map((subItem, subIndex) => (
                                    <React.Fragment key={subIndex}>
                                        <Divider />
                                        <ListItem
                                            button
                                            onClick={() => {
                                                handleSubMenuClick(subItem.text);
                                                setSelectedSubMenuItem(subItem.text);  // 클릭된 서브 메뉴 항목 상태로 설정
                                            }}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: selectedSubMenuItem === subItem.text ? '#D7EDFA' : 'inherit', // 선택된 서브 메뉴는 배경색 변경
                                                color: selectedSubMenuItem === subItem.text ? '#076EA8' : 'inherit', // 선택된 서브 메뉴는 글자색 변경
                                                borderRadius: selectedSubMenuItem === subItem.text ? '15px' : '0px', // 선택된 서브 메뉴는 모서리 둥글게
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
                                                    sx: { fontSize: '0.9rem', fontWeight: '700' }
                                                }}
                                            />
                                            {subItem.items && (
                                                subOpen[subItem.text] ? <ExpandLess /> : <ExpandMore /> // 서브 메뉴 확장 아이콘
                                            )}
                                        </ListItem>
                                        {subItem.items && (
                                            <Collapse in={subOpen[subItem.text]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding sx={{ pl: 4, position: 'relative' }}>
                                                    {subItem.items.map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <ListItem
                                                                button
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    backgroundColor: selectedSubMenu === item ? '#D7EDFA' : 'inherit', // 선택된 서브 메뉴 아이템은 배경색 변경
                                                                    color: selectedSubMenu === item ? '#076EA8' : 'inherit', // 선택된 서브 메뉴 아이템은 글자색 변경
                                                                    borderRadius: selectedSubMenu === item ? '15px' : '0px', // 선택된 서브 메뉴 아이템은 모서리 둥글게
                                                                    transition: 'background-color 0.3s, border-radius 0.3s',
                                                                    '&:hover': {
                                                                        backgroundColor: '#D7EDFA',
                                                                        color: '#076EA8',
                                                                        borderRadius: '15px',
                                                                        transition: 'background-color 0.3s, border-radius 0.3s',
                                                                    },
                                                                }}
                                                                onClick={() => setSelectedSubMenu(item)} // 클릭된 서브 메뉴 항목 상태 설정
                                                            >
                                                                <Divider orientation="vertical" flexItem sx={{ mr: 2 }} /> {/* 수직 구분선 */}
                                                                <ListItemIcon sx={{ color: '#000', minWidth: '20px' }}>
                                                                    <FiberManualRecordIcon sx={{ fontSize: '10px' }} /> {/* 작은 점 아이콘 */}
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={item}
                                                                    primaryTypographyProps={{
                                                                        sx: { fontSize: '0.7rem', fontWeight: '700' }
                                                                    }}
                                                                />
                                                            </ListItem>
                                                        </React.Fragment>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </List>
                    </Collapse>
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;