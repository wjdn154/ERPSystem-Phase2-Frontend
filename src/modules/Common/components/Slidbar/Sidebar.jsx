import React, { useEffect, useRef, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../../styles/App.css';
import { menuItems, subMenuItems } from '../../../../config/menuItems.jsx';

const { Sider } = Layout;

const Sidebar = () => {
    const [openKeys, setOpenKeys] = useState([]); // 현재 열려있는 메뉴 키
    const [selectedKeys, setSelectedKeys] = useState([]); // 선택된 메뉴 항목
    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기
    const sidebarRef = useRef(null);

    // 마우스가 사이드바를 벗어나면 메뉴를 닫음
    useEffect(() => {
        const sidebar = sidebarRef.current;

        const handleMouseLeave = () => {
            setOpenKeys([]); // 모든 메뉴 닫기
        };

        sidebar.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            sidebar.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // URL이 변경될 때 openKeys 및 selectedKeys 업데이트
    useEffect(() => {
        const path = location.pathname;
        let openKey = '';
        let selectedKey = '';

        // URL과 일치하는 메뉴 항목을 찾아서 openKeys 및 selectedKeys 설정
        menuItems.forEach((item, index) => {
            const mainKey = `sub${index + 1}`;
            subMenuItems[item.text].forEach((subItem, subIndex) => {
                const subKey = `${mainKey}-${subIndex + 1}`;
                subItem.items.forEach((subSubItem, subSubIndex) => {
                    const subSubKey = `${subKey}-${subSubIndex + 1}`;
                    if (subSubItem.url === path) {
                        openKey = subKey;
                        selectedKey = subSubKey;
                    }
                });
            });
        });

        // 상태 업데이트
        if (openKey && selectedKey) {
            setOpenKeys([openKey]); // openKeys를 배열로 설정
            setSelectedKeys([selectedKey]); // 선택된 키 업데이트
        }
    }, [location]); // URL이 변경될 때마다 실행

    const handleClick = (subSubItem, subSubKey) => {
        if (subSubItem?.url) {
            setSelectedKeys([subSubKey]); // 클릭한 항목 선택
            navigate(subSubItem.url);
        }
    };
    
    const handleOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            const rootMenuLevel = latestOpenKey.split('-').length === 1;

            if (rootMenuLevel) {
                setOpenKeys([latestOpenKey]);
            } else {
                const parentKey = latestOpenKey.split('-')[0];
                setOpenKeys([parentKey, latestOpenKey]);
            }
        } else {
            setOpenKeys([]);
        }
    };

    // 메뉴 구성
    const menuItemsWithSubMenu = menuItems.map((item, index) => ({
        key: `sub${index + 1}`,
        icon: item.icon,
        label: item.text,
        children: subMenuItems[item.text].map((subItem, subIndex) => ({
            key: `sub${index + 1}-${subIndex + 1}`,
            label: subItem.text,
            children: subItem.items.map((subSubItem, subSubIndex) => ({
                key: `sub${index + 1}-${subIndex + 1}-${subSubIndex + 1}`,
                label: (
                    <div
                        onClick={() => handleClick(subSubItem, `sub${index + 1}-${subIndex + 1}-${subSubIndex + 1}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {subSubItem.text}
                    </div>
                ),
            })),
        })),
    }));

    return (
        <Sider className="custom-sidebar" ref={sidebarRef}>
            <Menu
                mode="inline"
                selectedKeys={selectedKeys} // 선택된 메뉴 항목 설정
                openKeys={openKeys} // 현재 열려있는 메뉴 설정
                onOpenChange={handleOpenChange} // 메뉴 토글
                items={menuItemsWithSubMenu} // 메뉴 아이템
                style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
            />
        </Sider>
    );
};

export default Sidebar;