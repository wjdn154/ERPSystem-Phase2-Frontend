import React, { useEffect, useRef, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // URL 이동을 위한 훅
import '../../../../styles/App.css';
import { menuItems, subMenuItems } from '../../../../config/menuItems.jsx';

const { Sider } = Layout;

const Sidebar = () => {
    const [openKeys, setOpenKeys] = useState([]);
    const sidebarRef = useRef(null);
    const navigate = useNavigate(); // URL 이동을 위한 navigate 훅

    useEffect(() => {
        const sidebar = sidebarRef.current;

        const handleMouseEnter = () => {
            setOpenKeys(openKeys);
        };

        const handleMouseLeave = () => {
            setOpenKeys([]);
        };

        sidebar.addEventListener('mouseenter', handleMouseEnter);
        sidebar.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            sidebar.removeEventListener('mouseenter', handleMouseEnter);
            sidebar.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [openKeys]);

    // 대분류 및 중분류가 선택될 때, 각 분류에서 하나씩만 열리도록 설정
    const handleOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1); // 새로 열린 키 찾기
        if (latestOpenKey) {
            const rootMenuLevel = latestOpenKey.split('-').length === 1; // 대분류 판단 ('-'가 없는 경우 대분류)

            if (rootMenuLevel) {
                // 대분류일 경우, 해당 대분류만 열리도록 설정하고 중분류는 초기화
                setOpenKeys([latestOpenKey]);
            } else {
                // 중분류일 경우, 대분류와 함께 하나의 중분류만 열리도록 유지
                const parentKey = latestOpenKey.split('-')[0];
                setOpenKeys([parentKey, latestOpenKey]);
            }
        } else {
            setOpenKeys([]); // 아무 것도 선택되지 않으면 모두 닫기
        }
    };

    const handleClick = (subSubItem) => {
        if (subSubItem?.url) {
            navigate(subSubItem.url); // 해당 URL로 이동
        }
    };

    // 메뉴 아이템을 items 속성에 맞게 변환
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
                items={menuItemsWithSubMenu}  // items 속성 사용
                style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
                theme="dark"
            />
        </Sider>
    );
};

export default Sidebar;