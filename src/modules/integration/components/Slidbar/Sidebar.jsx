import React, { useEffect, useRef, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/App.css';
import { menuItems, subMenuItems } from '../../../../config/menuItems.jsx';

const { Sider } = Layout;

const Sidebar = () => {
    const [openKeys, setOpenKeys] = useState([]);
    const sidebarRef = useRef(null);
    const prevOpenKeysRef = useRef([]);  // 이전 openKeys를 저장하는 ref
    const navigate = useNavigate();

    useEffect(() => {
        const sidebar = sidebarRef.current;

        const handleMouseEnter = () => {
            setOpenKeys(prevOpenKeysRef.current);  // 이전 상태를 복원
        };

        const handleMouseLeave = () => {
            prevOpenKeysRef.current = openKeys;  // 현재 상태를 저장
            setOpenKeys([]);  // 모든 메뉴를 닫음
        };

        sidebar.addEventListener('mouseenter', handleMouseEnter);
        sidebar.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            sidebar.removeEventListener('mouseenter', handleMouseEnter);
            sidebar.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [openKeys]);

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

    const handleClick = (subSubItem) => {
        if (subSubItem?.url) {
            navigate(subSubItem.url);
        }
    };

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
                        onClick={() => handleClick(subSubItem)}
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
                defaultSelectedKeys={['1']}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                items={menuItemsWithSubMenu}
                style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
            />
        </Sider>
    );
};

export default Sidebar;